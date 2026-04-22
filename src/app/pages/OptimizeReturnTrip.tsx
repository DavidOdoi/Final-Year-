import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp,
  MapPin,
  DollarSign,
  Truck,
  Navigation,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight,
  Zap,
  Leaf,
  Users,
  BarChart3,
  Route as RouteIcon,
  Calendar,
  Phone,
  Shield,
  Sparkles,
  TrendingDown,
  Package,
  Globe,
  ArrowLeftRight,
  MessageCircle,
  ThumbsUp,
  Award,
  Target,
  Activity
} from 'lucide-react';
import { TraderSidebar } from '../components/trader/TraderSidebar';
import { TraderTopBar } from '../components/trader/TraderTopBar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ReturnTripOption {
  id: string;
  driver: string;
  driverPhoto: string;
  rating: number;
  trips: number;
  truckType: string;
  capacity: string;
  currentLocation: string;
  yourLocation: string;
  returnRoute: {
    from: string;
    to: string;
  };
  distance: number;
  standardPrice: number;
  returnPrice: number;
  savings: number;
  savingsPercentage: number;
  availability: string;
  matchScore: number;
  co2Saved: number;
  emptyMilesAvoided: number;
}

export default function OptimizeReturnTrip() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ReturnTripOption | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalCO2Saved, setTotalCO2Saved] = useState(0);
  const [animateStats, setAnimateStats] = useState(false);

  const content = {
    sw: {
      title: 'Boresha Safari ya Kurudi',
      subtitle: 'Okoa hadi 40% kwa kutumia malori yanayorudi',
      
      // Stats
      potentialSavings: 'Uokoaji Unaowezekana',
      co2Reduction: 'Punguzo la CO2',
      emptyMiles: 'Maili Tupu Zilizoepukwa',
      availableOptions: 'Chaguo Zinazopatikana',
      
      // Sections
      howItWorks: 'Jinsi Inavyofanya Kazi',
      returnTripBenefits: 'Faida za Safari ya Kurudi',
      availableTrucks: 'Malori Yanayopatikana',
      selectedRoute: 'Njia Iliyochaguliwa',
      
      // How it works
      step1Title: 'Tunagundua Malori Yanayorudi',
      step1Desc: 'Mfumo wetu unapata malori ambayo tayari yanarudi kwenye eneo lako',
      step2Title: 'Unapata Bei Nafuu',
      step2Desc: 'Madereva wanatoa bei ya chini kwa sababu wangeenda bila mzigo',
      step3Title: 'Wote Wanafaidika',
      step3Desc: 'Wewe unaokoa pesa, dereva anapata kipato, mazingira yanafaidika',
      
      // Benefits
      benefit1: 'Okoa hadi 40%',
      benefit1Desc: 'Bei ya chini kuliko usafirishaji wa kawaida',
      benefit2: 'Punguza Athari kwa Mazingira',
      benefit2Desc: 'Punguza maili tupu na uchafuzi wa hewa',
      benefit3: 'Usambazaji wa Haraka',
      benefit3Desc: 'Malori tayari yanasafiri kuelekea njia yako',
      benefit4: 'Madereva Walioidhinishwa',
      benefit4Desc: 'Madereva wenye uzoefu na ukadiriaji wa juu',
      
      // Actions
      viewDetails: 'Angalia Maelezo',
      bookNow: 'Hifadhi Sasa',
      contactDriver: 'Wasiliana na Dereva',
      compareOptions: 'Linganisha Chaguo',
      
      // Labels
      standardPrice: 'Bei ya Kawaida',
      returnPrice: 'Bei ya Kurudi',
      savings: 'Uokoaji',
      matchScore: 'Alama ya Mechi',
      from: 'Kutoka',
      to: 'Kwenda',
      yourRoute: 'Njia Yako',
      returnRoute: 'Njia ya Kurudi',
      per: 'kwa',
      
      // Booking
      bookingTitle: 'Thibitisha Safari ya Kurudi',
      bookingMessage: 'Unataka kuhifadhi safari hii ya kurudi?',
      confirm: 'Thibitisha',
      cancel: 'Sitisha',
    },
    en: {
      title: 'Optimize Return Trip',
      subtitle: 'Save up to 40% by using returning trucks',
      
      // Stats
      potentialSavings: 'Potential Savings',
      co2Reduction: 'CO2 Reduction',
      emptyMiles: 'Empty Miles Avoided',
      availableOptions: 'Available Options',
      
      // Sections
      howItWorks: 'How It Works',
      returnTripBenefits: 'Return Trip Benefits',
      availableTrucks: 'Available Return Trucks',
      selectedRoute: 'Selected Route',
      
      // How it works
      step1Title: 'We Find Returning Trucks',
      step1Desc: 'Our system identifies trucks already heading back to your area',
      step2Title: 'You Get Lower Prices',
      step2Desc: 'Drivers offer reduced rates since they would travel empty anyway',
      step3Title: 'Everyone Wins',
      step3Desc: 'You save money, drivers earn income, environment benefits',
      
      // Benefits
      benefit1: 'Save up to 40%',
      benefit1Desc: 'Lower prices than standard shipping',
      benefit2: 'Reduce Environmental Impact',
      benefit2Desc: 'Decrease empty miles and emissions',
      benefit3: 'Faster Delivery',
      benefit3Desc: 'Trucks are already traveling your route',
      benefit4: 'Verified Drivers',
      benefit4Desc: 'Experienced drivers with high ratings',
      
      // Actions
      viewDetails: 'View Details',
      bookNow: 'Book Now',
      contactDriver: 'Contact Driver',
      compareOptions: 'Compare Options',
      
      // Labels
      standardPrice: 'Standard Price',
      returnPrice: 'Return Price',
      savings: 'Savings',
      matchScore: 'Match Score',
      from: 'From',
      to: 'To',
      yourRoute: 'Your Route',
      returnRoute: 'Return Route',
      per: 'per',
      
      // Booking
      bookingTitle: 'Confirm Return Trip',
      bookingMessage: 'Would you like to book this return trip?',
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
  };

  const text = content[language];

  // Mock data for return trip options
  const returnTripOptions: ReturnTripOption[] = [
    {
      id: '1',
      driver: 'John Kamau',
      driverPhoto: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?w=400',
      rating: 4.9,
      trips: 324,
      truckType: 'Flatbed',
      capacity: '20 tons',
      currentLocation: 'Dar es Salaam, Tanzania',
      yourLocation: 'Nairobi, Kenya',
      returnRoute: {
        from: 'Mombasa, Kenya',
        to: 'Nairobi, Kenya',
      },
      distance: 480,
      standardPrice: 650,
      returnPrice: 390,
      savings: 260,
      savingsPercentage: 40,
      availability: 'Today',
      matchScore: 95,
      co2Saved: 145,
      emptyMilesAvoided: 480,
    },
    {
      id: '2',
      driver: 'Peter Wanjiru',
      driverPhoto: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?w=400',
      rating: 4.8,
      trips: 256,
      truckType: 'Container',
      capacity: '25 tons',
      currentLocation: 'Kampala, Uganda',
      yourLocation: 'Nairobi, Kenya',
      returnRoute: {
        from: 'Eldoret, Kenya',
        to: 'Nairobi, Kenya',
      },
      distance: 310,
      standardPrice: 480,
      returnPrice: 310,
      savings: 170,
      savingsPercentage: 35,
      availability: 'Tomorrow',
      matchScore: 88,
      co2Saved: 95,
      emptyMilesAvoided: 310,
    },
    {
      id: '3',
      driver: 'Samuel Kibet',
      driverPhoto: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?w=400',
      rating: 5.0,
      trips: 412,
      truckType: 'Refrigerated',
      capacity: '18 tons',
      currentLocation: 'Kigali, Rwanda',
      yourLocation: 'Nairobi, Kenya',
      returnRoute: {
        from: 'Nakuru, Kenya',
        to: 'Nairobi, Kenya',
      },
      distance: 160,
      standardPrice: 380,
      returnPrice: 228,
      savings: 152,
      savingsPercentage: 40,
      availability: 'Today',
      matchScore: 92,
      co2Saved: 52,
      emptyMilesAvoided: 160,
    },
  ];

  // Calculate totals
  useEffect(() => {
    const savings = returnTripOptions.reduce((sum, opt) => sum + opt.savings, 0);
    const co2 = returnTripOptions.reduce((sum, opt) => sum + opt.co2Saved, 0);
    setTotalSavings(savings);
    setTotalCO2Saved(co2);
    setTimeout(() => setAnimateStats(true), 500);
  }, []);

  const handleBooking = (option: ReturnTripOption) => {
    setSelectedOption(option);
    setShowBookingModal(true);
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
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-[#4B2E2B] via-[#5a3935] to-[#4B2E2B] rounded-3xl p-8 md:p-12 mb-8 overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1687880465237-463957e948c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdod2F5JTIwcm9hZCUyMGFlcmlhbCUyMHZpZXclMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcyNzgzNDI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Highway"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Animated Truck Icon */}
            <motion.div
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 right-8 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <TrendingUp className="w-10 h-10 text-[#D4A373]" />
            </motion.div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 mb-4"
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm">Smart Optimization</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl text-white mb-4"
              >
                {text.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/80 max-w-2xl"
              >
                {text.subtitle}
              </motion.p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8" style={{ position: 'relative' }}>
                {[ 
                  { 
                    label: text.potentialSavings, 
                    value: `$${totalSavings}`, 
                    icon: DollarSign,
                    color: 'from-green-500 to-green-600',
                    delay: 0.5
                  },
                  { 
                    label: text.co2Reduction, 
                    value: `${totalCO2Saved}kg`, 
                    icon: Leaf,
                    color: 'from-emerald-500 to-emerald-600',
                    delay: 0.6
                  },
                  { 
                    label: text.emptyMiles, 
                    value: `${returnTripOptions.reduce((sum, opt) => sum + opt.emptyMilesAvoided, 0)}mi`, 
                    icon: RouteIcon,
                    color: 'from-blue-500 to-blue-600',
                    delay: 0.7
                  },
                  { 
                    label: text.availableOptions, 
                    value: returnTripOptions.length, 
                    icon: Truck,
                    color: 'from-[#D4A373] to-[#b8865c]',
                    delay: 0.8
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={animateStats ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: stat.delay, type: 'spring' }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: stat.delay + 0.2 }}
                      className="text-2xl text-white mb-1"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl text-[#4B2E2B]">{text.howItWorks}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: text.step1Title,
                  desc: text.step1Desc,
                  icon: Navigation,
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  step: '02',
                  title: text.step2Title,
                  desc: text.step2Desc,
                  icon: DollarSign,
                  color: 'from-green-500 to-green-600',
                },
                {
                  step: '03',
                  title: text.step3Title,
                  desc: text.step3Desc,
                  icon: ThumbsUp,
                  color: 'from-[#D4A373] to-[#b8865c]',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative bg-gradient-to-br from-[#F7EFE9] to-[#e8dfd7] rounded-2xl p-6 overflow-hidden"
                >
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-[#4B2E2B]/5">
                    {item.step}
                  </div>

                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl text-[#4B2E2B] mb-2">{item.title}</h3>
                  <p className="text-[#4B2E2B]/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 mb-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl text-[#4B2E2B]">{text.returnTripBenefits}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: text.benefit1,
                  desc: text.benefit1Desc,
                  icon: TrendingDown,
                  image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMHNhdmluZ3MlMjBncm93dGglMjBidXNpbmVzc3xlbnwxfHx8fDE3NzI4MDcyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                },
                {
                  title: text.benefit2,
                  desc: text.benefit2Desc,
                  icon: Leaf,
                  image: 'https://images.unsplash.com/photo-1641941672934-9e33a79ec482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGVudmlyb25tZW50JTIwc3VzdGFpbmFiaWxpdHklMjBuYXR1cmV8ZW58MXx8fHwxNzcyODA3MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                },
                {
                  title: text.benefit3,
                  desc: text.benefit3Desc,
                  icon: Zap,
                  image: 'https://images.unsplash.com/photo-1687880465237-463957e948c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdod2F5JTIwcm9hZCUyMGFlcmlhbCUyMHZpZXclMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcyNzgzNDI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
                },
                {
                  title: text.benefit4,
                  desc: text.benefit4Desc,
                  icon: Shield,
                  image: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?w=400',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <div className="relative h-32 overflow-hidden">
                    <ImageWithFallback
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg text-[#4B2E2B] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#4B2E2B]/60">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Available Return Trucks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4B2E2B] to-[#3a2422] rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl text-[#4B2E2B]">{text.availableTrucks}</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#4B2E2B]/10 text-[#4B2E2B] rounded-xl hover:bg-[#4B2E2B]/20 transition-colors flex items-center gap-2"
              >
                <ArrowLeftRight className="w-4 h-4" />
                {text.compareOptions}
              </motion.button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {returnTripOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer relative overflow-hidden border-2 border-transparent hover:border-green-500 transition-all"
                >
                  {/* Match Score Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm rounded-full flex items-center gap-1 shadow-lg">
                    <Target className="w-3 h-3" />
                    {option.matchScore}% {text.matchScore}
                  </div>

                  {/* Driver Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <ImageWithFallback
                        src={option.driverPhoto}
                        alt={option.driver}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg text-[#4B2E2B] mb-1">{option.driver}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#4B2E2B]/60">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#D4A373] text-[#D4A373]" />
                          <span>{option.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{option.trips} trips</span>
                      </div>
                    </div>
                  </div>

                  {/* Route Visualization */}
                  <div className="bg-gradient-to-r from-[#F7EFE9] via-[#e8dfd7] to-[#F7EFE9] rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-xs text-[#4B2E2B]/60 mb-1">{text.from}</p>
                        <p className="text-sm text-[#4B2E2B]">{option.returnRoute.from}</p>
                      </div>
                      <div className="px-4">
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5 text-green-600" />
                        </motion.div>
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-xs text-[#4B2E2B]/60 mb-1">{text.to}</p>
                        <p className="text-sm text-[#4B2E2B]">{option.returnRoute.to}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#4B2E2B]/60">
                      <RouteIcon className="w-3 h-3" />
                      <span>{option.distance} miles</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{option.availability}</span>
                    </div>
                  </div>

                  {/* Pricing Comparison */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-red-50 rounded-xl p-3">
                      <p className="text-xs text-red-600 mb-1">{text.standardPrice}</p>
                      <p className="text-lg text-red-700 line-through">${option.standardPrice}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3">
                      <p className="text-xs text-green-600 mb-1">{text.returnPrice}</p>
                      <p className="text-lg text-green-700">${option.returnPrice}</p>
                    </div>
                    <div className="bg-[#D4A373]/10 rounded-xl p-3">
                      <p className="text-xs text-[#D4A373] mb-1">{text.savings}</p>
                      <p className="text-lg text-[#4B2E2B]">${option.savings}</p>
                    </div>
                  </div>

                  {/* Savings Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2 + index * 0.1, type: 'spring' }}
                    className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-3 mb-4 text-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        <span>Save {option.savingsPercentage}%</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Leaf className="w-4 h-4" />
                          <span>{option.co2Saved}kg CO2</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Truck Details */}
                  <div className="flex items-center justify-between text-sm text-[#4B2E2B]/60 mb-4">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <span>{option.truckType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <span>{option.capacity}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBooking(option)}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {text.bookNow}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-3 bg-white border-2 border-[#4B2E2B]/20 text-[#4B2E2B] rounded-xl hover:border-[#4B2E2B]/40 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedOption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBookingModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl text-[#4B2E2B] text-center mb-4">{text.bookingTitle}</h2>
              <p className="text-[#4B2E2B]/60 text-center mb-6">{text.bookingMessage}</p>

              {/* Selected Option Summary */}
              <div className="bg-gradient-to-br from-[#F7EFE9] to-[#e8dfd7] rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <ImageWithFallback
                    src={selectedOption.driverPhoto}
                    alt={selectedOption.driver}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg text-[#4B2E2B]">{selectedOption.driver}</p>
                    <p className="text-sm text-[#4B2E2B]/60">{selectedOption.truckType}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#4B2E2B]/10">
                  <div>
                    <p className="text-sm text-[#4B2E2B]/60 mb-1">{text.savings}</p>
                    <p className="text-2xl text-green-600">${selectedOption.savings}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#4B2E2B]/60 mb-1">{text.returnPrice}</p>
                    <p className="text-2xl text-[#4B2E2B]">${selectedOption.returnPrice}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 bg-white border-2 border-[#4B2E2B]/20 text-[#4B2E2B] rounded-xl hover:border-[#4B2E2B]/40 transition-colors"
                >
                  {text.cancel}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowBookingModal(false);
                    // Handle booking confirmation
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg"
                >
                  {text.confirm}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


