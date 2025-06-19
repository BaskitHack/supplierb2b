import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Circle } from 'react-leaflet';
import { X, MapPin, Navigation, Loader, Search, Clock, MapIcon, CheckCircle } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapLocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

interface LocationMarkerProps {
  position: [number, number] | null;
  setPosition: (position: [number, number]) => void;
}

interface SearchResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
};

const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
};

export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  isOpen,
  onClose,
  onLocationSelect
}) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const [hasTriedCurrentLocation, setHasTriedCurrentLocation] = useState(false);

  // Default to Indonesia coordinates
  const defaultCenter: [number, number] = [-6.2088, 106.8456];
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultCenter);
  const [mapZoom, setMapZoom] = useState(11);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('supplierscout-recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading recent searches:', e);
      }
    }
  }, []);

  // Auto-get current location when modal opens
  useEffect(() => {
    if (isOpen && !hasTriedCurrentLocation) {
      setHasTriedCurrentLocation(true);
      getCurrentLocationAuto();
    }
  }, [isOpen, hasTriedCurrentLocation]);

  const saveRecentSearch = (query: string) => {
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('supplierscout-recent-searches', JSON.stringify(updated));
  };

  const getCurrentLocationAuto = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];
        setCurrentLocation(coords);
        setMapCenter(coords);
        setMapZoom(15);
        reverseGeocode(coords[0], coords[1]);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.log('Unable to get current location:', error.message);
        setIsLoadingLocation(false);
        // Silently fail and keep default location
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];
        setCurrentLocation(coords);
        setPosition(coords);
        setMapCenter(coords);
        setMapZoom(15);
        reverseGeocode(coords[0], coords[1]);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your current location. Please select manually on the map.');
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Global search without country restrictions - like Google Maps
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10&addressdetails=1&extratags=1`
      );
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // Sort by importance and relevance
        const sortedResults = data
          .filter((result: any) => result.lat && result.lon)
          .sort((a: any, b: any) => (b.importance || 0) - (a.importance || 0))
          .slice(0, 8);
        
        setSearchResults(sortedResults);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    setShowSearchResults(true);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      searchLocation(value);
    }, 300);
  };

  const handleSearchResultClick = (result: SearchResult) => {
    const coords: [number, number] = [parseFloat(result.lat), parseFloat(result.lon)];
    setPosition(coords);
    setMapCenter(coords);
    setMapZoom(15);
    setAddress(result.display_name);
    setSearchQuery('');
    setShowSearchResults(false);
    saveRecentSearch(result.display_name);
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(true);
    searchLocation(query);
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    setIsLoadingAddress(true);
    try {
      // Using Nominatim (OpenStreetMap) for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      const fallback = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      setAddress(fallback);
    }
    setIsLoadingAddress(false);
  };

  const handlePositionChange = (newPosition: [number, number]) => {
    setPosition(newPosition);
    reverseGeocode(newPosition[0], newPosition[1]);
  };

  const handleConfirmLocation = async () => {
    if (!position || isConfirming) {
      return;
    }

    setIsConfirming(true);
    
    try {
      // Wait for address to be ready if it's still loading
      let attempts = 0;
      while (isLoadingAddress && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        attempts++;
      }

      // Ensure we have a valid address
      let finalAddress = address;
      if (!finalAddress) {
        finalAddress = `${position[0].toFixed(6)}, ${position[1].toFixed(6)}`;
      }

      console.log('Confirming location:', { lat: position[0], lng: position[1], address: finalAddress });

      // Call the callback with the location data
      await onLocationSelect({
        lat: position[0],
        lng: position[1],
        address: finalAddress
      });

      // Small delay to ensure callback is processed
      await new Promise(resolve => setTimeout(resolve, 300));
      
    } catch (error) {
      console.error('Error confirming location:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  const getLocationTypeIcon = (type: string) => {
    switch (type) {
      case 'administrative':
        return '🏛️';
      case 'residential':
        return '🏠';
      case 'commercial':
        return '🏢';
      case 'retail':
        return '🛍️';
      case 'amenity':
        return '🏪';
      case 'tourism':
        return '🏨';
      case 'place':
        return '🌍';
      default:
        return '📍';
    }
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setHasTriedCurrentLocation(false);
      setPosition(null);
      setCurrentLocation(null);
      setAddress('');
      setSearchQuery('');
      setShowSearchResults(false);
      setMapCenter(defaultCenter);
      setMapZoom(11);
      setIsConfirming(false);
      setIsLoadingAddress(false);
    }
  }, [isOpen]);

  // Check if we can confirm (position exists and address is ready)
  const canConfirm = position && !isLoadingAddress && !isConfirming;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Choose Location from Map</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isConfirming}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search and Controls */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 space-y-4 relative">
          {/* Search Bar */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for address, place name, or landmark anywhere in the world..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
                disabled={isConfirming}
              />
              {isSearching && (
                <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
              )}
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && (searchResults.length > 0 || recentSearches.length > 0) && !isConfirming && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-80 overflow-y-auto z-[10000]">
                {/* Recent Searches */}
                {recentSearches.length > 0 && searchQuery.length === 0 && (
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      Recent Searches
                    </div>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className="w-full text-left px-2 py-2 hover:bg-orange-50 rounded text-sm text-gray-700 truncate"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="p-2">
                    {searchResults.map((result) => (
                      <button
                        key={result.place_id}
                        onClick={() => handleSearchResultClick(result)}
                        className="w-full text-left p-3 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-lg mt-0.5">
                            {getLocationTypeIcon(result.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 text-sm truncate">
                              {result.display_name.split(',')[0]}
                            </div>
                            <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {result.display_name}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {searchQuery.length > 0 && searchResults.length === 0 && !isSearching && (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={getCurrentLocation}
              disabled={isLoadingLocation || isConfirming}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            >
              {isLoadingLocation ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4 mr-2" />
              )}
              Use Current Location
            </button>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapIcon className="h-4 w-4 mr-1" />
              Click on map to select location
            </div>
          </div>

          {/* Selected Address */}
          {position && (
            <div className={`rounded-lg p-3 border transition-all duration-200 ${
              canConfirm 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-start space-x-2">
                <MapPin className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  canConfirm ? 'text-green-600' : 'text-orange-500'
                }`} />
                <div className="flex-1">
                  <div className={`font-medium text-sm ${
                    canConfirm ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    Selected Location:
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {isLoadingAddress ? (
                      <div className="flex items-center">
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Getting address...
                      </div>
                    ) : (
                      address || `${position[0].toFixed(6)}, ${position[1].toFixed(6)}`
                    )}
                  </div>
                  {canConfirm && (
                    <div className="flex items-center mt-2 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Ready to confirm
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController center={mapCenter} zoom={mapZoom} />
            
            {/* Current Location Blue Dot */}
            {currentLocation && (
              <>
                <Circle
                  center={currentLocation}
                  radius={50}
                  pathOptions={{
                    color: '#3B82F6',
                    fillColor: '#3B82F6',
                    fillOpacity: 0.3,
                    weight: 2
                  }}
                />
                <Circle
                  center={currentLocation}
                  radius={10}
                  pathOptions={{
                    color: '#1D4ED8',
                    fillColor: '#1D4ED8',
                    fillOpacity: 0.8,
                    weight: 3
                  }}
                />
              </>
            )}
            
            {/* Selected Location Marker */}
            <LocationMarker position={position} setPosition={handlePositionChange} />
          </MapContainer>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            {/* Status Message */}
            <div className="text-sm text-gray-600">
              {!position && "Click on the map or search to select a location"}
              {position && isLoadingAddress && "Getting address information..."}
              {position && !isLoadingAddress && !isConfirming && "Location ready to confirm"}
              {isConfirming && "Confirming location..."}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                disabled={isConfirming}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLocation}
                disabled={!canConfirm}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  canConfirm
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isConfirming ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm Location
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLocationPicker;