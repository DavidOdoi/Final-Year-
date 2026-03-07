import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  MapPin, 
  Filter, 
  Search, 
  Star, 
  Calendar,
  Package,
  TrendingUp,
  CheckCircle,
  Clock,
  Navigation,
  Zap,
  DollarSign,
  Users,
  Phone,
  Mail,
  ArrowRight,
  X,
  Sparkles,
  Map as MapIcon,
  List,
  SlidersHorizontal
} from 'lucide-react';
import { TraderSidebar } from '../components/trader/TraderSidebar';
import { TraderTopBar } from '../components/trader/TraderTopBar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface AvailableTruck {
  id: string;
  driver: string;
  driverPhoto: string;
  truckType: string;
  capacity: string;
  currentLocation: string;
  destination: string;
  availableDate: string;
  distance: number;
  rating: number;
  trips: number;
  price: string;
  lat: number;
  lng: number;
  verified: boolean;
  returnTrip: boolean;
}

export default function TruckMarketplace() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTruck, setSelectedTruck] = useState<AvailableTruck | null>(null);
  const [filters, setFilters] = useState({
    truckType: 'all',
    capacity: 'all',
    location: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [matchScore, setMatchScore] = useState(0);

  const content = {
    sw: {
      title: 'Soko la Malori',
      subtitle: 'Pata malori yaliyopo kwa safari za kurudi',
      search: 'Tafuta eneo, madereva, au malori...',
      filters: 'Chuja',
      viewMap: 'Angalia Ramani',
      viewList: 'Angalia Orodha',
      available: 'Inapatikana',
      truckType: 'Aina ya Lori',
      capacity: 'Uwezo',
      from: 'Kutoka',
      to: 'Kwenda',
      distance: 'Umbali',
      rating: 'Ukadiriaji',
      trips: 'Safari',
      verified: 'Imethibitishwa',
      returnTrip: 'Safari ya Kurudi',
      bookNow: 'Hifadhi Sasa',
      viewDetails: 'Angalia Maelezo',
      smartMatch: 'Mechi Mahiri',
      matchScore: 'Alama ya Mechi',
      perKm: 'kwa km',
      requestBooking: 'Omba Kuhifadhi',
      contactDriver: 'Wasiliana na Dereva',
      optimizedFor: 'Imeboreshwa kwa',
      allTrucks: 'Malori Yote',
      flatbed: 'Flatbed',
      container: 'Kontena',
      refrigerated: 'Jokofu',
      tanker: 'Tanki',
      allCapacities: 'Uwezo Wote',
      allLocations: 'Maeneo Yote',
    },
    en: {
      title: 'Truck Marketplace',
      subtitle: 'Find available trucks for return trips',
      search: 'Search location, drivers, or trucks...',
      filters: 'Filters',
      viewMap: 'Map View',
      viewList: 'List View',
      available: 'Available',
      truckType: 'Truck Type',
      capacity: 'Capacity',
      from: 'From',
      to: 'To',
      distance: 'Distance',
      rating: 'Rating',
      trips: 'Trips',
      verified: 'Verified',
      returnTrip: 'Return Trip',
      bookNow: 'Book Now',
      viewDetails: 'View Details',
      smartMatch: 'Smart Match',
      matchScore: 'Match Score',
      perKm: 'per km',
      requestBooking: 'Request Booking',
      contactDriver: 'Contact Driver',
      optimizedFor: 'Optimized for',
      allTrucks: 'All Trucks',
      flatbed: 'Flatbed',
      container: 'Container',
      refrigerated: 'Refrigerated',
      tanker: 'Tanker',
      allCapacities: 'All Capacities',
      allLocations: 'All Locations',
    },
  };

  const text = content[language];

  // Mock data for available trucks
  const [availableTrucks, setAvailableTrucks] = useState<AvailableTruck[]>([
    {
      id: '1',
      driver: 'John Kamau',
      driverPhoto: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGRyaXZlciUyMGNhYmluJTIwYWZyaWNhfGVufDF8fHx8MTc3MjcxMTc5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      truckType: 'Flatbed',
      capacity: '20 tons',
      currentLocation: 'Dar es Salaam, Tanzania',
      destination: 'Nairobi, Kenya',
      availableDate: 'Today',
      distance: 45,
      rating: 4.9,
      trips: 324,
      price: '$2.50',
      lat: -6.7924,
      lng: 39.2083,
      verified: true,
      returnTrip: true,
    },
    {
      id: '2',
      driver: 'James Omondi',
      driverPhoto: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGRyaXZlciUyMGNhYmluJTIwYWZyaWNhfGVufDF8fHx8MTc3MjcxMTc5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      truckType: 'Container',
      capacity: '30 tons',
      currentLocation: 'Mombasa, Kenya',
      destination: 'Kampala, Uganda',
      availableDate: 'Tomorrow',
      distance: 78,
      rating: 4.8,
      trips: 456,
      price: '$2.20',
      lat: -4.0435,
      lng: 39.6682,
      verified: true,
      returnTrip: true,
    },
    {
      id: '3',
      driver: 'Peter Wanjiru',
      driverPhoto: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGRyaXZlciUyMGNhYmluJTIwYWZyaWNhfGVufDF8fHx8MTc3MjcxMTc5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      truckType: 'Refrigerated',
      capacity: '15 tons',
      currentLocation: 'Nairobi, Kenya',
      destination: 'Kigali, Rwanda',
      availableDate: 'Today',
      distance: 120,
      rating: 5.0,
      trips: 189,
      price: '$3.00',
      lat: -1.2864,
      lng: 36.8172,
      verified: true,
      returnTrip: false,
    },
    {
      id: '4',
      driver: 'David Mutua',
      driverPhoto: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGRyaXZlciUyMGNhYmluJTIwYWZyaWNhfGVufDF8fHx8MTc3MjcxMTc5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      truckType: 'Tanker',
      capacity: '25 tons',
      currentLocation: 'Dodoma, Tanzania',
      destination: 'Nairobi, Kenya',
      availableDate: 'In 2 days',
      distance: 95,
      rating: 4.7,
      trips: 267,
      price: '$2.80',
      lat: -6.1630,
      lng: 35.7516,
      verified: true,
      returnTrip: true,
    },
    {
      id: '5',
      driver: 'Samuel Kibet',
      driverPhoto: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGRyaXZlciUyMGNhYmluJTIwYWZyaWNhfGVufDF8fHx8MTc3MjcxMTc5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      truckType: 'Flatbed',
      capacity: '18 tons',
      currentLocation: 'Arusha, Tanzania',
      destination: 'Nairobi, Kenya',
      availableDate: 'Today',
      distance: 35,
      rating: 4.9,
      trips: 412,
      price: '$2.30',
      lat: -3.3869,
      lng: 36.6830,
      verified: true,
      returnTrip: true,
    },
  ]);

  // Calculate match score for selected truck
  useEffect(() => {
    if (selectedTruck) {
      let score = 70 + Math.random() * 30;
      setMatchScore(Math.round(score));
    }
  }, [selectedTruck]);

  // Filter trucks based on search and filters
  const filteredTrucks = availableTrucks.filter((truck) => {
    const matchesSearch = 
      truck.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.truckType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTruckType = 
      filters.truckType === 'all' || 
      truck.truckType.toLowerCase() === filters.truckType.toLowerCase();

    return matchesSearch && matchesTruckType;
  });

  const getTruckTypeIcon = (type: string) => {
    return <Truck className="w-5 h-5" />;
  };

  return (
    <div className="relative min-h-screen bg-[#F7EFE9]">
      <TraderSidebar 
        language={language} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="lg:ml-64 relative">
        <TraderTopBar 
          language={language}
          setLanguage={setLanguage}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        <main className="relative p-4 md:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl text-[#4B2E2B] mb-2">{text.title}</h1>
                <p className="text-[#4B2E2B]/60">{text.subtitle}</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg"
              >
                <Zap className="w-5 h-5" />
                <span>{text.smartMatch}</span>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { label: text.available, value: filteredTrucks.length, icon: Truck, color: 'from-green-500 to-green-600' },
                { label: text.returnTrip, value: filteredTrucks.filter(t => t.returnTrip).length, icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
                { label: text.verified, value: filteredTrucks.filter(t => t.verified).length, icon: CheckCircle, color: 'from-[#D4A373] to-[#b8865c]' },
                { label: 'Active', value: filteredTrucks.length, icon: Navigation, color: 'from-purple-500 to-purple-600' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white rounded-2xl p-4 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl text-[#4B2E2B] mb-1">{stat.value}</div>
                  <div className="text-sm text-[#4B2E2B]/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={text.search}
                  className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                />
              </div>

              {/* Filter Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-[#4B2E2B] text-white rounded-xl flex items-center gap-2 shadow-lg hover:bg-[#3a2422] transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                {text.filters}
              </motion.button>

              {/* View Toggle */}
              <div className="flex gap-2 bg-[#F7EFE9] rounded-xl p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    viewMode === 'list' ? 'bg-white text-[#4B2E2B] shadow-md' : 'text-[#4B2E2B]/60'
                  }`}
                >
                  <List className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    viewMode === 'map' ? 'bg-white text-[#4B2E2B] shadow-md' : 'text-[#4B2E2B]/60'
                  }`}
                >
                  <MapIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#4B2E2B]/10"
                >
                  <div>
                    <label className="block text-sm text-[#4B2E2B] mb-2">{text.truckType}</label>
                    <select
                      value={filters.truckType}
                      onChange={(e) => setFilters({ ...filters, truckType: e.target.value })}
                      className="w-full px-4 py-2 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:outline-none text-[#4B2E2B]"
                    >
                      <option value="all">{text.allTrucks}</option>
                      <option value="flatbed">{text.flatbed}</option>
                      <option value="container">{text.container}</option>
                      <option value="refrigerated">{text.refrigerated}</option>
                      <option value="tanker">{text.tanker}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#4B2E2B] mb-2">{text.capacity}</label>
                    <select
                      value={filters.capacity}
                      onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
                      className="w-full px-4 py-2 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:outline-none text-[#4B2E2B]"
                    >
                      <option value="all">{text.allCapacities}</option>
                      <option value="small">0-15 tons</option>
                      <option value="medium">15-25 tons</option>
                      <option value="large">25+ tons</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#4B2E2B] mb-2">Location</label>
                    <select
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      className="w-full px-4 py-2 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:outline-none text-[#4B2E2B]"
                    >
                      <option value="all">{text.allLocations}</option>
                      <option value="kenya">Kenya</option>
                      <option value="tanzania">Tanzania</option>
                      <option value="uganda">Uganda</option>
                      <option value="rwanda">Rwanda</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Truck List / Map View */}
          {viewMode === 'list' ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredTrucks.map((truck, index) => (
                <motion.div
                  key={truck.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => setSelectedTruck(truck)}
                  className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all relative overflow-hidden"
                >
                  {/* Return Trip Badge */}
                  {truck.returnTrip && (
                    <motion.div
                      initial={{ x: -100 }}
                      animate={{ x: 0 }}
                      className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full flex items-center gap-1"
                    >
                      <TrendingUp className="w-3 h-3" />
                      {text.returnTrip}
                    </motion.div>
                  )}

                  {/* Driver Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <ImageWithFallback
                        src={truck.driverPhoto}
                        alt={truck.driver}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {truck.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-[#4B2E2B]">{truck.driver}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#4B2E2B]/60">
                        <Star className="w-4 h-4 fill-[#D4A373] text-[#D4A373]" />
                        <span>{truck.rating}</span>
                        <span>•</span>
                        <span>{truck.trips} {text.trips}</span>
                      </div>
                    </div>
                  </div>

                  {/* Truck Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-[#4B2E2B]">
                      <div className="w-8 h-8 bg-[#F7EFE9] rounded-lg flex items-center justify-center">
                        {getTruckTypeIcon(truck.truckType)}
                      </div>
                      <div>
                        <div className="text-sm text-[#4B2E2B]/60">{text.truckType}</div>
                        <div>{truck.truckType} - {truck.capacity}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-[#4B2E2B]">
                      <div className="w-8 h-8 bg-[#F7EFE9] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[#4B2E2B]/60">{text.from}</div>
                        <div className="mb-2">{truck.currentLocation}</div>
                        <div className="text-sm text-[#4B2E2B]/60">{text.to}</div>
                        <div>{truck.destination}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[#4B2E2B]">
                      <div className="w-8 h-8 bg-[#F7EFE9] rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-[#4B2E2B]/60">{text.available}</div>
                        <div>{truck.availableDate}</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#4B2E2B]/10">
                    <div>
                      <div className="text-sm text-[#4B2E2B]/60">{truck.distance} km away</div>
                      <div className="text-xl text-[#4B2E2B]">{truck.price} <span className="text-sm text-[#4B2E2B]/60">{text.perKm}</span></div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05, x: 3 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gradient-to-r from-[#4B2E2B] to-[#3a2422] text-white rounded-xl flex items-center gap-2"
                    >
                      {text.viewDetails}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 shadow-lg h-[600px] relative overflow-hidden"
            >
              {/* Map Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-[#F7EFE9] to-[#e8dfd7] rounded-xl flex items-center justify-center relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1765140308975-c61d0850dd82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVpZ2h0JTIwdHJ1Y2slMjBoaWdod2F5JTIwcm9hZHxlbnwxfHx8fDE3NzI3MTE3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Map"
                  className="w-full h-full object-cover opacity-20"
                />
                
                {/* Truck Markers */}
                {filteredTrucks.map((truck, index) => (
                  <motion.div
                    key={truck.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    onClick={() => setSelectedTruck(truck)}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${20 + (index * 15) % 70}%`,
                      top: `${20 + (index * 20) % 60}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <Truck className="w-6 h-6 text-white" />
                      </div>
                      {truck.returnTrip && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4A373] rounded-full animate-pulse" />
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm text-[#4B2E2B]">Available Trucks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#D4A373] rounded-full animate-pulse" />
                    <span className="text-sm text-[#4B2E2B]">Return Trips</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Truck Detail Modal */}
      <AnimatePresence>
        {selectedTruck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTruck(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTruck(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#F7EFE9] rounded-full flex items-center justify-center hover:bg-[#e8dfd7] transition-colors"
              >
                <X className="w-5 h-5 text-[#4B2E2B]" />
              </button>

              {/* Match Score */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mb-6 text-center"
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  <span>{text.matchScore}: {matchScore}%</span>
                </div>
              </motion.div>

              {/* Driver Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#4B2E2B]/10">
                <div className="relative">
                  <ImageWithFallback
                    src={selectedTruck.driverPhoto}
                    alt={selectedTruck.driver}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  {selectedTruck.verified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl text-[#4B2E2B] mb-1">{selectedTruck.driver}</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#D4A373] text-[#D4A373]" />
                      <span className="text-[#4B2E2B]">{selectedTruck.rating}</span>
                    </div>
                    <span className="text-[#4B2E2B]/40">•</span>
                    <span className="text-[#4B2E2B]/60">{selectedTruck.trips} {text.trips}</span>
                  </div>
                </div>
              </div>

              {/* Truck Details Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F7EFE9] rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Truck className="w-5 h-5 text-[#4B2E2B]" />
                    <span className="text-sm text-[#4B2E2B]/60">{text.truckType}</span>
                  </div>
                  <div className="text-lg text-[#4B2E2B]">{selectedTruck.truckType}</div>
                </div>

                <div className="bg-[#F7EFE9] rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-5 h-5 text-[#4B2E2B]" />
                    <span className="text-sm text-[#4B2E2B]/60">{text.capacity}</span>
                  </div>
                  <div className="text-lg text-[#4B2E2B]">{selectedTruck.capacity}</div>
                </div>

                <div className="bg-[#F7EFE9] rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-[#4B2E2B]" />
                    <span className="text-sm text-[#4B2E2B]/60">{text.available}</span>
                  </div>
                  <div className="text-lg text-[#4B2E2B]">{selectedTruck.availableDate}</div>
                </div>

                <div className="bg-[#F7EFE9] rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-[#4B2E2B]" />
                    <span className="text-sm text-[#4B2E2B]/60">Price</span>
                  </div>
                  <div className="text-lg text-[#4B2E2B]">{selectedTruck.price} {text.perKm}</div>
                </div>
              </div>

              {/* Route */}
              <div className="bg-gradient-to-r from-[#F7EFE9] to-[#e8dfd7] rounded-xl p-6 mb-6">
                <h3 className="text-lg text-[#4B2E2B] mb-4">Route</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-[#4B2E2B]/60">{text.from}</div>
                      <div className="text-[#4B2E2B]">{selectedTruck.currentLocation}</div>
                    </div>
                  </div>
                  <div className="ml-5 border-l-2 border-dashed border-[#4B2E2B]/20 h-8" />
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-[#4B2E2B]/60">{text.to}</div>
                      <div className="text-[#4B2E2B]">{selectedTruck.destination}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 bg-gradient-to-r from-[#4B2E2B] to-[#3a2422] text-white rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <CheckCircle className="w-5 h-5" />
                  {text.requestBooking}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 bg-white border-2 border-[#4B2E2B]/20 text-[#4B2E2B] rounded-xl flex items-center justify-center gap-2 hover:border-[#4B2E2B]/40 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {text.contactDriver}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
