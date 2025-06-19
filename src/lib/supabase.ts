import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if environment variables are not set
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url_here') {
    // Return a mock client that doesn't make real API calls
    return {
      auth: {
        signUp: async () => ({ data: null, error: { message: 'Please connect to Supabase first' } }),
        signInWithPassword: async () => ({ data: null, error: { message: 'Please connect to Supabase first' } }),
        signOut: async () => ({ error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        insert: async () => ({ data: null, error: { message: 'Please connect to Supabase first' } }),
        select: async () => ({ data: null, error: { message: 'Please connect to Supabase first' } }),
        update: async () => ({ data: null, error: { message: 'Please connect to Supabase first' } }),
        delete: async () => ({ data: null, error: { message: 'Please connect to Supabase first' } })
      })
    }
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()

// Database helper functions
export const database = {
  // Profile operations
  createProfile: async (userId: string, email: string, fullName?: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    return { data, error }
  },

  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
    return { data, error }
  },

  // Supplier request operations
  createSupplierRequest: async (userId: string, requestData: any) => {
    const { data, error } = await supabase
      .from('supplier_requests')
      .insert({
        user_id: userId,
        status: 'pending',
        location: requestData.location,
        lead_time_preference: requestData.leadTime,
        platforms: requestData.platforms,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    return { data, error }
  },

  getUserSupplierRequests: async (userId: string) => {
    const { data, error } = await supabase
      .from('supplier_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Request items operations
  createRequestItems: async (requestId: string, items: any[]) => {
    const itemsToInsert = items.map(item => ({
      request_id: requestId,
      product_name: item.productName,
      quantity: item.quantity,
      unit: item.unit,
      target_price: item.targetPrice,
      created_at: new Date().toISOString()
    }))

    const { data, error } = await supabase
      .from('request_items')
      .insert(itemsToInsert)
    return { data, error }
  },

  getRequestItems: async (requestId: string) => {
    const { data, error } = await supabase
      .from('request_items')
      .select('*')
      .eq('request_id', requestId)
    return { data, error }
  },

  // Shortlisted suppliers operations
  addToShortlist: async (userId: string, supplierName: string, supplierData: any, notes?: string) => {
    const { data, error } = await supabase
      .from('shortlisted_suppliers')
      .insert({
        user_id: userId,
        supplier_name: supplierName,
        supplier_data: supplierData,
        notes: notes || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    return { data, error }
  },

  getUserShortlist: async (userId: string) => {
    const { data, error } = await supabase
      .from('shortlisted_suppliers')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  updateShortlistNotes: async (shortlistId: string, notes: string) => {
    const { data, error } = await supabase
      .from('shortlisted_suppliers')
      .update({
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', shortlistId)
    return { data, error }
  },

  removeFromShortlist: async (shortlistId: string) => {
    const { data, error } = await supabase
      .from('shortlisted_suppliers')
      .delete()
      .eq('id', shortlistId)
    return { data, error }
  }
}

// Auth helper functions
export const auth = {
  signUp: async (email: string, password: string, metadata?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    
    // If signup is successful and we have a user, create their profile
    if (data.user && !error) {
      const profileResult = await database.createProfile(
        data.user.id,
        email,
        metadata?.full_name
      )
      
      if (profileResult.error) {
        console.error('Error creating profile:', profileResult.error)
      }
    }
    
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}