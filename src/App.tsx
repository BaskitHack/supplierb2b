import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { database } from './lib/supabase';
import AuthModal from './components/AuthModal';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Shortlist from './pages/Shortlist';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import API from './pages/API';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { type RealSupplier } from './data/realSuppliers';

function App() {
  const { user, signOut, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [shortlistedSuppliers, setShortlistedSuppliers] = React.useState<RealSupplier[]>([]);
  const [supplierNotes, setSupplierNotes] = React.useState<Record<string, string>>({});

  // Load user's shortlist when they sign in
  React.useEffect(() => {
    if (user) {
      loadUserShortlist();
    } else {
      // Clear shortlist when user signs out
      setShortlistedSuppliers([]);
      setSupplierNotes({});
    }
  }, [user]);

  const loadUserShortlist = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await database.getUserShortlist(user.id);
      if (error) {
        console.error('Error loading shortlist:', error);
        return;
      }
      
      if (data) {
        const suppliers: RealSupplier[] = [];
        const notes: Record<string, string> = {};
        
        data.forEach(item => {
          suppliers.push({
            ...item.supplier_data,
            id: item.supplier_data.id || item.id
          });
          notes[item.supplier_data.id || item.id] = item.notes || '';
        });
        
        setShortlistedSuppliers(suppliers);
        setSupplierNotes(notes);
      }
    } catch (err) {
      console.error('Error loading shortlist:', err);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleAddToShortlist = async (supplier: RealSupplier) => {
    // Check if already shortlisted
    if (shortlistedSuppliers.find(s => s.id === supplier.id)) {
      return;
    }

    // Add to local state immediately for better UX
    setShortlistedSuppliers([...shortlistedSuppliers, supplier]);

    // If user is logged in, save to database
    if (user) {
      try {
        const { error } = await database.addToShortlist(
          user.id,
          supplier.name,
          supplier,
          ''
        );
        
        if (error) {
          console.error('Error saving to shortlist:', error);
          // Remove from local state if database save failed
          setShortlistedSuppliers(prev => prev.filter(s => s.id !== supplier.id));
        }
      } catch (err) {
        console.error('Error saving to shortlist:', err);
        // Remove from local state if database save failed
        setShortlistedSuppliers(prev => prev.filter(s => s.id !== supplier.id));
      }
    }
  };

  const handleRemoveFromShortlist = async (id: string) => {
    // Remove from local state immediately
    setShortlistedSuppliers(shortlistedSuppliers.filter(s => s.id !== id));
    const newNotes = { ...supplierNotes };
    delete newNotes[id];
    setSupplierNotes(newNotes);

    // If user is logged in, remove from database
    if (user) {
      try {
        // Find the shortlist item in database
        const { data, error } = await database.getUserShortlist(user.id);
        if (!error && data) {
          const item = data.find(item => 
            (item.supplier_data.id || item.id) === id
          );
          
          if (item) {
            await database.removeFromShortlist(item.id);
          }
        }
      } catch (err) {
        console.error('Error removing from shortlist:', err);
      }
    }
  };

  const handleUpdateNote = async (id: string, note: string) => {
    // Update local state immediately
    setSupplierNotes({ ...supplierNotes, [id]: note });

    // If user is logged in, update in database
    if (user) {
      try {
        const { data, error } = await database.getUserShortlist(user.id);
        if (!error && data) {
          const item = data.find(item => 
            (item.supplier_data.id || item.id) === id
          );
          
          if (item) {
            await database.updateShortlistNotes(item.id, note);
          }
        }
      } catch (err) {
        console.error('Error updating note:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        user={user} 
        onSignOut={handleSignOut} 
        onShowAuth={() => setShowAuthModal(true)} 
      />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              onAddToShortlist={handleAddToShortlist}
              shortlistedIds={shortlistedSuppliers.map(s => s.id)}
              onShowAuth={() => setShowAuthModal(true)}
            />
          } 
        />
        <Route 
          path="/shortlist" 
          element={
            <Shortlist 
              suppliers={shortlistedSuppliers}
              onRemoveFromShortlist={handleRemoveFromShortlist}
              notes={supplierNotes}
              onUpdateNote={handleUpdateNote}
            />
          } 
        />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/api" element={<API />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}

export default App;