import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import group from '../../assets/images/group.png';
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Globe,
  Shield,
  Package,
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

export default function TraderRegister() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    businessType: '',
    tradingVolume: '',
  });

  const content = {
    sw: {
      title: 'Jiunge na Usafirishaji',
      subtitle: 'Anza safari yako ya usafirishaji leo',
      step1Title: 'Taarifa za Kampuni',
      step2Title: 'Taarifa za Mawasiliano',
      step3Title: 'Maelezo ya Biashara',
      companyName: 'Jina la Kampuni',
      contactPerson: 'Mtu wa Mawasiliano',
      email: 'Barua Pepe',
      phone: 'Namba ya Simu',
      location: 'Eneo/Jiji',
      businessType: 'Aina ya Biashara',
      tradingVolume: 'Kiasi cha Biashara kwa Mwezi',
      next: 'Endelea',
      previous: 'Nyuma',
      submit: 'Wasilisha Ombi',
      success: 'Hongera!',
      successMessage: 'Akaunti yako imetengenezwa kwa mafanikio',
      goToDashboard: 'Nenda kwenye Dashibodi',
      requiredError: 'Tafadhali jaza sehemu zote zinazotakiwa.',
      passwordMismatch: 'Nywila hazifanani.',
      passwordShort: 'Nywila iwe angalau herufi 6.',
      registerFailed: 'Imeshindwa kuunda akaunti. Jaribu tena.',
      features: [
        { title: 'Madereva wa Kuaminika', desc: 'Madereva 500+ waliokaguliwa' },
        { title: 'Ufuatiliaji wa Moja kwa Moja', desc: 'Fuatilia mizigo yako wakati wote' },
        { title: 'Malipo Salama', desc: 'M-Pesa, Airtel Money na zaidi' },
      ],
    },
    en: {
      title: 'Join ELOGISTICA',
      subtitle: 'Start your shipping journey today',
      step1Title: 'Company Information',
      step2Title: 'Contact Details',
      step3Title: 'Business Details',
      companyName: 'Company Name',
      contactPerson: 'Contact Person',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'Location/City',
      businessType: 'Business Type',
      tradingVolume: 'Monthly Trading Volume',
      next: 'Continue',
      previous: 'Back',
      submit: 'Submit Application',
      success: 'Congratulations!',
      successMessage: 'Your account has been created successfully',
      goToDashboard: 'Go to Dashboard',
      requiredError: 'Please fill in all required fields.',
      passwordMismatch: 'Passwords do not match.',
      passwordShort: 'Password must be at least 6 characters.',
      registerFailed: 'Failed to create account. Please try again.',
      features: [
        { title: 'Verified Drivers', desc: '500+ vetted professionals' },
        { title: 'Live Tracking', desc: 'Track your shipments 24/7' },
        { title: 'Secure Payments', desc: 'M-Pesa, Airtel Money & more' },
      ],
    },
  };

  const text = content[language];

  const images = [
    group,
    group,
    'https://images.unsplash.com/photo-1735047974891-df59713d8192?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXBwaW5nJTIwY29udGFpbmVycyUyMHBvcnR8ZW58MXx8fHwxNzcyNDQwOTE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const step1Valid = formData.companyName.trim().length > 0 && formData.location.trim().length > 0;
  const step2Valid =
    formData.contactPerson.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.phone.trim().length > 0 &&
    password.length >= 6 &&
    password === confirmPassword;
  const step3Valid = formData.businessType.trim().length > 0 && formData.tradingVolume.trim().length > 0;
  const canProceed = currentStep === 1 ? step1Valid : currentStep === 2 ? step2Valid : step3Valid;

  const handleNext = () => {
    setError(null);
    if (currentStep === 1 && !step1Valid) {
      setError(text.requiredError);
      return;
    }
    if (currentStep === 2 && !step2Valid) {
      if (!formData.contactPerson.trim() || !formData.email.trim() || !formData.phone.trim() || !password || !confirmPassword) {
        setError(text.requiredError);
      } else if (password.length < 6) {
        setError(text.passwordShort);
      } else if (password !== confirmPassword) {
        setError(text.passwordMismatch);
      } else {
        setError(text.requiredError);
      }
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    if (!step3Valid) {
      setError(text.requiredError);
      return;
    }
    if (!password || password.length < 6) {
      setError(text.passwordShort);
      return;
    }
    if (password !== confirmPassword) {
      setError(text.passwordMismatch);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.contactPerson,
          companyName: formData.companyName,
          location: formData.location,
          businessType: formData.businessType,
          tradingVolume: formData.tradingVolume,
          email: formData.email,
          phone: formData.phone,
          password,
          role: 'trader'
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || text.registerFailed);
      }

      if (data?.data?.token) {
        localStorage.setItem('auth_token', data.data.token);
      }
      if (data?.data?.user) {
        localStorage.setItem('auth_user', JSON.stringify(data.data.user));
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : text.registerFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-[#4B2E2B] mb-2">
                {text.companyName} *
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#4B2E2B]/10 rounded-xl focus:border-[#D4A373] focus:outline-none transition-colors text-[#4B2E2B]"
                  placeholder={language === 'sw' ? 'Weka jina la kampuni' : 'Enter company name'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#4B2E2B] mb-2">
                {text.location} *
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#4B2E2B]/10 rounded-xl focus:border-[#D4A373] focus:outline-none transition-colors text-[#4B2E2B]"
                  placeholder={language === 'sw' ? 'Nairobi, Kenya' : 'Nairobi, Kenya'}
                />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-[#4B2E2B] mb-2">
                {text.contactPerson} *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#4B2E2B]/10 rounded-xl focus:border-[#D4A373] focus:outline-none transition-colors text-[#4B2E2B]"
                  placeholder={language === 'sw' ? 'Jina kamili' : 'Full name'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#4B2E2B] mb-2">
                {text.email} *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#4B2E2B]/10 rounded-xl focus:border-[#D4A373] focus:outline-none transition-colors text-[#4B2E2B]"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#4B2E2B] mb-2">
                {text.phone} *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#4B2E2B]/10 rounded-xl focus:border-[#D4A373] focus:outline-none transition-colors text-[#4B2E2B]"
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#4B2E2B] mb-2">
                {language === 'sw' ? 'Nywila' : 'Password'} *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white border-2 border-[#4B2E2B]/10 rounded-xl focus:border-[#D4A373] focus:outline-none transition-colors text-[#4B2E2B]"
                  placeholder={language === 'sw' ? 'Weka nywila' : 'Enter password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4B2E2B]/40 hover:text-[#D4A373] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#4B2E2B] mb-2">
                {language === 'sw' ? 'Thibitisha Nywila' : 'Confirm Password'} *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#4B2E2B]/10 rounded-xl focus:border-[#D4A373] focus:outline-none transition-colors text-[#4B2E2B]"
                  placeholder={language === 'sw' ? 'Rudia nywila' : 'Confirm password'}
                />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-[#4B2E2B] mb-2">
                {text.businessType} *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                <select
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#4B2E2B]/10 rounded-xl focus:border-[#D4A373] focus:outline-none transition-colors text-[#4B2E2B] appearance-none"
                >
                  <option value="">{language === 'sw' ? 'Chagua aina' : 'Select type'}</option>
                  <option value="import-export">{language === 'sw' ? 'Kuingiza/Kutoa' : 'Import/Export'}</option>
                  <option value="manufacturing">{language === 'sw' ? 'Uzalishaji' : 'Manufacturing'}</option>
                  <option value="agriculture">{language === 'sw' ? 'Kilimo' : 'Agriculture'}</option>
                  <option value="retail">{language === 'sw' ? 'Rejareja' : 'Retail'}</option>
                  <option value="other">{language === 'sw' ? 'Nyingine' : 'Other'}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#4B2E2B] mb-2">
                {text.tradingVolume} *
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40" />
                <select
                  value={formData.tradingVolume}
                  onChange={(e) => handleInputChange('tradingVolume', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#4B2E2B]/10 rounded-xl focus:border-[#D4A373] focus:outline-none transition-colors text-[#4B2E2B] appearance-none"
                >
                  <option value="">{language === 'sw' ? 'Chagua kiasi' : 'Select volume'}</option>
                  <option value="0-5">0-5 {language === 'sw' ? 'mizigo' : 'loads'}</option>
                  <option value="5-10">5-10 {language === 'sw' ? 'mizigo' : 'loads'}</option>
                  <option value="10-20">10-20 {language === 'sw' ? 'mizigo' : 'loads'}</option>
                  <option value="20+">20+ {language === 'sw' ? 'mizigo' : 'loads'}</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F7EFE9] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl p-8 md:p-12 text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl text-[#4B2E2B] mb-4">{text.success}</h2>
            <p className="text-lg text-[#4B2E2B]/70 mb-8">{text.successMessage}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/trader-dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#4B2E2B] to-[#3a2422] text-white rounded-xl flex items-center gap-2 shadow-lg"
                >
                  {text.goToDashboard}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Celebration Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: 0, x: 0 }}
                animate={{
                  opacity: 0,
                  y: -500,
                  x: Math.random() * 400 - 200,
                }}
                transition={{ duration: 2, delay: i * 0.1 }}
                className="absolute top-1/2 left-1/2"
              >
                <Sparkles className="w-6 h-6 text-[#D4A373]" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7EFE9] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4B2E2B]/5 rounded-full blur-3xl" />

      <div className="relative min-h-screen flex">
        {/* Left Side - Image Carousel */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={images[currentImageIndex]}
                alt="Freight shipping"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#4B2E2B]/80 via-[#4B2E2B]/60 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Feature Cards Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
            {text.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D4A373] rounded-lg flex items-center justify-center flex-shrink-0">
                    {index === 0 && <Shield className="w-5 h-5 text-white" />}
                    {index === 1 && <MapPin className="w-5 h-5 text-white" />}
                    {index === 2 && <Package className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <div className="text-white font-medium">{feature.title}</div>
                    <div className="text-white/70 text-sm">{feature.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-8 right-8 flex gap-2">
            {images.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ scale: currentImageIndex === index ? 1.2 : 1 }}
                className={`w-2 h-2 rounded-full transition-colors ${currentImageIndex === index ? 'bg-[#D4A373]' : 'bg-white/40'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <Link to="/">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-3xl text-[#4B2E2B]"
                  >
                    ELOGISTICA
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLanguage(language === 'sw' ? 'en' : 'sw')}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <Globe className="w-6 h-6 text-[#4B2E2B]" />
                </motion.button>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl text-[#4B2E2B] mb-2"
              >
                {text.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[#4B2E2B]/60"
              >
                {text.subtitle}
              </motion.p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex-1 flex items-center">
                    <motion.div
                      animate={{
                        scale: currentStep === step ? 1.2 : 1,
                        backgroundColor: currentStep >= step ? '#4B2E2B' : '#E0E0E0',
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                    >
                      {step}
                    </motion.div>
                    {step < 3 && (
                      <motion.div
                        animate={{
                          backgroundColor: currentStep > step ? '#4B2E2B' : '#E0E0E0',
                        }}
                        className="flex-1 h-1 mx-2"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm text-[#4B2E2B]/60">
                {currentStep === 1 && text.step1Title}
                {currentStep === 2 && text.step2Title}
                {currentStep === 3 && text.step3Title}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-6">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              {currentStep > 1 && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02, x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrevious}
                  className="flex-1 py-4 bg-white border-2 border-[#4B2E2B]/20 text-[#4B2E2B] rounded-xl flex items-center justify-center gap-2 hover:border-[#4B2E2B]/40 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {text.previous}
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={currentStep === 3 ? handleSubmit : handleNext}
                disabled={isSubmitting || !canProceed}
                className="flex-1 py-4 bg-gradient-to-r from-[#4B2E2B] to-[#3a2422] text-white rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (language === 'sw' ? 'Inatuma...' : 'Submitting...') : (currentStep === 3 ? text.submit : text.next)}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center text-sm text-[#4B2E2B]/60"
            >
              {language === 'sw' ? 'Una akaunti tayari?' : 'Already have an account?'}{' '}
              <Link to="/trader-login" className="text-[#4B2E2B] hover:text-[#D4A373] transition-colors">
                {language === 'sw' ? 'Ingia' : 'Sign in'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



