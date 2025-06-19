import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, MapPin, Truck, ExternalLink, Star, Clock, Package, Building2, Navigation, ChevronDown, ChevronUp, CheckCircle, AlertCircle, XCircle, Bot, Sparkles, Bookmark } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  matchPercentage?: number;
  aiReason?: string;
  image: string;
  distance?: string;
  driveTime?: string;
  address?: string;
  itemAvailability?: Array<{
    name: string;
    available: number;
    status: 'available' | 'limited' | 'unavailable';
    requested?: number;
    unit?: string;
    pricePerUnit?: number;
  }>;
  specialties?: string[];
  basePrice?: number;
  // Contact information
  email?: string;
  phone?: string;
  whatsapp?: string;
  // Location coordinates
  coordinates?: [number, number];
  // Platform URL
  platformUrl?: string;
}

interface ShippingOption {
  courier: string;
  service: string;
  estimatedCost: string;
  estimatedTime: string;
  logo: string;
}

interface SupplierDetailModalProps {
  supplier: Supplier | null;
  isOpen: boolean;
  onClose: () => void;
  userLocation?: [number, number];
  searchData?: any; // To get requested quantities
  user?: any; // Current user
  onShowAuth?: () => void; // Function to show auth modal
  onAddToShortlist?: (supplier: Supplier) => void;
  shortlistedIds?: string[];
}

const PlatformRedirectModal: React.FC<{
  isOpen: boolean;
  platform: string;
  onComplete: () => void;
}> = ({ isOpen, platform, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isOpen, onComplete]);

  const getPlatformLogo = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'tokopedia':
        return '🟢'; // Green circle representing Tokopedia
      case 'shopee':
        return '🟠'; // Orange circle representing Shopee
      case 'alibaba':
        return '🟡'; // Yellow circle representing Alibaba
      default:
        return '🔵';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[10000]">
      <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-4">
        <div className="text-6xl mb-6 animate-bounce">
          {getPlatformLogo(platform)}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          We're taking you to
        </h3>
        <div className="text-3xl font-bold mb-8 capitalize" style={{
          color: platform.toLowerCase() === 'tokopedia' ? '#42b883' : 
                platform.toLowerCase() === 'shopee' ? '#ee4d2d' :
                platform.toLowerCase() === 'alibaba' ? '#ff6a00' : '#1a73e8'
        }}>
          {platform}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="h-3 rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: platform.toLowerCase() === 'tokopedia' ? '#42b883' : 
                             platform.toLowerCase() === 'shopee' ? '#ee4d2d' :
                             platform.toLowerCase() === 'alibaba' ? '#ff6a00' : '#1a73e8'
            }}
          ></div>
        </div>
        
        <p className="text-gray-600">
          {progress < 50 ? 'Preparing your request...' : 
           progress < 80 ? 'Connecting to platform...' : 
           'Almost ready!'}
        </p>
      </div>
    </div>
  );
};

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
          Sign in to save suppliers to your shortlist and enjoy a better experience with:
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

export default function SupplierDetailModal({ 
  supplier, 
  isOpen, 
  onClose, 
  userLocation, 
  searchData, 
  user, 
  onShowAuth, 
  onAddToShortlist,
  shortlistedIds = []
}: SupplierDetailModalProps) {
  const [showAllShipping, setShowAllShipping] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  if (!supplier || !isOpen) return null;

  // Mock shipping options
  const shippingOptions: ShippingOption[] = [
    {
      courier: 'JNE',
      service: 'Regular',
      estimatedCost: 'Rp15,000 - Rp25,000',
      estimatedTime: '2-3 days',
      logo: '📦'
    },
    {
      courier: 'J&T Express',
      service: 'Regular',
      estimatedCost: 'Rp12,000 - Rp22,000',
      estimatedTime: '2-4 days',
      logo: '🚚'
    },
    {
      courier: 'SiCepat',
      service: 'Regular',
      estimatedCost: 'Rp14,000 - Rp24,000',
      estimatedTime: '1-3 days',
      logo: '⚡'
    },
    {
      courier: 'Pos Indonesia',
      service: 'Paket Kilat',
      estimatedCost: 'Rp10,000 - Rp18,000',
      estimatedTime: '3-5 days',
      logo: '📮'
    },
    {
      courier: 'Ninja Express',
      service: 'Standard',
      estimatedCost: 'Rp13,000 - Rp23,000',
      estimatedTime: '2-4 days',
      logo: '🥷'
    }
  ];

  const displayedShipping = showAllShipping ? shippingOptions : shippingOptions.slice(0, 3);

  const handlePlatformRedirect = () => {
    setShowRedirectModal(true);
  };

  const handleRedirectComplete = () => {
    setShowRedirectModal(false);
    // In a real app, this would open the actual platform URL
    const platformUrl = supplier.platformUrl || `https://${supplier.platform.toLowerCase()}.com`;
    window.open(platformUrl, '_blank');
  };

  const handleSaveToShortlist = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (onAddToShortlist) {
      onAddToShortlist(supplier);
    }
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

  // Enhanced item availability with requested quantities and pricing
  const getEnhancedItemAvailability = () => {
    if (!supplier.itemAvailability) return [];

    return supplier.itemAvailability.map(item => {
      // Find requested quantity from search data
      let requestedQuantity = 1;
      let requestedUnit = 'Carton';
      
      if (searchData && searchData.items) {
        const searchItem = searchData.items.find((si: any) => 
          si.productName.toLowerCase().includes(item.name.toLowerCase()) ||
          item.name.toLowerCase().includes(si.productName.toLowerCase())
        );
        if (searchItem) {
          requestedQuantity = parseInt(searchItem.quantity) || 1;
          requestedUnit = searchItem.unit || 'Carton';
        }
      }

      // Mock pricing based on item
      let pricePerUnit = 3400;
      if (item.name.toLowerCase().includes('bear') || item.name.toLowerCase().includes('brand')) {
        pricePerUnit = 42000;
      }

      return {
        ...item,
        requested: requestedQuantity,
        unit: requestedUnit,
        pricePerUnit: pricePerUnit
      };
    });
  };

  const enhancedItems = getEnhancedItemAvailability();

  // Calculate total
  const calculateTotal = () => {
    return enhancedItems.reduce((total, item) => {
      const canFulfill = Math.min(item.requested || 0, item.available);
      return total + (canFulfill * (item.pricePerUnit || 0));
    }, 0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'limited':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'unavailable':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">In Stock</span>;
      case 'limited':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Limited</span>;
      case 'unavailable':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Out of Stock</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Unknown</span>;
    }
  };

  // Default coordinates (Jakarta) if not provided
  const supplierCoords: [number, number] = supplier.coordinates || [-6.2088, 106.8456];
  const isShortlisted = shortlistedIds.includes(supplier.id);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
        <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-4 flex-1">
              <img
                src={supplier.image}
                alt={supplier.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{supplier.name}</h2>
                  
                  {/* AI Badge and Match Percentage moved here */}
                  <div className="flex items-center gap-2">
                    {supplier.isRecommended && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        <Bot className="w-4 h-4" />
                        AI Pick
                      </div>
                    )}
                    {supplier.matchPercentage && (
                      <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                        {supplier.matchPercentage}% Match
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(supplier.rating)}
                    <span className="text-sm font-medium text-gray-700 ml-1">{supplier.rating}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPlatformColor(supplier.platform)}`}>
                    {supplier.platform}
                  </span>
                </div>
                
                {/* Address with Lead Time */}
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{supplier.address || supplier.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{supplier.leadTime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Estimated Total moved to top right */}
            {enhancedItems.length > 0 && (
              <div className="text-right mr-4">
                <div className="text-sm text-gray-600 mb-1">Estimated Total</div>
                <div className="text-2xl font-bold text-orange-600">
                  Rp{calculateTotal().toLocaleString('id-ID')}
                </div>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a 
                          href={`mailto:${supplier.email || 'contact@' + supplier.name.toLowerCase().replace(/\s+/g, '') + '.com'}`}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          {supplier.email || 'contact@' + supplier.name.toLowerCase().replace(/\s+/g, '') + '.com'}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <a 
                          href={`tel:${supplier.phone || '+62-21-5555-1234'}`}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          {supplier.phone || '+62-21-5555-1234'}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 text-green-500 font-bold text-center">💬</div>
                      <div>
                        <p className="font-medium text-gray-900">WhatsApp</p>
                        <a 
                          href={`https://wa.me/${supplier.whatsapp || '6281234567890'}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 transition-colors"
                        >
                          {supplier.whatsapp || '+62-812-3456-7890'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Lead Time */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-600" />
                    Pricing & Delivery
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{supplier.price}</div>
                      <div className="text-sm text-gray-600">Price Range</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-teal-600 flex items-center justify-center gap-1">
                        <Clock className="w-5 h-5" />
                        {supplier.leadTime.split('-')[0]}
                      </div>
                      <div className="text-sm text-gray-600">Lead Time</div>
                    </div>
                  </div>
                </div>

                {/* Shipping Estimates */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    Shipping Cost Estimates
                  </h3>
                  <div className="space-y-3">
                    {displayedShipping.map((option, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{option.logo}</span>
                          <div>
                            <p className="font-medium text-gray-900">{option.courier}</p>
                            <p className="text-sm text-gray-600">{option.service}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{option.estimatedCost}</p>
                          <p className="text-sm text-gray-600">{option.estimatedTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {shippingOptions.length > 3 && (
                    <button
                      onClick={() => setShowAllShipping(!showAllShipping)}
                      className="w-full mt-3 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      {showAllShipping ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          See More ({shippingOptions.length - 3} more options)
                        </>
                      )}
                    </button>
                  )}
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Shipping costs are estimates based on distance and package weight. 
                      Final costs may vary depending on actual package dimensions and courier promotions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Location Map */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-green-600" />
                    Supplier Location
                  </h3>
                  <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
                    <MapContainer
                      center={supplierCoords}
                      zoom={13}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      
                      {/* Supplier Location Marker */}
                      <Marker position={supplierCoords} />
                      
                      {/* User Location (if provided) */}
                      {userLocation && (
                        <>
                          <Circle
                            center={userLocation}
                            radius={100}
                            pathOptions={{
                              color: '#3B82F6',
                              fillColor: '#3B82F6',
                              fillOpacity: 0.3,
                              weight: 2
                            }}
                          />
                          <Circle
                            center={userLocation}
                            radius={20}
                            pathOptions={{
                              color: '#1D4ED8',
                              fillColor: '#1D4ED8',
                              fillOpacity: 0.8,
                              weight: 3
                            }}
                          />
                        </>
                      )}
                    </MapContainer>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{supplier.distance || '15 km away'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{supplier.driveTime || '25-35 mins drive'}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Item Availability */}
                {enhancedItems.length > 0 ? (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      Requested Items & Availability
                    </h3>
                    <div className="space-y-4">
                      {enhancedItems.map((item, index) => {
                        const canFulfill = Math.min(item.requested || 0, item.available);
                        const totalPrice = canFulfill * (item.pricePerUnit || 0);
                        
                        return (
                          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {getStatusIcon(item.status)}
                                <div>
                                  <h4 className="font-semibold text-gray-900 capitalize">{item.name}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    {getStatusBadge(item.status)}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">
                                  Rp{(item.pricePerUnit || 0).toLocaleString('id-ID')}
                                </div>
                                <div className="text-sm text-gray-600">per unit</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Requested:</span>
                                <span className="font-medium text-gray-900 ml-2">
                                  {item.requested} {item.unit}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">Available:</span>
                                <span className={`font-medium ml-2 ${
                                  item.status === 'available' ? 'text-green-700' :
                                  item.status === 'limited' ? 'text-yellow-700' :
                                  'text-red-700'
                                }`}>
                                  {item.available} units
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                  {canFulfill} units available
                                </span>
                                <div className="text-right">
                                  <div className="font-bold text-gray-900">
                                    Total: Rp{totalPrice.toLocaleString('id-ID')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : supplier.specialties ? (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {supplier.specialties.map((specialty, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* AI Recommendation */}
                {supplier.isRecommended && supplier.aiReason && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      Why AI Recommends This Supplier
                    </h3>
                    <p className="text-blue-800 leading-relaxed">{supplier.aiReason}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Ready to connect with this supplier?
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveToShortlist}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    isShortlisted
                      ? 'bg-orange-100 text-orange-700 border border-orange-200'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  {isShortlisted ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handlePlatformRedirect}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit on {supplier.platform}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Redirect Modal */}
      <PlatformRedirectModal
        isOpen={showRedirectModal}
        platform={supplier.platform}
        onComplete={handleRedirectComplete}
      />

      {/* Login Prompt Modal */}
      {onShowAuth && (
        <LoginPromptModal
          isOpen={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
          onShowAuth={onShowAuth}
        />
      )}
    </>
  );
}