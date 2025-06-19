import React from 'react';
import { Edit, Package, Clock, Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface ProcurementSummaryProps {
  searchData: any;
  onEdit: () => void;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export default function ProcurementSummary({ searchData, onEdit, isEditing, onToggleEdit }: ProcurementSummaryProps) {
  if (!searchData) return null;

  const getItemsText = () => {
    if (searchData.searchMode === 'category') {
      return `${searchData.category} suppliers`;
    } else {
      const itemCount = searchData.items?.length || 0;
      return `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
    }
  };

  const getPlatformsText = () => {
    if (!searchData.platforms || searchData.platforms.length === 0) return 'All platforms';
    if (searchData.platforms.includes('All')) return 'All platforms';
    return searchData.platforms.join(', ');
  };

  const getLeadTimeText = () => {
    return searchData.leadTime || 'No preference';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Edit Procurement Request' : 'Procurement Request Summary'}
              </h2>
              <div className="flex items-center gap-6 text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {getItemsText()}
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {getPlatformsText()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {getLeadTimeText()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleEdit}
              className="flex items-center gap-2 px-4 py-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg font-medium transition-all duration-200"
            >
              {isEditing ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  Edit
                </>
              )}
            </button>
          </div>
        </div>

        {/* Detailed breakdown when not editing - Only for product mode */}
        {!isEditing && searchData.searchMode === 'product' && searchData.items && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Items Requested:</h3>
            <div className="flex flex-wrap gap-2">
              {searchData.items.map((item: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-2 w-auto inline-block">
                  <div className="font-medium text-gray-900 text-sm whitespace-nowrap">{item.productName}</div>
                  <div className="text-xs text-gray-600 mt-1 whitespace-nowrap">
                    {item.quantity} {item.unit}
                    {item.targetPrice && ` • Target: ${item.targetPrice}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}