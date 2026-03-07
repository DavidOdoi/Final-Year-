import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  MapPin, 
  Calendar,
  Clock,
  Truck,
  Weight,
  Ruler,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  FileText,
  Image as ImageIcon,
  Upload,
  X,
  Thermometer,
  Shield,
  AlertTriangle,
  Box,
  Navigation,
  Phone,
  Mail,
  Star,
  ChevronDown
} from 'lucide-react';
import { TraderSidebar } from '../components/trader/TraderSidebar';
import { TraderTopBar } from '../components/trader/TraderTopBar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router';

interface MatchedDriver {
  id: string;
  name: string;
  photo: string;
  rating: number;
  trips: number;
  truckType: string;
  capacity: string;
  price: string;
  availability: string;
  distance: number;
  matchScore: number;
  returnTrip: boolean;
}

export default function PostLoad() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [matchedDrivers, setMatchedDrivers] = useState<MatchedDriver[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [showReturnTripSuggestion, setShowReturnTripSuggestion] = useState(false);

  const [formData, setFormData] = useState({
    // Load Details
    loadType: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    quantity: '',
    description: '',
    
    // Pickup Details
    pickupLocation: '',
    pickupCity: '',
    pickupDate: '',
    pickupTime: '',
    pickupContact: '',
    pickupPhone: '',
    
    // Delivery Details
    deliveryLocation: '',
    deliveryCity: '',
    deliveryDate: '',
    deliveryTime: '',
    deliveryContact: '',
    deliveryPhone: '',
    
    // Truck Requirements
    truckType: '',
    specialRequirements: [] as string[],
    
    // Additional
    budget: '',
    notes: '',
  });

  const content = {
    sw: {
      title: 'Tuma Mzigo',
      subtitle: 'Jaza maelezo ya mzigo wako na tupate dereva bora',
      step: 'Hatua',
      of: 'ya',
      
      // Steps
      steps: [
        'Maelezo ya Mzigo',
        'Eneo la Kuchukua',
        'Eneo la Kupeleka',
        'Mahitaji ya Lori',
        'Thibitisha',
      ],
      
      // Load Details
      loadDetails: 'Maelezo ya Mzigo',
      loadType: 'Aina ya Mzigo',
      selectLoadType: 'Chagua aina ya mzigo',
      weight: 'Uzani (tani)',
      dimensions: 'Vipimo',
      length: 'Urefu (m)',
      width: 'Upana (m)',
      height: 'Kimo (m)',
      quantity: 'Idadi',
      description: 'Maelezo',
      
      // Pickup
      pickupDetails: 'Maelezo ya Kuchukua',
      pickupLocation: 'Eneo la Kuchukua',
      city: 'Jiji',
      address: 'Anwani',
      date: 'Tarehe',
      time: 'Muda',
      contactPerson: 'Mtu wa Kuwasiliana',
      phoneNumber: 'Nambari ya Simu',
      
      // Delivery
      deliveryDetails: 'Maelezo ya Kupeleka',
      deliveryLocation: 'Eneo la Kupeleka',
      
      // Truck Requirements
      truckRequirements: 'Mahitaji ya Lori',
      truckType: 'Aina ya Lori',
      selectTruckType: 'Chagua aina ya lori',
      specialRequirements: 'Mahitaji Maalum',
      refrigerated: 'Jokofu',
      fragile: 'Vituvi',
      hazardous: 'Hatari',
      oversized: 'Kubwa Sana',
      
      // Review
      reviewDetails: 'Kagua Maelezo',
      estimatedPrice: 'Bei Inayotarajiwa',
      matchingDrivers: 'Madereva Wanaofaa',
      budget: 'Bajeti Yako',
      additionalNotes: 'Maelezo Zaidi',
      
      // Actions
      next: 'Endelea',
      previous: 'Rudi',
      submit: 'Tuma Mzigo',
      submitting: 'Inatuma...',
      
      // Success
      success: 'Mzigo Umetumwa!',
      successMessage: 'Mzigo wako umetumwa kwa mafanikio. Tunapata madereva bora.',
      viewShipments: 'Angalia Usafirishaji',
      postAnother: 'Tuma Mzigo Mwingine',
      
      // Return Trip
      returnTripTitle: 'Safari ya Kurudi Inapatikana!',
      returnTripDesc: 'Tunaweza kuokoa hadi 40% kwa kutumia lori inayorudi',
      optimizeReturn: 'Boresha Safari ya Kurudi',
      
      // Load Types
      loadTypes: {
        general: 'Kawaida',
        perishable: 'Huharibika',
        fragile: 'Vituvi',
        hazardous: 'Hatari',
        bulk: 'Wingi',
        container: 'Kontena',
      },
      
      // Truck Types
      truckTypes: {
        flatbed: 'Flatbed',
        container: 'Kontena',
        refrigerated: 'Jokofu',
        tanker: 'Tanki',
        lowboy: 'Lowboy',
        box: 'Box',
      },
    },
    en: {
      title: 'Post Load',
      subtitle: 'Fill in your load details and find the best drivers',
      step: 'Step',
      of: 'of',
      
      // Steps
      steps: [
        'Load Details',
        'Pickup Location',
        'Delivery Location',
        'Truck Requirements',
        'Review & Submit',
      ],
      
      // Load Details
      loadDetails: 'Load Details',
      loadType: 'Load Type',
      selectLoadType: 'Select load type',
      weight: 'Weight (tons)',
      dimensions: 'Dimensions',
      length: 'Length (m)',
      width: 'Width (m)',
      height: 'Height (m)',
      quantity: 'Quantity',
      description: 'Description',
      
      // Pickup
      pickupDetails: 'Pickup Details',
      pickupLocation: 'Pickup Location',
      city: 'City',
      address: 'Address',
      date: 'Date',
      time: 'Time',
      contactPerson: 'Contact Person',
      phoneNumber: 'Phone Number',
      
      // Delivery
      deliveryDetails: 'Delivery Details',
      deliveryLocation: 'Delivery Location',
      
      // Truck Requirements
      truckRequirements: 'Truck Requirements',
      truckType: 'Truck Type',
      selectTruckType: 'Select truck type',
      specialRequirements: 'Special Requirements',
      refrigerated: 'Refrigerated',
      fragile: 'Fragile',
      hazardous: 'Hazardous',
      oversized: 'Oversized',
      
      // Review
      reviewDetails: 'Review Details',
      estimatedPrice: 'Estimated Price',
      matchingDrivers: 'Matching Drivers',
      budget: 'Your Budget',
      additionalNotes: 'Additional Notes',
      
      // Actions
      next: 'Next',
      previous: 'Previous',
      submit: 'Post Load',
      submitting: 'Posting...',
      
      // Success
      success: 'Load Posted Successfully!',
      successMessage: 'Your load has been posted successfully. We are finding the best drivers for you.',
      viewShipments: 'View Shipments',
      postAnother: 'Post Another Load',
      
      // Return Trip
      returnTripTitle: 'Return Trip Available!',
      returnTripDesc: 'Save up to 40% by using a returning truck',
      optimizeReturn: 'Optimize Return Trip',
      
      // Load Types
      loadTypes: {
        general: 'General Cargo',
        perishable: 'Perishable',
        fragile: 'Fragile',
        hazardous: 'Hazardous',
        bulk: 'Bulk',
        container: 'Container',
      },
      
      // Truck Types
      truckTypes: {
        flatbed: 'Flatbed',
        container: 'Container',
        refrigerated: 'Refrigerated',
        tanker: 'Tanker',
        lowboy: 'Lowboy',
        box: 'Box Truck',
      },
    },
  };

  const text = content[language];

  // Mock matched drivers
  useEffect(() => {
    if (currentStep === 5) {
      // Simulate driver matching
      const mockDrivers: MatchedDriver[] = [
        {
          id: '1',
          name: 'John Kamau',
          photo: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?w=400',
          rating: 4.9,
          trips: 324,
          truckType: 'Flatbed',
          capacity: '20 tons',
          price: '$450',
          availability: 'Today',
          distance: 45,
          matchScore: 95,
          returnTrip: true,
        },
        {
          id: '2',
          name: 'Peter Wanjiru',
          photo: 'https://images.unsplash.com/photo-1576870996037-78d60be7509f?w=400',
          rating: 4.8,
          trips: 256,
          truckType: 'Container',
          capacity: '25 tons',
          price: '$520',
          availability: 'Tomorrow',
          distance: 78,
          matchScore: 88,
          returnTrip: false,
        },
      ];
      setMatchedDrivers(mockDrivers);
      
      // Calculate estimated price
      const price = 400 + Math.random() * 200;
      setEstimatedPrice(Math.round(price));
      
      // Check for return trip optimization
      if (mockDrivers.some(d => d.returnTrip)) {
        setTimeout(() => setShowReturnTripSuggestion(true), 1000);
      }
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  const toggleSpecialRequirement = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      specialRequirements: prev.specialRequirements.includes(requirement)
        ? prev.specialRequirements.filter(r => r !== requirement)
        : [...prev.specialRequirements, requirement]
    }));
  };

  const progressPercentage = (currentStep / 5) * 100;

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
          {!showSuccess ? (
            <>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-3xl md:text-4xl text-[#4B2E2B] mb-2">{text.title}</h1>
                <p className="text-[#4B2E2B]/60">{text.subtitle}</p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#4B2E2B]/60">
                    {text.step} {currentStep} {text.of} 5
                  </span>
                  <span className="text-sm text-[#4B2E2B] font-medium">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="relative h-2 bg-[#F7EFE9] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute h-full bg-gradient-to-r from-[#4B2E2B] via-[#D4A373] to-[#4B2E2B] rounded-full"
                  />
                </div>
                
                {/* Step Labels */}
                <div className="grid grid-cols-5 gap-2 mt-6">
                  {text.steps.map((step, index) => (
                    <div key={step} className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center transition-all ${
                          index + 1 <= currentStep
                            ? 'bg-[#4B2E2B] text-white shadow-lg'
                            : 'bg-[#F7EFE9] text-[#4B2E2B]/40'
                        }`}
                      >
                        {index + 1 < currentStep ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </motion.div>
                      <p className={`text-xs transition-colors ${
                        index + 1 === currentStep ? 'text-[#4B2E2B]' : 'text-[#4B2E2B]/40'
                      }`}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Form Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
                >
                  {/* Step 1: Load Details */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4B2E2B] to-[#3a2422] rounded-xl flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl text-[#4B2E2B]">{text.loadDetails}</h2>
                          <p className="text-sm text-[#4B2E2B]/60">Provide basic information about your load</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.loadType} *
                          </label>
                          <div className="relative">
                            <select
                              value={formData.loadType}
                              onChange={(e) => setFormData({ ...formData, loadType: e.target.value })}
                              className="w-full px-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B] appearance-none"
                            >
                              <option value="">{text.selectLoadType}</option>
                              {Object.entries(text.loadTypes).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40 pointer-events-none" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.weight} *
                          </label>
                          <div className="relative">
                            <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="number"
                              value={formData.weight}
                              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="e.g., 15"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.quantity}
                          </label>
                          <div className="relative">
                            <Box className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="number"
                              value={formData.quantity}
                              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="e.g., 100 pallets"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-[#4B2E2B] mb-3">
                          {text.dimensions}
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs text-[#4B2E2B]/60 mb-2">{text.length}</label>
                            <input
                              type="number"
                              value={formData.length}
                              onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                              className="w-full px-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#4B2E2B]/60 mb-2">{text.width}</label>
                            <input
                              type="number"
                              value={formData.width}
                              onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                              className="w-full px-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#4B2E2B]/60 mb-2">{text.height}</label>
                            <input
                              type="number"
                              value={formData.height}
                              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                              className="w-full px-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-[#4B2E2B] mb-2">
                          {text.description}
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B] resize-none"
                          placeholder="Describe your load in detail..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Pickup Location */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl text-[#4B2E2B]">{text.pickupDetails}</h2>
                          <p className="text-sm text-[#4B2E2B]/60">Where should we pick up the load?</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.city} *
                          </label>
                          <div className="relative">
                            <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="text"
                              value={formData.pickupCity}
                              onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="e.g., Nairobi"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.address} *
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="text"
                              value={formData.pickupLocation}
                              onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="Full address"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.date} *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="date"
                              value={formData.pickupDate}
                              onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.time} *
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="time"
                              value={formData.pickupTime}
                              onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.contactPerson} *
                          </label>
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="text"
                              value={formData.pickupContact}
                              onChange={(e) => setFormData({ ...formData, pickupContact: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="Contact name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.phoneNumber} *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="tel"
                              value={formData.pickupPhone}
                              onChange={(e) => setFormData({ ...formData, pickupPhone: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="+254 700 000 000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Delivery Location */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl text-[#4B2E2B]">{text.deliveryDetails}</h2>
                          <p className="text-sm text-[#4B2E2B]/60">Where should we deliver the load?</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.city} *
                          </label>
                          <div className="relative">
                            <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="text"
                              value={formData.deliveryCity}
                              onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="e.g., Mombasa"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.address} *
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="text"
                              value={formData.deliveryLocation}
                              onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="Full address"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.date} *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="date"
                              value={formData.deliveryDate}
                              onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.time}
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="time"
                              value={formData.deliveryTime}
                              onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.contactPerson} *
                          </label>
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="text"
                              value={formData.deliveryContact}
                              onChange={(e) => setFormData({ ...formData, deliveryContact: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="Contact name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#4B2E2B] mb-2">
                            {text.phoneNumber} *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                            <input
                              type="tel"
                              value={formData.deliveryPhone}
                              onChange={(e) => setFormData({ ...formData, deliveryPhone: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                              placeholder="+254 700 000 000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Truck Requirements */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#D4A373] to-[#b8865c] rounded-xl flex items-center justify-center">
                          <Truck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl text-[#4B2E2B]">{text.truckRequirements}</h2>
                          <p className="text-sm text-[#4B2E2B]/60">Specify your truck preferences</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-[#4B2E2B] mb-3">
                          {text.truckType} *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(text.truckTypes).map(([key, value]) => (
                            <motion.button
                              key={key}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setFormData({ ...formData, truckType: key })}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                formData.truckType === key
                                  ? 'border-[#D4A373] bg-[#D4A373]/10'
                                  : 'border-[#4B2E2B]/10 hover:border-[#4B2E2B]/20'
                              }`}
                            >
                              <Truck className={`w-8 h-8 mx-auto mb-2 ${
                                formData.truckType === key ? 'text-[#D4A373]' : 'text-[#4B2E2B]/60'
                              }`} />
                              <p className={`text-sm ${
                                formData.truckType === key ? 'text-[#4B2E2B]' : 'text-[#4B2E2B]/60'
                              }`}>
                                {value}
                              </p>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-[#4B2E2B] mb-3">
                          {text.specialRequirements}
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { id: 'refrigerated', label: text.refrigerated, icon: Thermometer },
                            { id: 'fragile', label: text.fragile, icon: AlertCircle },
                            { id: 'hazardous', label: text.hazardous, icon: AlertTriangle },
                            { id: 'oversized', label: text.oversized, icon: Ruler },
                          ].map((req) => {
                            const Icon = req.icon;
                            const isSelected = formData.specialRequirements.includes(req.id);
                            return (
                              <motion.button
                                key={req.id}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleSpecialRequirement(req.id)}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  isSelected
                                    ? 'border-[#D4A373] bg-[#D4A373]/10'
                                    : 'border-[#4B2E2B]/10 hover:border-[#4B2E2B]/20'
                                }`}
                              >
                                <Icon className={`w-6 h-6 mx-auto mb-2 ${
                                  isSelected ? 'text-[#D4A373]' : 'text-[#4B2E2B]/60'
                                }`} />
                                <p className={`text-sm ${
                                  isSelected ? 'text-[#4B2E2B]' : 'text-[#4B2E2B]/60'
                                }`}>
                                  {req.label}
                                </p>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-[#4B2E2B] mb-2">
                          {text.budget}
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                          <input
                            type="number"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                            placeholder="Your budget (optional)"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-[#4B2E2B] mb-2">
                          {text.additionalNotes}
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B] resize-none"
                          placeholder="Any additional information..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: Review & Submit */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl text-[#4B2E2B]">{text.reviewDetails}</h2>
                          <p className="text-sm text-[#4B2E2B]/60">Review and submit your load</p>
                        </div>
                      </div>

                      {/* Return Trip Suggestion */}
                      <AnimatePresence>
                        {showReturnTripSuggestion && (
                          <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white relative overflow-hidden"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                              className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"
                            />
                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl mb-1">{text.returnTripTitle}</h3>
                                    <p className="text-sm text-white/80">{text.returnTripDesc}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setShowReturnTripSuggestion(false)}
                                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                              <Link to="/optimize-return-trip">
                                <motion.button
                                  whileHover={{ scale: 1.02, y: -2 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="mt-3 px-6 py-2 bg-white text-green-600 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                                >
                                  <Zap className="w-4 h-4" />
                                  {text.optimizeReturn}
                                </motion.button>
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Estimated Price */}
                      <div className="bg-gradient-to-br from-[#D4A373]/10 to-[#4B2E2B]/5 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[#4B2E2B]/60 mb-1">{text.estimatedPrice}</p>
                            <p className="text-3xl text-[#4B2E2B]">${estimatedPrice}</p>
                          </div>
                          <div className="w-16 h-16 bg-gradient-to-br from-[#D4A373] to-[#b8865c] rounded-full flex items-center justify-center">
                            <DollarSign className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Matched Drivers */}
                      <div>
                        <h3 className="text-lg text-[#4B2E2B] mb-4 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-[#D4A373]" />
                          {text.matchingDrivers}
                        </h3>
                        <div className="space-y-4">
                          {matchedDrivers.map((driver, index) => (
                            <motion.div
                              key={driver.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02, x: 4 }}
                              className="bg-white border-2 border-[#4B2E2B]/10 rounded-2xl p-4 cursor-pointer hover:border-[#D4A373] transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <ImageWithFallback
                                    src={driver.photo}
                                    alt={driver.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                  />
                                  {driver.returnTrip && (
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                      <TrendingUp className="w-3 h-3 text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-lg text-[#4B2E2B]">{driver.name}</h4>
                                    <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                      {driver.matchScore}% Match
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm text-[#4B2E2B]/60">
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 fill-[#D4A373] text-[#D4A373]" />
                                      <span>{driver.rating}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{driver.trips} trips</span>
                                    <span>•</span>
                                    <span>{driver.truckType}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl text-[#4B2E2B] mb-1">{driver.price}</p>
                                  <p className="text-xs text-[#4B2E2B]/60">{driver.availability}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Load Summary */}
                      <div className="bg-[#F7EFE9] rounded-2xl p-6">
                        <h3 className="text-lg text-[#4B2E2B] mb-4">Load Summary</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-[#4B2E2B]/60 mb-1">Load Type</p>
                            <p className="text-[#4B2E2B]">{text.loadTypes[formData.loadType as keyof typeof text.loadTypes] || '-'}</p>
                          </div>
                          <div>
                            <p className="text-[#4B2E2B]/60 mb-1">Weight</p>
                            <p className="text-[#4B2E2B]">{formData.weight} tons</p>
                          </div>
                          <div>
                            <p className="text-[#4B2E2B]/60 mb-1">From</p>
                            <p className="text-[#4B2E2B]">{formData.pickupCity || '-'}</p>
                          </div>
                          <div>
                            <p className="text-[#4B2E2B]/60 mb-1">To</p>
                            <p className="text-[#4B2E2B]">{formData.deliveryCity || '-'}</p>
                          </div>
                          <div>
                            <p className="text-[#4B2E2B]/60 mb-1">Pickup Date</p>
                            <p className="text-[#4B2E2B]">{formData.pickupDate || '-'}</p>
                          </div>
                          <div>
                            <p className="text-[#4B2E2B]/60 mb-1">Delivery Date</p>
                            <p className="text-[#4B2E2B]">{formData.deliveryDate || '-'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-8 pt-6 border-t border-[#4B2E2B]/10">
                    {currentStep > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.02, x: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePrevious}
                        className="px-6 py-3 bg-white border-2 border-[#4B2E2B]/20 text-[#4B2E2B] rounded-xl flex items-center gap-2 hover:border-[#4B2E2B]/40 transition-all"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        {text.previous}
                      </motion.button>
                    )}
                    
                    {currentStep < 5 ? (
                      <motion.button
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        className="flex-1 py-3 bg-gradient-to-r from-[#4B2E2B] to-[#3a2422] text-white rounded-xl flex items-center justify-center gap-2 shadow-lg"
                      >
                        {text.next}
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Zap className="w-5 h-5" />
                            </motion.div>
                            {text.submitting}
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            {text.submit}
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            // Success Screen
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl text-[#4B2E2B] mb-4"
                >
                  {text.success}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-[#4B2E2B]/60 mb-8"
                >
                  {text.successMessage}
                </motion.p>

                {/* Matched Driver Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-[#F7EFE9] to-[#e8dfd7] rounded-2xl p-6 mb-8"
                >
                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      src={matchedDrivers[0]?.photo || ''}
                      alt="Driver"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm text-[#4B2E2B]/60 mb-1">Top Match</p>
                      <p className="text-lg text-[#4B2E2B]">{matchedDrivers[0]?.name}</p>
                      <div className="flex items-center gap-2 text-sm text-[#4B2E2B]/60">
                        <Star className="w-3 h-3 fill-[#D4A373] text-[#D4A373]" />
                        <span>{matchedDrivers[0]?.rating}</span>
                        <span>•</span>
                        <span>{matchedDrivers[0]?.matchScore}% Match</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = '/trader-dashboard'}
                    className="flex-1 py-3 bg-gradient-to-r from-[#4B2E2B] to-[#3a2422] text-white rounded-xl shadow-lg"
                  >
                    {text.viewShipments}
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowSuccess(false);
                      setCurrentStep(1);
                      setFormData({
                        loadType: '',
                        weight: '',
                        length: '',
                        width: '',
                        height: '',
                        quantity: '',
                        description: '',
                        pickupLocation: '',
                        pickupCity: '',
                        pickupDate: '',
                        pickupTime: '',
                        pickupContact: '',
                        pickupPhone: '',
                        deliveryLocation: '',
                        deliveryCity: '',
                        deliveryDate: '',
                        deliveryTime: '',
                        deliveryContact: '',
                        deliveryPhone: '',
                        truckType: '',
                        specialRequirements: [],
                        budget: '',
                        notes: '',
                      });
                    }}
                    className="flex-1 py-3 bg-white border-2 border-[#4B2E2B]/20 text-[#4B2E2B] rounded-xl hover:border-[#4B2E2B]/40 transition-all"
                  >
                    {text.postAnother}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
