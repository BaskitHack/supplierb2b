import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { auth } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    auth.getCurrentUser().then(({ user }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, metadata?: any) => {
    setLoading(true)
    const result = await auth.signUp(email, password, metadata)
    setLoading(false)
    return result
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const result = await auth.signIn(email, password)
    setLoading(false)
    return result
  }

  const signOut = async () => {
    setLoading(true)
    const result = await auth.signOut()
    setLoading(false)
    return result
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut
  }
}