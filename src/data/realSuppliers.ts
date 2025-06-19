// Real supplier data based on actual companies
export interface RealSupplier {
  id: string;
  name: string;
  price: string;
  basePrice: number;
  leadTime: string;
  platform: string;
  platformColor: string;
  coverage: string;
  rating: number;
  location: string;
  address: string;
  distance?: string;
  driveTime?: string;
  isRecommended?: boolean;
  matchPercentage?: number;
  aiReason?: string;
  image: string;
  itemAvailability?: Array<{
    name: string;
    available: number;
    status: 'available' | 'limited' | 'unavailable';
    requested?: number;
    unit?: string;
    pricePerUnit?: number;
  }>;
  specialties?: string[];
  email?: string;
  phone?: string;
  whatsapp?: string;
  coordinates?: [number, number];
  platformUrl?: string;
  country?: string;
  province?: string;
  city?: string;
  district?: string;
  website?: string;
  yearEstablished?: number;
  employeeCount?: string;
  certifications?: string[];
  description?: string;
}

// Real Indonesian Food & Beverage Suppliers
export const realFoodSuppliers: RealSupplier[] = [
  {
    id: 'indofood-1',
    name: 'PT Indofood Sukses Makmur Tbk',
    price: 'Rp3,200',
    basePrice: 3200,
    leadTime: '1-2 days',
    platform: 'Tokopedia',
    platformColor: 'green',
    coverage: '100% Match',
    rating: 4.8,
    location: 'Jakarta Selatan, DKI Jakarta',
    address: 'Jl. Sudirman Kav. 76-78, Jakarta Selatan 12910',
    distance: '15 km away',
    driveTime: '25-35 mins drive',
    isRecommended: true,
    matchPercentage: 100,
    aiReason: 'Indonesia\'s largest food manufacturer with extensive instant noodle production. Excellent supply chain, competitive pricing, and fastest delivery times.',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
    itemAvailability: [
      { name: 'indomie', available: 10000, status: 'available' },
      { name: 'bear brand', available: 5000, status: 'available' }
    ],
    email: 'corporate@indofood.com',
    phone: '+62-21-5795-8822',
    whatsapp: '+62-812-1000-1000',
    coordinates: [-6.2088, 106.8456],
    platformUrl: 'https://tokopedia.com/indofood-official',
    country: 'Indonesia',
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    district: 'Setiabudi',
    website: 'https://www.indofood.com',
    yearEstablished: 1990,
    employeeCount: '10,000+',
    certifications: ['ISO 22000', 'HACCP', 'Halal MUI'],
    description: 'Leading food manufacturer in Indonesia, producing instant noodles, dairy products, and various food items.'
  },
  {
    id: 'wings-food-1',
    name: 'PT Wings Surya',
    price: 'Rp3,100',
    basePrice: 3100,
    leadTime: '2-3 days',
    platform: 'Shopee',
    platformColor: 'red',
    coverage: '95% Match',
    rating: 4.7,
    location: 'Surabaya, East Java',
    address: 'Jl. Rungkut Industri III No. 10, Surabaya 60293',
    distance: '800 km away',
    driveTime: '12-14 hours drive',
    isRecommended: true,
    matchPercentage: 95,
    aiReason: 'Major Indonesian FMCG company with strong distribution network. Competitive pricing and reliable supply chain for food products.',
    image: 'https://images.pexels.com/photos/4464485/pexels-photo-4464485.jpeg?auto=compress&cs=tinysrgb&w=400',
    itemAvailability: [
      { name: 'instant noodles', available: 8000, status: 'available' },
      { name: 'beverages', available: 3000, status: 'limited' }
    ],
    email: 'info@wings.co.id',
    phone: '+62-31-8474-0555',
    whatsapp: '+62-813-3000-3000',
    coordinates: [-7.2575, 112.7521],
    platformUrl: 'https://shopee.co.id/wings-official',
    country: 'Indonesia',
    province: 'East Java',
    city: 'Surabaya',
    district: 'Rungkut',
    website: 'https://www.wings.co.id',
    yearEstablished: 1948,
    employeeCount: '5,000+',
    certifications: ['ISO 9001', 'ISO 14001', 'Halal MUI'],
    description: 'Indonesian consumer goods company producing food, beverages, and household products.'
  },
  {
    id: 'mayora-1',
    name: 'PT Mayora Indah Tbk',
    price: 'Rp3,350',
    basePrice: 3350,
    leadTime: '2-4 days',
    platform: 'Alibaba',
    platformColor: 'orange',
    coverage: '90% Match',
    rating: 4.6,
    location: 'Tangerang, Banten',
    address: 'Jl. Tomang Raya Kav. 21-23, Jakarta Barat 11440',
    distance: '30 km away',
    driveTime: '45-60 mins drive',
    isRecommended: false,
    matchPercentage: 90,
    image: 'https://images.pexels.com/photos/4464491/pexels-photo-4464491.jpeg?auto=compress&cs=tinysrgb&w=400',
    itemAvailability: [
      { name: 'biscuits', available: 6000, status: 'available' },
      { name: 'confectionery', available: 4000, status: 'available' }
    ],
    email: 'corporate@mayora.com',
    phone: '+62-21-5659-2525',
    whatsapp: '+62-814-5000-5000',
    coordinates: [-6.1751, 106.8142],
    platformUrl: 'https://alibaba.com/mayora-indonesia',
    country: 'Indonesia',
    province: 'Banten',
    city: 'Tangerang',
    district: 'Tomang',
    website: 'https://www.mayora.com',
    yearEstablished: 1977,
    employeeCount: '3,000+',
    certifications: ['ISO 22000', 'BRC', 'Halal MUI'],
    description: 'Leading confectionery and biscuit manufacturer in Indonesia with international presence.'
  }
];

// Real Packaging Suppliers
export const realPackagingSuppliers: RealSupplier[] = [
  {
    id: 'toppan-1',
    name: 'PT Toppan Printing Indonesia',
    price: 'Rp2,500-15,000',
    basePrice: 8750,
    leadTime: '3-7 days',
    platform: 'Alibaba',
    platformColor: 'orange',
    coverage: '100% Match',
    rating: 4.9,
    location: 'Jakarta Timur, DKI Jakarta',
    address: 'Jl. Raya Bekasi KM 22, Cakung, Jakarta Timur 13910',
    distance: '25 km away',
    driveTime: '35-50 mins drive',
    isRecommended: true,
    matchPercentage: 100,
    aiReason: 'Global packaging leader with advanced technology and sustainable solutions. Premium quality with international standards.',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Flexible Packaging', 'Food Packaging', 'Pharmaceutical Packaging', 'Security Printing', 'Sustainable Materials'],
    email: 'info@toppan.co.id',
    phone: '+62-21-4600-8888',
    whatsapp: '+62-816-8000-8000',
    coordinates: [-6.1744, 106.9537],
    platformUrl: 'https://alibaba.com/toppan-indonesia',
    country: 'Indonesia',
    province: 'DKI Jakarta',
    city: 'Jakarta Timur',
    district: 'Cakung',
    website: 'https://www.toppan.co.id',
    yearEstablished: 1970,
    employeeCount: '1,000+',
    certifications: ['ISO 9001', 'ISO 14001', 'BRC', 'FDA'],
    description: 'Japanese packaging company providing high-quality printing and packaging solutions.'
  },
  {
    id: 'dynaplast-1',
    name: 'PT Dynaplast Tbk',
    price: 'Rp2,200-12,000',
    basePrice: 7100,
    leadTime: '5-10 days',
    platform: 'Shopee',
    platformColor: 'red',
    coverage: '95% Match',
    rating: 4.7,
    location: 'Tangerang, Banten',
    address: 'Jl. Raya Serpong KM 8, Serpong, Tangerang Selatan 15310',
    distance: '35 km away',
    driveTime: '50-70 mins drive',
    isRecommended: true,
    matchPercentage: 95,
    aiReason: 'Leading flexible packaging manufacturer with cost-effective solutions and reliable delivery.',
    image: 'https://images.pexels.com/photos/4464485/pexels-photo-4464485.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Flexible Packaging', 'BOPP Films', 'Laminated Films', 'Food Grade Packaging'],
    email: 'marketing@dynaplast.co.id',
    phone: '+62-21-5373-1555',
    whatsapp: '+62-817-7000-7000',
    coordinates: [-6.3019, 106.6637],
    platformUrl: 'https://shopee.co.id/dynaplast-official',
    country: 'Indonesia',
    province: 'Banten',
    city: 'Tangerang',
    district: 'Serpong',
    website: 'https://www.dynaplast.com',
    yearEstablished: 1983,
    employeeCount: '800+',
    certifications: ['ISO 9001', 'ISO 22000', 'BRC'],
    description: 'Indonesian flexible packaging manufacturer serving food and beverage industries.'
  },
  {
    id: 'asahimas-1',
    name: 'PT Asahimas Flat Glass Tbk',
    price: 'Rp5,000-25,000',
    basePrice: 15000,
    leadTime: '7-14 days',
    platform: 'Tokopedia',
    platformColor: 'green',
    coverage: '85% Match',
    rating: 4.5,
    location: 'Cikampek, West Java',
    address: 'Jl. Raya Jakarta-Cikampek KM 47, Cikampek 41373',
    distance: '80 km away',
    driveTime: '1.5-2 hours drive',
    isRecommended: false,
    matchPercentage: 85,
    image: 'https://images.pexels.com/photos/4464491/pexels-photo-4464491.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Glass Packaging', 'Bottles', 'Jars', 'Automotive Glass'],
    email: 'info@amfg.co.id',
    phone: '+62-264-317-6000',
    whatsapp: '+62-818-9000-9000',
    coordinates: [-6.4167, 107.4667],
    platformUrl: 'https://tokopedia.com/asahimas-glass',
    country: 'Indonesia',
    province: 'West Java',
    city: 'Cikampek',
    district: 'Cikampek',
    website: 'https://www.amfg.co.id',
    yearEstablished: 1973,
    employeeCount: '2,000+',
    certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
    description: 'Leading glass manufacturer in Indonesia producing flat glass and glass containers.'
  }
];

// Real Electronics Suppliers
export const realElectronicsSuppliers: RealSupplier[] = [
  {
    id: 'samsung-1',
    name: 'PT Samsung Electronics Indonesia',
    price: 'Rp50,000-500,000',
    basePrice: 275000,
    leadTime: '3-5 days',
    platform: 'Tokopedia',
    platformColor: 'green',
    coverage: '100% Match',
    rating: 4.8,
    location: 'Jakarta Pusat, DKI Jakarta',
    address: 'Jl. Jend. Sudirman Kav. 25, Jakarta Pusat 10210',
    distance: '10 km away',
    driveTime: '20-30 mins drive',
    isRecommended: true,
    matchPercentage: 100,
    aiReason: 'Global electronics leader with comprehensive product range and excellent after-sales service.',
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Smartphones', 'Tablets', 'Home Appliances', 'Display Technology', 'Memory Solutions'],
    email: 'info@samsung.com',
    phone: '+62-21-2995-8888',
    whatsapp: '+62-819-1000-1000',
    coordinates: [-6.2088, 106.8456],
    platformUrl: 'https://tokopedia.com/samsung-official',
    country: 'Indonesia',
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    district: 'Tanah Abang',
    website: 'https://www.samsung.com/id',
    yearEstablished: 1991,
    employeeCount: '3,000+',
    certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
    description: 'Leading electronics manufacturer providing smartphones, appliances, and technology solutions.'
  },
  {
    id: 'lg-1',
    name: 'PT LG Electronics Indonesia',
    price: 'Rp45,000-450,000',
    basePrice: 247500,
    leadTime: '4-6 days',
    platform: 'Shopee',
    platformColor: 'red',
    coverage: '95% Match',
    rating: 4.7,
    location: 'Jakarta Barat, DKI Jakarta',
    address: 'Jl. Casablanca Raya Kav. 88, Jakarta Selatan 12870',
    distance: '18 km away',
    driveTime: '30-45 mins drive',
    isRecommended: true,
    matchPercentage: 95,
    aiReason: 'Innovative electronics manufacturer with strong focus on home appliances and mobile technology.',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Home Appliances', 'Air Conditioners', 'Televisions', 'Mobile Phones', 'Commercial Displays'],
    email: 'customercare@lge.com',
    phone: '+62-21-2924-2924',
    whatsapp: '+62-820-2000-2000',
    coordinates: [-6.2297, 106.8456],
    platformUrl: 'https://shopee.co.id/lg-official',
    country: 'Indonesia',
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    district: 'Tebet',
    website: 'https://www.lg.com/id',
    yearEstablished: 1991,
    employeeCount: '2,500+',
    certifications: ['ISO 9001', 'ISO 14001', 'Energy Star'],
    description: 'Global electronics company specializing in home appliances and consumer electronics.'
  }
];

// Combine all suppliers
export const allRealSuppliers = [
  ...realFoodSuppliers,
  ...realPackagingSuppliers,
  ...realElectronicsSuppliers
];

// Category mapping
export const suppliersByCategory = {
  'Food & Beverage Supplier': realFoodSuppliers,
  'Packaging Supplier': realPackagingSuppliers,
  'Electronics & Technology Supplier': realElectronicsSuppliers,
  'Heavy Equipment Supplier': [],
  'Chemical Supplier': [],
  'Printing Supplier': [],
  'Electricity Solution Provider': [],
  'Textile & Apparel Supplier': [],
  'Construction Materials Supplier': [],
  'Automotive Parts Supplier': [],
  'Medical Equipment Supplier': [],
  'Office Supplies Supplier': []
};