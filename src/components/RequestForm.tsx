import React from 'react';
import { Plus, ChevronDown, MapPin, Globe, Clock, Package, Building2 } from 'lucide-react';
import { MapLocationPicker } from './MapModal';

interface RequestItem {
  id: string;
  productName: string;
  quantity: string;
  unit: string;
  targetPrice: string;
}

interface RequestFormProps {
  onSubmit: (data: any) => void;
  initialData?: any; // Add prop for initial data
}

const units = [
  'Pieces (Pcs)', 'Carton', 'Sachet Strip', 'Pack', 
  'Kilogram (kg)', 'Gram (g)', 'Unit (Animal)', 'Liter (L)'
];

const platforms = ['All', 'Shopee', 'Alibaba', 'Tokopedia'];
const leadTimes = [
  'within 2 days', 
  '< 1 week', 
  '1-2 weeks',
  '2-4 weeks',
  '1-2 months',
  'no preference'
];

const supplierCategories = [
  'Heavy Equipment Supplier',
  'Packaging Supplier', 
  'Chemical Supplier',
  'Food & Beverage Supplier',
  'Printing Supplier',
  'Electricity Solution Provider',
  'Electronics & Technology Supplier',
  'Textile & Apparel Supplier',
  'Construction Materials Supplier',
  'Automotive Parts Supplier',
  'Medical Equipment Supplier',
  'Office Supplies Supplier'
];

// Comprehensive location data with proper mapping
const locationData = {
  'Indonesia': {
    provinces: {
      'DKI Jakarta': {
        cities: ['Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Timur'],
        districts: {
          'Jakarta Pusat': ['Menteng', 'Tanah Abang', 'Gambir', 'Sawah Besar', 'Kemayoran', 'Senen', 'Cempaka Putih', 'Johar Baru'],
          'Jakarta Utara': ['Penjaringan', 'Pademangan', 'Tanjung Priok', 'Koja', 'Kelapa Gading', 'Cilincing'],
          'Jakarta Barat': ['Tambora', 'Taman Sari', 'Grogol Petamburan', 'Palmerah', 'Kebon Jeruk', 'Kembangan', 'Cengkareng', 'Kalideres'],
          'Jakarta Selatan': ['Kebayoran Baru', 'Kebayoran Lama', 'Pesanggrahan', 'Cilandak', 'Pasar Minggu', 'Jagakarsa', 'Mampang Prapatan', 'Pancoran', 'Tebet', 'Setia Budi'],
          'Jakarta Timur': ['Matraman', 'Pulogadung', 'Jatinegara', 'Cakung', 'Duren Sawit', 'Kramat Jati', 'Makasar', 'Pasar Rebo', 'Ciracas', 'Cipayung']
        }
      },
      'West Java': {
        cities: ['Bandung', 'Bekasi', 'Bogor', 'Depok', 'Cimahi', 'Sukabumi', 'Cirebon', 'Garut', 'Tasikmalaya', 'Banjar'],
        districts: {
          'Bandung': ['Bandung Wetan', 'Bandung Kulon', 'Bandung Kidul', 'Bojongloa Kaler', 'Bojongloa Kidul', 'Astana Anyar', 'Regol', 'Lengkong', 'Bandung Tengah', 'Cijawura'],
          'Bekasi': ['Bekasi Timur', 'Bekasi Barat', 'Bekasi Utara', 'Bekasi Selatan', 'Bantargebang', 'Mustika Jaya', 'Medan Satria', 'Pondok Gede', 'Jati Asih', 'Jati Sampurna'],
          'Bogor': ['Bogor Tengah', 'Bogor Utara', 'Bogor Selatan', 'Bogor Timur', 'Bogor Barat', 'Tanah Sareal'],
          'Depok': ['Pancoran Mas', 'Beji', 'Cipayung', 'Sukmajaya', 'Cilodong', 'Cimanggis', 'Sawangan', 'Limo', 'Cinere', 'Tapos', 'Bojongsari']
        }
      },
      'Central Java': {
        cities: ['Semarang', 'Surakarta', 'Salatiga', 'Magelang', 'Pekalongan', 'Tegal', 'Sukoharjo', 'Karanganyar', 'Wonogiri', 'Klaten'],
        districts: {
          'Semarang': ['Semarang Tengah', 'Semarang Utara', 'Semarang Timur', 'Semarang Selatan', 'Semarang Barat', 'Gayamsari', 'Genuk', 'Pedurungan', 'Banyumanik', 'Gunungpati'],
          'Surakarta': ['Laweyan', 'Serengan', 'Pasar Kliwon', 'Jebres', 'Banjarsari'],
          'Salatiga': ['Sidorejo', 'Tingkir', 'Argomulyo', 'Sidomukti']
        }
      },
      'East Java': {
        cities: ['Surabaya', 'Malang', 'Madiun', 'Kediri', 'Blitar', 'Mojokerto', 'Pasuruan', 'Probolinggo', 'Batu', 'Sidoarjo'],
        districts: {
          'Surabaya': ['Genteng', 'Tegalsari', 'Bubutan', 'Simokerto', 'Pabean Cantian', 'Semampir', 'Krembangan', 'Kenjeran', 'Bulak', 'Tambaksari', 'Gubeng', 'Rungkut', 'Tenggilis Mejoyo', 'Gunung Anyar', 'Sukolilo', 'Mulyorejo', 'Sawahan', 'Wonokromo', 'Karang Pilang', 'Jambangan', 'Gayungan', 'Wonocolo', 'Wiyung', 'Lakarsantri', 'Benowo', 'Pakal', 'Asemrowo', 'Sukomanunggal', 'Tandes', 'Dukuh Pakis', 'Gayungan'],
          'Malang': ['Klojen', 'Blimbing', 'Kedungkandang', 'Sukun', 'Lowokwaru'],
          'Madiun': ['Manguharjo', 'Taman', 'Kartoharjo'],
          'Kediri': ['Mojoroto', 'Kota Kediri', 'Pesantren']
        }
      },
      'Banten': {
        cities: ['Tangerang', 'Tangerang Selatan', 'Cilegon', 'Serang', 'Lebak', 'Pandeglang'],
        districts: {
          'Tangerang': ['Tangerang', 'Batuceper', 'Benda', 'Cipondoh', 'Ciledug', 'Karawaci', 'Neglasari', 'Pinang', 'Periuk', 'Cibodas', 'Jatiuwung', 'Cikupa', 'Panongan'],
          'Tangerang Selatan': ['Serpong', 'Serpong Utara', 'Pondok Aren', 'Ciputat', 'Ciputat Timur', 'Pamulang', 'Setu'],
          'Cilegon': ['Cilegon', 'Ciwandan', 'Jombang', 'Pulomerak', 'Purwakarta', 'Grogol', 'Cibeber', 'Citangkil'],
          'Serang': ['Serang', 'Kasemen', 'Walantaka', 'Curug', 'Cipocok Jaya', 'Taktakan']
        }
      },
      'Yogyakarta': {
        cities: ['Yogyakarta', 'Bantul', 'Sleman', 'Kulon Progo', 'Gunung Kidul'],
        districts: {
          'Yogyakarta': ['Danurejan', 'Gedongtengen', 'Gondokusuman', 'Jetis', 'Kotagede', 'Kraton', 'Mantrijeron', 'Mergangsan', 'Ngampilan', 'Pakualaman', 'Tegalrejo', 'Umbulharjo', 'Wirobrajan'],
          'Bantul': ['Banguntapan', 'Bantul', 'Dlingo', 'Imogiri', 'Jetis', 'Kasihan', 'Kretek', 'Pajangan', 'Pandak', 'Piyungan', 'Pleret', 'Sanden', 'Sedayu', 'Sewon', 'Srandakan'],
          'Sleman': ['Berbah', 'Cangkringan', 'Depok', 'Gamping', 'Godean', 'Kalasan', 'Minggir', 'Mlati', 'Moyudan', 'Ngaglik', 'Ngemplak', 'Pakem', 'Prambanan', 'Seyegan', 'Sleman', 'Tempel', 'Turi']
        }
      }
    }
  },
  'China': {
    provinces: {
      'Beijing': {
        cities: ['Beijing City', 'Chaoyang', 'Haidian', 'Dongcheng', 'Xicheng', 'Fengtai'],
        districts: {
          'Beijing City': ['Dongcheng District', 'Xicheng District', 'Chaoyang District', 'Fengtai District', 'Shijingshan District', 'Haidian District'],
          'Chaoyang': ['Sanlitun', 'CBD', 'Wangjing', 'Yayuncun', 'Panjiayuan'],
          'Haidian': ['Zhongguancun', 'Wudaokou', 'Shangdi', 'Qinghe', 'Xishan']
        }
      },
      'Shanghai': {
        cities: ['Shanghai City', 'Pudong', 'Huangpu', 'Xuhui', 'Changning', 'Jing\'an'],
        districts: {
          'Shanghai City': ['Huangpu District', 'Xuhui District', 'Changning District', 'Jing\'an District', 'Putuo District', 'Hongkou District'],
          'Pudong': ['Lujiazui', 'Zhangjiang', 'Jinqiao', 'Waigaoqiao', 'Chuansha'],
          'Huangpu': ['The Bund', 'People\'s Square', 'Xintiandi', 'Yu Garden']
        }
      },
      'Guangdong': {
        cities: ['Guangzhou', 'Shenzhen', 'Dongguan', 'Foshan', 'Zhongshan', 'Zhuhai'],
        districts: {
          'Guangzhou': ['Tianhe', 'Yuexiu', 'Liwan', 'Haizhu', 'Baiyun', 'Panyu'],
          'Shenzhen': ['Futian', 'Luohu', 'Nanshan', 'Yantian', 'Bao\'an', 'Longgang'],
          'Dongguan': ['Nancheng', 'Dongcheng', 'Wanjiang', 'Guancheng', 'Shilong']
        }
      }
    }
  },
  'Singapore': {
    provinces: {
      'Central Region': {
        cities: ['Downtown Core', 'Marina Bay', 'Newton', 'Orchard', 'River Valley', 'Rochor'],
        districts: {
          'Downtown Core': ['Raffles Place', 'Tanjong Pagar', 'Marina Centre', 'City Hall'],
          'Marina Bay': ['Marina Bay Financial Centre', 'Marina South', 'Bayfront'],
          'Orchard': ['Orchard Road', 'Somerset', 'Dhoby Ghaut']
        }
      },
      'East Region': {
        cities: ['Bedok', 'Changi', 'Pasir Ris', 'Tampines', 'Hougang', 'Punggol'],
        districts: {
          'Bedok': ['Bedok North', 'Bedok South', 'Bedok Reservoir'],
          'Tampines': ['Tampines East', 'Tampines West', 'Tampines North'],
          'Pasir Ris': ['Pasir Ris Central', 'Pasir Ris West']
        }
      },
      'North Region': {
        cities: ['Woodlands', 'Yishun', 'Sembawang', 'Admiralty', 'Marsiling'],
        districts: {
          'Woodlands': ['Woodlands Centre', 'Woodlands East', 'Woodlands South'],
          'Yishun': ['Yishun Central', 'Yishun East', 'Yishun West']
        }
      }
    }
  },
  'Malaysia': {
    provinces: {
      'Kuala Lumpur': {
        cities: ['Kuala Lumpur City', 'Cheras', 'Kepong', 'Setapak', 'Wangsa Maju'],
        districts: {
          'Kuala Lumpur City': ['Bukit Bintang', 'KLCC', 'Chinatown', 'Little India', 'Bangsar'],
          'Cheras': ['Cheras Baru', 'Taman Connaught', 'Bandar Mahkota Cheras'],
          'Kepong': ['Kepong Baru', 'Taman Ehsan', 'Desa Jaya']
        }
      },
      'Selangor': {
        cities: ['Shah Alam', 'Petaling Jaya', 'Subang Jaya', 'Klang', 'Kajang', 'Ampang'],
        districts: {
          'Shah Alam': ['Section 1', 'Section 7', 'Section 13', 'Section 15', 'Section 24'],
          'Petaling Jaya': ['PJ Old Town', 'PJ New Town', 'Damansara', 'Kelana Jaya'],
          'Subang Jaya': ['SS12', 'SS13', 'SS14', 'SS15', 'USJ']
        }
      }
    }
  },
  'Thailand': {
    provinces: {
      'Bangkok': {
        cities: ['Bangkok City', 'Chatuchak', 'Huai Khwang', 'Din Daeng', 'Dusit', 'Phaya Thai'],
        districts: {
          'Bangkok City': ['Phra Nakhon', 'Dusit', 'Nong Chok', 'Bang Rak', 'Bang Kho Laem'],
          'Chatuchak': ['Chatuchak Market', 'Lat Phrao', 'Wang Thonglang'],
          'Huai Khwang': ['Huai Khwang District', 'Din Daeng District']
        }
      },
      'Chiang Mai': {
        cities: ['Chiang Mai City', 'Mae Rim', 'San Sai', 'Hang Dong', 'Saraphi'],
        districts: {
          'Chiang Mai City': ['Mueang Chiang Mai', 'Chang Khlan', 'Hai Ya', 'Pa Tan'],
          'Mae Rim': ['Mae Rim District', 'Samoeng District']
        }
      }
    }
  }
};

// Helper function to parse location string and extract components
const parseLocationString = (locationString: string) => {
  if (!locationString) return { country: '', province: '', city: '', district: '' };
  
  const parts = locationString.split(',').map(part => part.trim());
  
  // Try to match against known location data
  for (const [country, countryData] of Object.entries(locationData)) {
    if (parts.some(part => part.toLowerCase().includes(country.toLowerCase()))) {
      for (const [province, provinceData] of Object.entries(countryData.provinces)) {
        if (parts.some(part => part.toLowerCase().includes(province.toLowerCase()))) {
          for (const city of provinceData.cities) {
            if (parts.some(part => part.toLowerCase().includes(city.toLowerCase()))) {
              // Try to find district
              const districts = provinceData.districts[city] || [];
              const foundDistrict = districts.find(district => 
                parts.some(part => part.toLowerCase().includes(district.toLowerCase()))
              );
              
              return {
                country,
                province,
                city,
                district: foundDistrict || ''
              };
            }
          }
          // Found province but not city
          return { country, province, city: '', district: '' };
        }
      }
      // Found country but not province
      return { country, province: '', city: '', district: '' };
    }
  }
  
  // If no match found, return empty
  return { country: '', province: '', city: '', district: '' };
};

export default function RequestForm({ onSubmit, initialData }: RequestFormProps) {
  // Initialize state with existing data or defaults
  const [searchMode, setSearchMode] = React.useState<'product' | 'category'>(
    initialData?.searchMode || 'product'
  );
  
  const [items, setItems] = React.useState<RequestItem[]>(() => {
    if (initialData?.items && initialData.items.length > 0) {
      return initialData.items.map((item: any, index: number) => ({
        id: item.id || (index + 1).toString(),
        productName: item.productName || '',
        quantity: item.quantity || '1',
        unit: item.unit || 'Pieces (Pcs)',
        targetPrice: item.targetPrice || ''
      }));
    }
    return [{ id: '1', productName: '', quantity: '1', unit: 'Pieces (Pcs)', targetPrice: '' }];
  });
  
  const [selectedCategory, setSelectedCategory] = React.useState(
    initialData?.category || ''
  );
  
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>(
    initialData?.platforms || ['All']
  );
  
  // Parse location data for manual selection
  const parsedLocation = React.useMemo(() => {
    return parseLocationString(initialData?.location || '');
  }, [initialData?.location]);
  
  const [locationType, setLocationType] = React.useState<'manual' | 'map'>(() => {
    // Determine location type based on initial data
    if (initialData?.location) {
      const parsed = parseLocationString(initialData.location);
      // If we can parse it into structured data, use manual, otherwise use map
      return parsed.country ? 'manual' : 'map';
    }
    return 'manual';
  });
  
  const [selectedCountry, setSelectedCountry] = React.useState(parsedLocation.country);
  const [selectedProvince, setSelectedProvince] = React.useState(parsedLocation.province);
  const [selectedCity, setSelectedCity] = React.useState(parsedLocation.city);
  const [selectedDistrict, setSelectedDistrict] = React.useState(parsedLocation.district);
  
  const [mapLocation, setMapLocation] = React.useState(() => {
    // If location can't be parsed into structured data, use it as map location
    if (initialData?.location && !parsedLocation.country) {
      return initialData.location;
    }
    return '';
  });
  
  const [showMapModal, setShowMapModal] = React.useState(false);
  const [leadTime, setLeadTime] = React.useState(
    initialData?.leadTime || 'no preference'
  );

  // Auto-open map modal when "Choose from Map" is selected
  React.useEffect(() => {
    if (locationType === 'map') {
      setShowMapModal(true);
    }
  }, [locationType]);

  // Form validation logic
  const isFormValid = React.useMemo(() => {
    // Check search mode specific requirements
    if (searchMode === 'product') {
      // At least one item with product name filled
      const hasValidItems = items.some(item => item.productName.trim() !== '');
      if (!hasValidItems) return false;
    } else {
      // Category must be selected
      if (!selectedCategory) return false;
    }

    // Location validation
    let hasValidLocation = false;
    if (locationType === 'manual') {
      // At least country must be selected for manual
      hasValidLocation = selectedCountry !== '';
    } else {
      // Map location must be set
      hasValidLocation = mapLocation !== '';
    }

    // Platform validation (at least one platform selected)
    const hasValidPlatforms = selectedPlatforms.length > 0;

    // Lead time validation (always has default value, so always valid)
    const hasValidLeadTime = leadTime !== '';

    return hasValidLocation && hasValidPlatforms && hasValidLeadTime;
  }, [searchMode, items, selectedCategory, locationType, selectedCountry, mapLocation, selectedPlatforms, leadTime]);

  const addItem = () => {
    const newItem: RequestItem = {
      id: Date.now().toString(),
      productName: '',
      quantity: '1',
      unit: 'Pieces (Pcs)',
      targetPrice: ''
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof RequestItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handlePlatformToggle = (platform: string) => {
    if (platform === 'All') {
      // When "All" is clicked, select all platforms
      setSelectedPlatforms(['All', 'Shopee', 'Alibaba', 'Tokopedia']);
    } else {
      // When a specific platform is clicked
      if (selectedPlatforms.includes('All')) {
        // If "All" was selected, uncheck "All" and only select the clicked platform
        setSelectedPlatforms([platform]);
      } else {
        // Normal toggle behavior for individual platforms
        const newSelection = selectedPlatforms.includes(platform)
          ? selectedPlatforms.filter(p => p !== platform)
          : [...selectedPlatforms, platform];
        
        // If all individual platforms are selected, also select "All"
        const individualPlatforms = ['Shopee', 'Alibaba', 'Tokopedia'];
        const allIndividualSelected = individualPlatforms.every(p => newSelection.includes(p));
        
        if (allIndividualSelected && !newSelection.includes('All')) {
          setSelectedPlatforms(['All', ...newSelection]);
        } else {
          setSelectedPlatforms(newSelection.length === 0 ? ['All', 'Shopee', 'Alibaba', 'Tokopedia'] : newSelection);
        }
      }
    }
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedProvince('');
    setSelectedCity('');
    setSelectedDistrict('');
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity('');
    setSelectedDistrict('');
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict('');
  };

  const handleLocationTypeChange = (type: 'manual' | 'map') => {
    setLocationType(type);
    if (type === 'manual') {
      setMapLocation('');
    } else {
      // Clear manual selections when switching to map
      setSelectedCountry('');
      setSelectedProvince('');
      setSelectedCity('');
      setSelectedDistrict('');
    }
  };

  const handleMapLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    console.log('Location selected from map:', location);
    setMapLocation(location.address);
    setShowMapModal(false);
  };

  const handleMapModalClose = () => {
    setShowMapModal(false);
    // If no location was selected and modal is closed, switch back to manual
    if (!mapLocation) {
      setLocationType('manual');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      return;
    }

    const location = locationType === 'manual' 
      ? [selectedDistrict, selectedCity, selectedProvince, selectedCountry].filter(Boolean).join(', ')
      : mapLocation;
    
    const submitData = {
      searchMode,
      platforms: selectedPlatforms,
      location,
      leadTime
    };

    if (searchMode === 'product') {
      Object.assign(submitData, {
        items: items.filter(item => item.productName.trim())
      });
    } else {
      Object.assign(submitData, {
        category: selectedCategory
      });
    }
    
    onSubmit(submitData);
  };

  // Get available options based on selections
  const availableCountries = Object.keys(locationData);
  const availableProvinces = selectedCountry && locationData[selectedCountry as keyof typeof locationData] 
    ? Object.keys(locationData[selectedCountry as keyof typeof locationData].provinces) 
    : [];
  const availableCities = selectedCountry && selectedProvince && locationData[selectedCountry as keyof typeof locationData]?.provinces[selectedProvince]
    ? locationData[selectedCountry as keyof typeof locationData].provinces[selectedProvince].cities
    : [];
  const availableDistricts = selectedCountry && selectedProvince && selectedCity && locationData[selectedCountry as keyof typeof locationData]?.provinces[selectedProvince]?.districts[selectedCity]
    ? locationData[selectedCountry as keyof typeof locationData].provinces[selectedProvince].districts[selectedCity]
    : [];

  // Get validation messages for better UX
  const getValidationMessage = () => {
    if (searchMode === 'product') {
      const hasValidItems = items.some(item => item.productName.trim() !== '');
      if (!hasValidItems) return 'Please add at least one product';
    } else {
      if (!selectedCategory) return 'Please select a supplier category';
    }

    if (locationType === 'manual' && !selectedCountry) {
      return 'Please select a country';
    }
    
    if (locationType === 'map' && !mapLocation) {
      return 'Please select a location from the map';
    }

    return '';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900">Procurement Request</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-16">
        {/* Search Mode Toggle */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Search Type</h3>
          <div className="flex bg-gray-100 rounded-xl p-1 w-fit">
            <button
              type="button"
              onClick={() => setSearchMode('product')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                searchMode === 'product'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Package className="w-4 h-4" />
              Search by Product
            </button>
            <button
              type="button"
              onClick={() => setSearchMode('category')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                searchMode === 'category'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Search by Supplier Category
            </button>
          </div>
        </div>

        {/* Dynamic Content Based on Search Mode */}
        {searchMode === 'product' ? (
          /* Items Needed Section */
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Items Needed</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 pb-2">
                <div className="col-span-4">Product Name *</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Unit</div>
                <div className="col-span-3">Target Price (Rp)</div>
                <div className="col-span-1"></div>
              </div>
              
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={item.productName}
                      onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                      placeholder="Enter product name"
                      className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                        item.productName.trim() === '' 
                          ? 'border-red-200 focus:border-red-500' 
                          : 'border-gray-200 focus:border-orange-500'
                      }`}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                      <select
                        value={item.unit}
                        onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance-none bg-white pr-8"
                      >
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={item.targetPrice}
                      onChange={(e) => updateItem(item.id, 'targetPrice', e.target.value)}
                      placeholder="Optional"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div className="col-span-1">
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mt-6"
            >
              <Plus className="w-4 h-4" />
              Add Another Item
            </button>
          </div>
        ) : (
          /* Supplier Category Section */
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Supplier Category</h3>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full p-4 border rounded-lg focus:outline-none appearance-none bg-white pr-8 text-lg transition-colors ${
                  selectedCategory === '' 
                    ? 'border-red-200 focus:border-red-500' 
                    : 'border-gray-200 focus:border-orange-500'
                }`}
                required
              >
                <option value="">Select Supplier Category</option>
                {supplierCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Choose the type of supplier you're looking for. We'll find verified suppliers in this category.
            </p>
          </div>
        )}

        {/* Supplier Fulfillment Area */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-8">Supplier Fulfillment Area *</h3>
          
          {/* Location Type Selection */}
          <div className="mb-8">
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="locationType"
                  value="manual"
                  checked={locationType === 'manual'}
                  onChange={(e) => handleLocationTypeChange(e.target.value as 'manual')}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Manual Selection</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="locationType"
                  value="map"
                  checked={locationType === 'map'}
                  onChange={(e) => handleLocationTypeChange(e.target.value as 'map')}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Choose from Map</span>
              </label>
            </div>
          </div>

          {locationType === 'manual' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Country */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 mr-1" />
                    Country *
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCountry}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none appearance-none bg-white pr-8 transition-colors ${
                        selectedCountry === '' 
                          ? 'border-red-200 focus:border-red-500' 
                          : 'border-gray-200 focus:border-orange-500'
                      }`}
                      required
                    >
                      <option value="">Choose Country</option>
                      {availableCountries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Province */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    Province/State
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProvince}
                      onChange={(e) => handleProvinceChange(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance-none bg-white pr-8"
                      disabled={!selectedCountry}
                    >
                      <option value="">Select Province</option>
                      {availableProvinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City/Regency</label>
                  <div className="relative">
                    <select
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance-none bg-white pr-8"
                      disabled={!selectedProvince}
                    >
                      <option value="">Select City/Regency</option>
                      {availableCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District (Optional)</label>
                  <div className="relative">
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance-none bg-white pr-8"
                      disabled={!selectedCity}
                    >
                      <option value="">Select District (Optional)</option>
                      {availableDistricts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Selected Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Selected Area</label>
                <div className={`p-3 border rounded-lg ${selectedCountry ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  <p className={selectedCountry ? 'text-green-700' : 'text-gray-600'}>
                    {[selectedDistrict, selectedCity, selectedProvince, selectedCountry].filter(Boolean).join(', ') || 'Select country, province and city above'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {mapLocation ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-800">Selected Location:</p>
                      <p className="text-sm text-green-700">{mapLocation}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMapModal(true)}
                    className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Change Location
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <MapPin className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-red-800 font-medium mb-1">Location Required</p>
                  <p className="text-sm text-red-600 mb-3">Please select your location from the map</p>
                  <button
                    type="button"
                    onClick={() => setShowMapModal(true)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Open Map
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Preferred Platform and Lead Time - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preferred Platform */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Preferred Platform</h3>
            <div className="flex flex-wrap gap-6">
              {platforms.map(platform => {
                const isChecked = selectedPlatforms.includes(platform);
                
                return (
                  <label 
                    key={platform} 
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handlePlatformToggle(platform)}
                      className="w-4 h-4 border-gray-300 rounded focus:ring-orange-500 transition-colors cursor-pointer"
                      style={{
                        accentColor: isChecked ? '#ea580c' : undefined
                      }}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {platform}
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Select "All" to search across all platforms, or choose specific platforms
            </p>
          </div>

          {/* Preferred Lead Time */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Preferred Lead Time</h3>
            <div className="relative">
              <select
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance-none bg-white pr-8"
              >
                {leadTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Longer lead times may result in better pricing options
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-8">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              isFormValid
                ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {searchMode === 'product' ? 'Find Supplier Matches' : 'Find Category Suppliers'}
          </button>
          
          {/* Validation Message */}
          {!isFormValid && (
            <p className="text-sm text-red-600 mt-3 text-center">
              {getValidationMessage()}
            </p>
          )}
        </div>
      </form>

      {/* Map Modal */}
      <MapLocationPicker
        isOpen={showMapModal}
        onClose={handleMapModalClose}
        onLocationSelect={handleMapLocationSelect}
      />
    </div>
  );
}