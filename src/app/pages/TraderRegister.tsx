import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { clearStoredSession } from '../lib/api';
import { Link, useNavigate } from 'react-router';
import group from '../../assets/images/group.webp';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  MapPin,
  Package,
  Phone,
  Shield,
  TrendingUp,
  User,
} from 'lucide-react';
<<<<<<< HEAD

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
=======
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
>>>>>>> 05d55bce8458fe8671060996a2d4cfd39da985df

export default function TraderRegister() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      requiredError: 'Tafadhali jaza sehemu zote zinazotakiwa.',
      passwordMismatch: 'Nywila hazifanani.',
      passwordShort: 'Nywila iwe angalau herufi 6.',
      registerFailed: 'Imeshindwa kuunda akaunti. Jaribu tena.',
      features: [
        { title: 'Madereva wa Kuaminika', desc: 'Madereva 500+ waliokaguliwa' },
        { title: 'Ufuatiliaji wa Moja kwa Moja', desc: 'Fuatilia mizigo yako wakati wote' },
        { title: 'Malipo Salama', desc: 'M-Pesa, Airtel Money na zaidi' },
      ],
      signIn: 'Ingia',
      alreadyHaveAccount: 'Una akaunti tayari?',
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
      requiredError: 'Please fill in all required fields.',
      passwordMismatch: 'Passwords do not match.',
      passwordShort: 'Password must be at least 6 characters.',
      registerFailed: 'Failed to create account. Please try again.',
      features: [
        { title: 'Verified Drivers', desc: '500+ vetted professionals' },
        { title: 'Live Tracking', desc: 'Track your shipments 24/7' },
        { title: 'Secure Payments', desc: 'M-Pesa, Airtel Money & more' },
      ],
      signIn: 'Sign in',
      alreadyHaveAccount: 'Already have an account?',
    },
  };

  const text = content[language];

  const step1Valid = formData.companyName.trim().length > 0 && formData.location.trim().length > 0;
  const step2Valid =
    formData.contactPerson.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.phone.trim().length > 0 &&
    password.length >= 6 &&
    password === confirmPassword;
  const step3Valid = formData.businessType.trim().length > 0 && formData.tradingVolume.trim().length > 0;
  const canProceed = currentStep === 1 ? step1Valid : currentStep === 2 ? step2Valid : step3Valid;

  function handleInputChange(field: keyof typeof formData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleNext() {
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
      } else {
        setError(text.passwordMismatch);
      }
      return;
    }

    if (currentStep < 3) {
      setCurrentStep((current) => current + 1);
    }
  }

  function handlePrevious() {
    setError(null);
    if (currentStep > 1) {
      setCurrentStep((current) => current - 1);
    }
  }

  async function handleSubmit() {
    setError(null);

    if (!step3Valid) {
      setError(text.requiredError);
      return;
    }

    if (password.length < 6) {
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
          role: 'trader',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || text.registerFailed);
      }

      clearStoredSession('driver');
      clearStoredSession('trader');

      const nextSearch = new URLSearchParams({
        registered: '1',
        email: formData.email,
      });

      navigate(`/trader-login?${nextSearch.toString()}`, { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : text.registerFailed;
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  function renderStepContent() {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm text-[#4B2E2B]">{text.companyName} *</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40" />
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(event) => handleInputChange('companyName', event.target.value)}
                  className="w-full rounded-xl border-2 border-[#4B2E2B]/10 bg-white py-4 pl-12 pr-4 text-[#4B2E2B] transition-colors focus:border-[#D4A373] focus:outline-none"
                  placeholder={language === 'sw' ? 'Weka jina la kampuni' : 'Enter company name'}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#4B2E2B]">{text.location} *</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(event) => handleInputChange('location', event.target.value)}
                  className="w-full rounded-xl border-2 border-[#4B2E2B]/10 bg-white py-4 pl-12 pr-4 text-[#4B2E2B] transition-colors focus:border-[#D4A373] focus:outline-none"
                  placeholder="Kampala, Uganda"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm text-[#4B2E2B]">{text.contactPerson} *</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40" />
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(event) => handleInputChange('contactPerson', event.target.value)}
                  className="w-full rounded-xl border-2 border-[#4B2E2B]/10 bg-white py-4 pl-12 pr-4 text-[#4B2E2B] transition-colors focus:border-[#D4A373] focus:outline-none"
                  placeholder={language === 'sw' ? 'Jina kamili' : 'Full name'}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#4B2E2B]">{text.email} *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => handleInputChange('email', event.target.value)}
                  className="w-full rounded-xl border-2 border-[#4B2E2B]/10 bg-white py-4 pl-12 pr-4 text-[#4B2E2B] transition-colors focus:border-[#D4A373] focus:outline-none"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#4B2E2B]">{text.phone} *</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => handleInputChange('phone', event.target.value)}
                  className="w-full rounded-xl border-2 border-[#4B2E2B]/10 bg-white py-4 pl-12 pr-4 text-[#4B2E2B] transition-colors focus:border-[#D4A373] focus:outline-none"
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#4B2E2B]">{language === 'sw' ? 'Nywila' : 'Password'} *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border-2 border-[#4B2E2B]/10 bg-white py-4 pl-12 pr-12 text-[#4B2E2B] transition-colors focus:border-[#D4A373] focus:outline-none"
                  placeholder={language === 'sw' ? 'Weka nywila' : 'Enter password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4B2E2B]/40 transition-colors hover:text-[#D4A373]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#4B2E2B]">{language === 'sw' ? 'Thibitisha Nywila' : 'Confirm Password'} *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-xl border-2 border-[#4B2E2B]/10 bg-white py-4 pl-12 pr-4 text-[#4B2E2B] transition-colors focus:border-[#D4A373] focus:outline-none"
                  placeholder={language === 'sw' ? 'Rudia nywila' : 'Confirm password'}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm text-[#4B2E2B]">{text.businessType} *</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40" />
                <select
                  value={formData.businessType}
                  onChange={(event) => handleInputChange('businessType', event.target.value)}
                  className="w-full appearance-none rounded-xl border-2 border-[#4B2E2B]/10 bg-white py-4 pl-12 pr-4 text-[#4B2E2B] transition-colors focus:border-[#D4A373] focus:outline-none"
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
              <label className="mb-2 block text-sm text-[#4B2E2B]">{text.tradingVolume} *</label>
              <div className="relative">
                <TrendingUp className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40" />
                <select
                  value={formData.tradingVolume}
                  onChange={(event) => handleInputChange('tradingVolume', event.target.value)}
                  className="w-full appearance-none rounded-xl border-2 border-[#4B2E2B]/10 bg-white py-4 pl-12 pr-4 text-[#4B2E2B] transition-colors focus:border-[#D4A373] focus:outline-none"
                >
                  <option value="">{language === 'sw' ? 'Chagua kiasi' : 'Select volume'}</option>
                  <option value="0-5">0-5 {language === 'sw' ? 'mizigo' : 'loads'}</option>
                  <option value="5-10">5-10 {language === 'sw' ? 'mizigo' : 'loads'}</option>
                  <option value="10-20">10-20 {language === 'sw' ? 'mizigo' : 'loads'}</option>
                  <option value="20+">20+ {language === 'sw' ? 'mizigo' : 'loads'}</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7EFE9]">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#D4A373]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#4B2E2B]/5 blur-3xl" />

      <div className="relative flex min-h-screen">
        <div className="relative hidden overflow-hidden lg:block lg:w-1/2">
          <div className="absolute inset-0">
            <ImageWithFallback src={group} alt="Freight shipping" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#4B2E2B]/80 via-[#4B2E2B]/60 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 space-y-4 p-8">
            {text.features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4A373]">
                    {index === 0 && <Shield className="h-5 w-5 text-white" />}
                    {index === 1 && <MapPin className="h-5 w-5 text-white" />}
                    {index === 2 && <Package className="h-5 w-5 text-white" />}
                  </div>
                  <div>
                    <div className="font-medium text-white">{feature.title}</div>
                    <div className="text-sm text-white/70">{feature.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 right-8 flex gap-2">
            <div className="h-2 w-2 rounded-full bg-[#D4A373]" />
            <div className="h-2 w-2 rounded-full bg-white/40" />
            <div className="h-2 w-2 rounded-full bg-white/40" />
          </div>
        </div>

        <div className="flex w-full items-center justify-center p-4 md:p-8 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <Link to="/" className="text-3xl text-[#4B2E2B]">
                  ELOGISTICA
                </Link>
                <button
                  onClick={() => setLanguage(language === 'sw' ? 'en' : 'sw')}
                  className="rounded-full p-2 transition-colors hover:bg-white"
                >
                  <Globe className="h-6 w-6 text-[#4B2E2B]" />
                </button>
              </div>

              <h1 className="mb-2 text-3xl text-[#4B2E2B] md:text-4xl">{text.title}</h1>
              <p className="text-[#4B2E2B]/60">{text.subtitle}</p>
            </div>

            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-1 items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white ${
                        currentStep >= step ? 'bg-[#4B2E2B]' : 'bg-[#E0E0E0]'
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`mx-2 h-1 flex-1 ${currentStep > step ? 'bg-[#4B2E2B]' : 'bg-[#E0E0E0]'}`} />
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

            <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg md:p-8">
              {renderStepContent()}
            </div>

            {error && <div className="mb-4 text-center text-sm text-red-600">{error}</div>}

            <div className="flex gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#4B2E2B]/20 bg-white py-4 text-[#4B2E2B] transition-colors hover:border-[#4B2E2B]/40"
                >
                  <ArrowLeft className="h-5 w-5" />
                  {text.previous}
                </button>
              )}
              <button
                onClick={currentStep === 3 ? handleSubmit : handleNext}
                disabled={isSubmitting || !canProceed}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4B2E2B] to-[#3a2422] py-4 text-white shadow-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (language === 'sw' ? 'Inatuma...' : 'Submitting...') : currentStep === 3 ? text.submit : text.next}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-[#4B2E2B]/60">
              {text.alreadyHaveAccount}{' '}
              <Link to="/trader-login" className="text-[#4B2E2B] transition-colors hover:text-[#D4A373]">
                {text.signIn}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
