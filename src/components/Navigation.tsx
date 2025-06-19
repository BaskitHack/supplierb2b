import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ChevronDown, Bookmark, LogOut, UserCircle, BarChart3, Settings } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface NavigationProps {
  user: SupabaseUser | null;
  onSignOut: () => void;
  onShowAuth: () => void;
}

export default function Navigation({ user, onSignOut, onShowAuth }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    if (location.pathname === '/') {
      window.location.reload();
    }
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setShowProfileMenu(false);
  };

  const handleSignOut = () => {
    onSignOut();
    setShowProfileMenu(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-dropdown')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SupplierScout</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/how-it-works" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
            <Link 
              to="/api" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              API
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">
                      {getUserDisplayName()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
                    showProfileMenu ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <UserCircle className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {getUserDisplayName()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => handleMenuItemClick('/dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <BarChart3 className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Dashboard</span>
                      </button>

                      <button
                        onClick={() => handleMenuItemClick('/shortlist')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <Bookmark className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Shortlisted Suppliers</span>
                      </button>

                      <button
                        onClick={() => handleMenuItemClick('/profile')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Profile Settings</span>
                      </button>
                      
                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-red-50 transition-colors text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onShowAuth}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}