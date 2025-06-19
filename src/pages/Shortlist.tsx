import React from 'react';
import { FileText, Share, Trash2, Edit3, Download, ArrowLeft, Package, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type RealSupplier } from '../data/realSuppliers';

interface ShortlistProps {
  suppliers: RealSupplier[];
  onRemoveFromShortlist: (id: string) => void;
  notes: Record<string, string>;
  onUpdateNote: (id: string, note: string) => void;
}

export default function Shortlist({ suppliers, onRemoveFromShortlist, notes, onUpdateNote }: ShortlistProps) {
  const [editingNote, setEditingNote] = React.useState<string | null>(null);
  const [tempNote, setTempNote] = React.useState('');

  const startEditingNote = (id: string) => {
    setEditingNote(id);
    setTempNote(notes[id] || '');
  };

  const saveNote = (id: string) => {
    onUpdateNote(id, tempNote);
    setEditingNote(null);
  };

  const cancelEditingNote = () => {
    setEditingNote(null);
    setTempNote('');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Alibaba': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Shopee': return 'text-red-600 bg-red-50 border-red-200';
      case 'Tokopedia': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

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
                Back to Search
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Shortlist</h1>
                <p className="text-gray-600">{suppliers.length} supplier{suppliers.length !== 1 ? 's' : ''} saved</p>
              </div>
            </div>
            
            {suppliers.length > 0 && (
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium transition-all duration-200">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200">
                  <Share className="w-4 h-4" />
                  Share Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {suppliers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your Shortlist is Empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start by searching for suppliers and save the ones you're interested in to compare them side by side.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
            >
              <Package className="w-5 h-5" />
              Find Suppliers
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    <img
                      src={supplier.image}
                      alt={supplier.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{supplier.name}</h3>
                            {supplier.isRecommended && (
                              <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                <Building2 className="w-4 h-4" />
                                AI Recommended
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{supplier.location}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              {renderStars(supplier.rating)}
                              <span className="font-medium text-gray-700 ml-1">{supplier.rating}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPlatformColor(supplier.platform)}`}>
                              {supplier.platform}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveFromShortlist(supplier.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from shortlist"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                        <div className="text-center">
                          <div className="text-xl font-bold text-orange-600">{supplier.price}</div>
                          <div className="text-xs text-gray-600">Price</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-teal-600">{supplier.leadTime}</div>
                          <div className="text-xs text-gray-600">Lead Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-green-600">{supplier.coverage}</div>
                          <div className="text-xs text-gray-600">Coverage</div>
                        </div>
                      </div>

                      {/* Company Details */}
                      {(supplier.website || supplier.yearEstablished || supplier.employeeCount) && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            {supplier.website && (
                              <div>
                                <span className="font-medium text-gray-700">Website:</span>
                                <a 
                                  href={supplier.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 ml-1"
                                >
                                  Visit Site
                                </a>
                              </div>
                            )}
                            {supplier.yearEstablished && (
                              <div>
                                <span className="font-medium text-gray-700">Est:</span>
                                <span className="text-gray-600 ml-1">{supplier.yearEstablished}</span>
                              </div>
                            )}
                            {supplier.employeeCount && (
                              <div>
                                <span className="font-medium text-gray-700">Employees:</span>
                                <span className="text-gray-600 ml-1">{supplier.employeeCount}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Specialties */}
                      {supplier.specialties && supplier.specialties.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 mb-2">Specialties:</h4>
                          <div className="flex flex-wrap gap-2">
                            {supplier.specialties.map((specialty, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notes Section */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Edit3 className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-700">Notes</span>
                        </div>
                        
                        {editingNote === supplier.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={tempNote}
                              onChange={(e) => setTempNote(e.target.value)}
                              placeholder="Add your notes about this supplier..."
                              className="w-full p-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                              rows={3}
                            />
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => saveNote(supplier.id)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                              >
                                Save Note
                              </button>
                              <button
                                onClick={cancelEditingNote}
                                className="text-gray-500 hover:text-gray-700 px-4 py-2 font-medium text-sm transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              {notes[supplier.id] ? (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                  <p className="text-gray-700 text-sm leading-relaxed">
                                    {notes[supplier.id]}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-gray-500 italic text-sm">
                                  No notes added yet. Click to add your thoughts about this supplier.
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => startEditingNote(supplier.id)}
                              className="text-orange-500 hover:text-orange-700 p-2 hover:bg-orange-50 rounded-lg transition-colors flex-shrink-0"
                              title="Edit note"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pro Tip */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    Your shortlist is automatically saved to your account. You can access it from any device and 
                    export it to PDF for sharing with your team or for procurement records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}