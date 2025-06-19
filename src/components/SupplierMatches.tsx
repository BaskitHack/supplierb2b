import React from 'react';
import { Star, MapPin, Clock, Bookmark, ExternalLink, Bot, Sparkles, CheckCircle, AlertCircle, Package, Flame } from 'lucide-react';
import ProcurementSummary from './ProcurementSummary';
import RequestForm from './RequestForm';
import SupplierDetailModal from './SupplierDetailModal';
import { useAuth } from '../hooks/useAuth';
import { allRealSuppliers, suppliersByCategory, type RealSupplier } from '../data/realSuppliers';

interface SupplierMatchesProps {
  onAddToShortlist: (supplier: RealSupplier) => void;
  shortlistedIds: string[];
  searchMode?: 'product' | 'category';
  searchData?: any;
  onUpdateSearch?: (data: any) => void;
  onShowAuth?: () => void;
}

// Helper function to calculate estimated total price
const calculateEstimatedPrice = (searchData: any, basePrice: number): string => {
  if (!searchData || !searchData.items || searchData.searchMode !== 'product') {
    return `Rp${basePrice.toLocaleString('id-ID')}`;
  }

  let totalPrice = 0;
  searchData.items.forEach((item: any) => {
    const quantity = parseInt(item.quantity) || 1;
    totalPrice += basePrice * quantity;
  });

  return `Rp${totalPrice.toLocaleString('id-ID')}`;
};

// Helper function to extract numeric value from price string for sorting
const extractPriceValue = (priceString: string): number => {
  const match = priceString.replace(/[Rp,]/g, '').match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

// Helper function to extract numeric value from lead time for sorting
const extractLeadTimeValue = (leadTimeString: string): number => {
  const match = leadTimeString.match(/\d+/);
  return match ? parseInt(match[0]) : 999;
};

// Helper function to extract distance value for sorting
const extractDistanceValue = (distanceString?: string): number => {
  if (!distanceString) return 999;
  const match = distanceString.match(/\d+/);
  return match ? parseInt(match[0]) : 999;
};

// Helper function to check if supplier location matches search location
const isLocationMatch = (supplier: RealSupplier, searchLocation: string): boolean => {
  if (!searchLocation) return true;
  
  const searchLower = searchLocation.toLowerCase();
  const supplierLocationLower = supplier.location.toLowerCase();
  const supplierAddressLower = (supplier.address || '').toLowerCase();
  
  return supplierLocationLower.includes(searchLower) || 
         supplierAddressLower.includes(searchLower) ||
         (supplier.country && searchLower.includes(supplier.country.toLowerCase())) ||
         (supplier.province && searchLower.includes(supplier.province.toLowerCase())) ||
         (supplier.city && searchLower.includes(supplier.city.toLowerCase()));
};

// Helper function to calculate distance-based lead time and pricing adjustments
const adjustSupplierForLocation = (supplier: RealSupplier, searchLocation: string): RealSupplier => {
  if (!searchLocation) return supplier;
  
  const searchLower = searchLocation.toLowerCase();
  let distanceMultiplier = 1;
  let leadTimeAdjustment = 0;
  
  if (supplier.location.toLowerCase().includes(searchLower.split(',')[0])) {
    distanceMultiplier = 1;
    leadTimeAdjustment = 0;
  } else if (searchLower.includes('jakarta') && supplier.location.toLowerCase().includes('jakarta')) {
    distanceMultiplier = 1.1;
    leadTimeAdjustment = 1;
  } else if (searchLower.includes('indonesia') || supplier.country === 'Indonesia') {
    distanceMultiplier = 1.3;
    leadTimeAdjustment = 2;
  } else {
    distanceMultiplier = 1.8;
    leadTimeAdjustment = 5;
  }
  
  const adjustedBasePrice = Math.round(supplier.basePrice * distanceMultiplier);
  const adjustedPrice = `Rp${adjustedBasePrice.toLocaleString('id-ID')}`;
  
  const leadTimeNumbers = supplier.leadTime.match(/\d+/g);
  if (leadTimeNumbers && leadTimeNumbers.length >= 2) {
    const minDays = parseInt(leadTimeNumbers[0]) + leadTimeAdjustment;
    const maxDays = parseInt(leadTimeNumbers[1]) + leadTimeAdjustment;
    const adjustedLeadTime = `${minDays}-${maxDays} days`;
    
    return {
      ...supplier,
      price: adjustedPrice,
      basePrice: adjustedBasePrice,
      leadTime: adjustedLeadTime
    };
  }
  
  return {
    ...supplier,
    price: adjustedPrice,
    basePrice: adjustedBasePrice
  };
};

// Login Prompt Modal Component
const LoginPromptModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onShowAuth: () => void;
}> = ({ isOpen, onClose, onShowAuth }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10001]">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Bookmark className="w-8 h-8 text-orange-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Save to Your Shortlist
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          <strong>For a better experience</strong>, sign in to save suppliers to your shortlist and enjoy:
        </p>
        
        <div className="text-left mb-8 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-700">Save suppliers across devices</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-700">Add personal notes and comparisons</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-700">Export shortlist to PDF</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-700">Track your procurement history</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={() => {
              onClose();
              onShowAuth();
            }}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-medium transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

const SupplierMatches: React.FC<SupplierMatchesProps> = ({ 
  onAddToShortlist, 
  shortlistedIds, 
  searchMode = 'product', 
  searchData,
  onUpdateSearch,
  onShowAuth
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedSupplier, setSelectedSupplier] = React.useState<RealSupplier | null>(null);
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<string>('ai-recommendation');
  const [showAllTrending, setShowAllTrending] = React.useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);
  const { user } = useAuth();
  
  // Filter and adjust suppliers based on search criteria
  const getFilteredSuppliers = React.useMemo(() => {
    let filteredSuppliers: RealSupplier[] = [];
    
    if (searchMode === 'category' && searchData?.category) {
      // Get suppliers for specific category
      filteredSuppliers = suppliersByCategory[searchData.category as keyof typeof suppliersByCategory] || [];
    } else if (searchMode === 'product' && searchData?.items) {
      // For product search, find suppliers that might have those products
      const searchTerms = searchData.items.map((item: any) => item.productName.toLowerCase());
      
      filteredSuppliers = allRealSuppliers.filter(supplier => {
        // Check if supplier specializes in relevant categories
        if (supplier.specialties) {
          return supplier.specialties.some(specialty => 
            searchTerms.some(term => 
              specialty.toLowerCase().includes(term) || 
              term.includes(specialty.toLowerCase()) ||
              (term.includes('food') && specialty.toLowerCase().includes('food')) ||
              (term.includes('packaging') && specialty.toLowerCase().includes('packaging')) ||
              (term.includes('electronic') && specialty.toLowerCase().includes('electronic'))
            )
          );
        }
        
        // Fallback: include food suppliers for food-related searches
        if (searchTerms.some(term => 
          term.includes('food') || term.includes('noodle') || term.includes('beverage') || 
          term.includes('snack') || term.includes('drink')
        )) {
          return supplier.specialties?.some(s => s.toLowerCase().includes('food')) || 
                 supplier.name.toLowerCase().includes('food') ||
                 supplier.description?.toLowerCase().includes('food');
        }
        
        return true; // Include all suppliers if no specific match
      });
    } else {
      // Default: show all suppliers
      filteredSuppliers = allRealSuppliers;
    }
    
    // Filter by location if specified
    const searchLocation = searchData?.location || '';
    if (searchLocation) {
      filteredSuppliers = filteredSuppliers.filter(supplier => 
        isLocationMatch(supplier, searchLocation)
      );
      
      // If no exact matches, show suppliers from same country
      if (filteredSuppliers.length === 0) {
        const searchLower = searchLocation.toLowerCase();
        if (searchLower.includes('indonesia')) {
          filteredSuppliers = allRealSuppliers.filter(s => s.country === 'Indonesia');
        }
      }
    }
    
    // If still no matches, show all suppliers
    if (filteredSuppliers.length === 0) {
      filteredSuppliers = allRealSuppliers;
    }
    
    // Adjust pricing and lead times based on location
    return filteredSuppliers.map(supplier => 
      adjustSupplierForLocation(supplier, searchLocation)
    );
  }, [searchMode, searchData]);

  // Sort suppliers based on selected criteria
  const sortedSuppliers = React.useMemo(() => {
    const suppliersCopy = [...getFilteredSuppliers];
    
    // Add AI recommendations to some suppliers
    suppliersCopy.forEach((supplier, index) => {
      if (index < 2) {
        supplier.isRecommended = true;
        supplier.matchPercentage = 100 - (index * 5);
        supplier.aiReason = `Excellent match based on your requirements. ${supplier.description}`;
      }
    });
    
    switch (sortBy) {
      case 'ai-recommendation':
        return suppliersCopy.sort((a, b) => {
          if (a.isRecommended && !b.isRecommended) return -1;
          if (!a.isRecommended && b.isRecommended) return 1;
          return (b.matchPercentage || 0) - (a.matchPercentage || 0);
        });
        
      case 'price-low-high':
        return suppliersCopy.sort((a, b) => {
          const priceA = extractPriceValue(a.price);
          const priceB = extractPriceValue(b.price);
          return priceA - priceB;
        });
        
      case 'price-high-low':
        return suppliersCopy.sort((a, b) => {
          const priceA = extractPriceValue(a.price);
          const priceB = extractPriceValue(b.price);
          return priceB - priceA;
        });
        
      case 'lead-time':
        return suppliersCopy.sort((a, b) => {
          const timeA = extractLeadTimeValue(a.leadTime);
          const timeB = extractLeadTimeValue(b.leadTime);
          return timeA - timeB;
        });
        
      case 'rating':
        return suppliersCopy.sort((a, b) => b.rating - a.rating);
        
      case 'distance':
        return suppliersCopy.sort((a, b) => {
          const distA = extractDistanceValue(a.distance);
          const distB = extractDistanceValue(b.distance);
          return distA - distB;
        });
        
      default:
        return suppliersCopy;
    }
  }, [getFilteredSuppliers, sortBy]);

  const aiRecommendations = sortedSuppliers.filter(s => s.isRecommended);
  const otherMatches = sortedSuppliers.filter(s => !s.isRecommended);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = (newData: any) => {
    if (onUpdateSearch) {
      onUpdateSearch(newData);
    }
    setIsEditing(false);
  };

  const handleSeeDetails = (supplier: RealSupplier) => {
    setSelectedSupplier(supplier);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedSupplier(null);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleSaveToShortlist = (supplier: RealSupplier) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    onAddToShortlist(supplier);
  };

  const handleTrendingProductClick = (productName: string) => {
    const newSearchData = {
      searchMode: 'product',
      items: [{
        id: '1',
        productName: productName,
        quantity: '1',
        unit: 'Pieces (Pcs)',
        targetPrice: ''
      }],
      platforms: ['All'],
      location: searchData?.location || '',
      leadTime: 'no preference'
    };
    
    if (onUpdateSearch) {
      onUpdateSearch(newSearchData);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
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

  const getCategoryName = () => {
    if (searchData?.searchMode === 'category') {
      return searchData.category;
    } else if (searchData?.items && searchData.items.length > 0) {
      const firstProduct = searchData.items[0].productName.toLowerCase();
      if (firstProduct.includes('coffee') || firstProduct.includes('tea') || firstProduct.includes('beverage')) {
        return 'Food & Beverage';
      } else if (firstProduct.includes('packaging') || firstProduct.includes('box') || firstProduct.includes('container')) {
        return 'Packaging';
      } else if (firstProduct.includes('electronic') || firstProduct.includes('tech')) {
        return 'Electronics';
      } else {
        return 'General Products';
      }
    }
    return 'General Products';
  };

  const trendingProducts = [
    {
      name: 'Instant Coffee Packets',
      description: 'Single-serve instant coffee packets for offices and cafes',
      growth: '+31%',
      searches: '18.7k',
      suppliers: '280+',
      priceRange: 'Rp2,500-8,000'
    },
    {
      name: 'Organic Green Tea',
      description: 'Premium organic green tea leaves and tea bags',
      growth: '+26%',
      searches: '12.4k',
      suppliers: '190+',
      priceRange: 'Rp15,000-45,000'
    },
    {
      name: 'Protein Energy Bars',
      description: 'High-protein snack bars for fitness and nutrition',
      growth: '+24%',
      searches: '9.8k',
      suppliers: '150+',
      priceRange: 'Rp8,000-22,000'
    },
    {
      name: 'Coconut Water Bottles',
      description: 'Natural coconut water in eco-friendly packaging',
      growth: '+20%',
      searches: '8.2k',
      suppliers: '120+',
      priceRange: 'Rp3,500-12,000'
    },
    {
      name: 'Dried Fruit Snacks',
      description: 'Healthy dried fruit mixes and individual fruit snacks',
      growth: '+17%',
      searches: '6.9k',
      suppliers: '180+',
      priceRange: 'Rp12,000-35,000'
    }
  ];

  const displayedTrendingProducts = showAllTrending ? trendingProducts : trendingProducts.slice(0, 4);

  const renderSupplierCard = (supplier: RealSupplier, isAIRecommendation: boolean = false) => {
    return (
      <div key={supplier.id} className={`relative bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-lg ${
        isAIRecommendation ? 'border-orange-200 bg-gradient-to-br from-orange-50/30 to-white' : 'border-gray-200'
      }`}>
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white rounded-lg px-3 py-2 text-right">
            <div className="text-xl font-bold text-teal-600 mb-1">
              {calculateEstimatedPrice(searchData, supplier.basePrice)}
            </div>
            <div className="text-xs text-gray-500">Estimated Total</div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1 pr-20">
              <img
                src={supplier.image}
                alt={supplier.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{supplier.name}</h3>
                    
                    <div className="flex items-center gap-2">
                      {isAIRecommendation && (
                        <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          <Bot className="w-4 h-4" />
                          AI Top Pick #{aiRecommendations.findIndex(s => s.id === supplier.id) + 1}
                        </div>
                      )}
                      <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                        {supplier.matchPercentage || 95}% Match
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {renderStars(supplier.rating)}
                    <span className="text-sm font-medium text-gray-700 ml-1">{supplier.rating}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPlatformColor(supplier.platform)}`}>
                    {supplier.platform}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
                  <MapPin className="w-4 h-4" />
                  {supplier.location}
                </div>
                
                <div className="text-xs text-gray-500 mb-2">
                  📍 {supplier.address}
                </div>
                
                {supplier.distance && supplier.driveTime && (
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      {supplier.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-500" />
                      {supplier.driveTime}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isAIRecommendation && supplier.aiReason && (
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Why AI recommends this supplier:</h4>
                  <p className="text-sm text-blue-800 leading-relaxed">{supplier.aiReason}</p>
                </div>
              </div>
            </div>
          )}

          {supplier.specialties && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Specialties:</h4>
              <div className="flex flex-wrap gap-2">
                {supplier.specialties.map((specialty, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleSeeDetails(supplier)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-all duration-200"
            >
              See Details
            </button>
            
            <button
              onClick={() => handleSaveToShortlist(supplier)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                shortlistedIds.includes(supplier.id)
                  ? 'bg-orange-100 text-orange-700 border border-orange-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {shortlistedIds.includes(supplier.id) ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <ProcurementSummary
        searchData={searchData}
        onEdit={() => setIsEditing(true)}
        isEditing={isEditing}
        onToggleEdit={handleEditToggle}
      />

      {isEditing && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <RequestForm onSubmit={handleFormSubmit} initialData={searchData} />
          </div>
        </div>
      )}

      {!isEditing && searchData && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Flame className="w-7 h-7 text-orange-500" />
              Trending Products in {getCategoryName()}
            </h2>
            <p className="text-gray-600">
              Real-time market data based on search analytics and supplier platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {displayedTrendingProducts.map((product, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 cursor-pointer group"
                onClick={() => handleTrendingProductClick(product.name)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.growth}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">{product.searches}</div>
                    <div className="text-gray-500">Monthly Searches</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{product.suppliers}</div>
                    <div className="text-gray-500">Suppliers</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{product.priceRange}</div>
                    <div className="text-gray-500">Price Range</div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 group-hover:text-orange-600 transition-colors">
                  Click to search for suppliers →
                </div>
              </div>
            ))}
          </div>

          {trendingProducts.length > 4 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllTrending(!showAllTrending)}
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                {showAllTrending ? 'Show Less' : `See All ${trendingProducts.length} Trending Products`}
              </button>
            </div>
          )}
        </div>
      )}

      {!isEditing && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Supplier Recommendations ({sortedSuppliers.length})</h2>
              {searchData?.location && (
                <p className="text-gray-600 mt-2 text-lg">
                  Showing suppliers for: <span className="font-medium text-gray-900">{searchData.location}</span>
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:outline-none bg-white"
              >
                <option value="ai-recommendation">AI Recommendation & Match %</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="lead-time">Lead Time</option>
                <option value="rating">Rating</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>

          {sortBy === 'ai-recommendation' ? (
            <>
              {aiRecommendations.length > 0 && (
                <div className="space-y-6">
                  {aiRecommendations.map(supplier => renderSupplierCard(supplier, true))}
                </div>
              )}

              {otherMatches.length > 0 && (
                <div className="space-y-6">
                  {aiRecommendations.length > 0 && (
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Other Supplier Matches</h3>
                    </div>
                  )}
                  {otherMatches.map(supplier => renderSupplierCard(supplier, false))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              {sortedSuppliers.map(supplier => renderSupplierCard(supplier, supplier.isRecommended))}
            </div>
          )}
        </>
      )}

      <SupplierDetailModal
        supplier={selectedSupplier}
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        userLocation={[-6.2088, 106.8456]}
        searchData={searchData}
        user={user}
        onShowAuth={onShowAuth}
        onAddToShortlist={onAddToShortlist}
        shortlistedIds={shortlistedIds}
      />

      {onShowAuth && (
        <LoginPromptModal
          isOpen={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
          onShowAuth={onShowAuth}
        />
      )}
    </div>
  );
};

export default SupplierMatches;