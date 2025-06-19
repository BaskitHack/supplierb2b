import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, Users, Clock, ArrowLeft, Plus, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../lib/supabase';

interface SupplierRequest {
  id: string;
  status: string;
  location: string;
  lead_time_preference: string;
  platforms: string[];
  created_at: string;
  updated_at: string;
}

interface ShortlistedSupplier {
  id: string;
  supplier_name: string;
  supplier_data: any;
  notes: string;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<SupplierRequest[]>([]);
  const [shortlist, setShortlist] = useState<ShortlistedSupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const [requestsResult, shortlistResult] = await Promise.all([
        database.getUserSupplierRequests(user.id),
        database.getUserShortlist(user.id)
      ]);

      if (requestsResult.error) {
        console.error('Error loading requests:', requestsResult.error);
      } else {
        setRequests(requestsResult.data || []);
      }

      if (shortlistResult.error) {
        console.error('Error loading shortlist:', shortlistResult.error);
      } else {
        setShortlist(shortlistResult.data || []);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromShortlist = async (id: string) => {
    try {
      const { error } = await database.removeFromShortlist(id);
      if (error) {
        console.error('Error removing from shortlist:', error);
      } else {
        setShortlist(shortlist.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to view your dashboard.</p>
          <Link 
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Overview of your procurement activities</p>
              </div>
            </div>
            
            <Link
              to="/"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Request
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{requests.length}</div>
                <div className="text-sm text-gray-600">Total Requests</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{shortlist.length}</div>
                <div className="text-sm text-gray-600">Shortlisted Suppliers</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {requests.filter(r => r.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {requests.filter(r => r.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Requests */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Requests</h2>
            </div>
            <div className="p-6">
              {requests.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No requests yet</p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 mt-4 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Create your first request
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.slice(0, 5).map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(request.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p><strong>Location:</strong> {request.location}</p>
                        <p><strong>Lead Time:</strong> {request.lead_time_preference}</p>
                        <p><strong>Platforms:</strong> {request.platforms.join(', ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Shortlisted Suppliers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Shortlisted Suppliers</h2>
            </div>
            <div className="p-6">
              {shortlist.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No suppliers shortlisted yet</p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 mt-4 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Find suppliers
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {shortlist.slice(0, 5).map((supplier) => (
                    <div key={supplier.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{supplier.supplier_name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Added {new Date(supplier.created_at).toLocaleDateString()}
                          </p>
                          {supplier.notes && (
                            <p className="text-sm text-gray-500 mt-2 italic">
                              "{supplier.notes}"
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveFromShortlist(supplier.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from shortlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}