import React from 'react';
import { FileText, Share, Trash2, Edit3, Download } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  price: string;
  leadTime: string;
  platform: string;
  platformColor: string;
  coverage: string;
  rating: number;
  location: string;
  isRecommended?: boolean;
  image: string;
}

interface ShortlistProps {
  suppliers: Supplier[];
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

  if (suppliers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Shortlist is Empty</h3>
        <p className="text-gray-600">Save suppliers to compare them side by side</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Your Shortlist</h3>
            <p className="text-gray-600 mt-1">{suppliers.length} supplier{suppliers.length !== 1 ? 's' : ''} saved</p>
          </div>
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
        </div>
      </div>

      {/* Supplier List */}
      <div className="p-6">
        <div className="space-y-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <img
                  src={supplier.image}
                  alt={supplier.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{supplier.name}</h4>
                      <p className="text-sm text-gray-600">{supplier.location}</p>
                    </div>
                    <button
                      onClick={() => onRemoveFromShortlist(supplier.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <span className="font-semibold text-orange-600">{supplier.price}</span>
                    <span className="text-gray-600">{supplier.leadTime}</span>
                    <span className="text-green-600">{supplier.coverage}</span>
                  </div>

                  {/* Notes Section */}
                  <div className="mt-3">
                    {editingNote === supplier.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Add a note..."
                          className="flex-1 p-2 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                          onKeyPress={(e) => e.key === 'Enter' && saveNote(supplier.id)}
                        />
                        <button
                          onClick={() => saveNote(supplier.id)}
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditingNote}
                          className="text-gray-500 hover:text-gray-700 font-medium text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          {notes[supplier.id] ? (
                            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                              {notes[supplier.id]}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500 italic">No notes added</p>
                          )}
                        </div>
                        <button
                          onClick={() => startEditingNote(supplier.id)}
                          className="text-orange-500 hover:text-orange-700 p-1"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guest Hint */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> Login to save your shortlist across devices and access advanced comparison features.
          </p>
        </div>
      </div>
    </div>
  );
}