import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  User,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BACKEND_URL, clearStoredSession, getAuthToken, getStoredUser } from '../lib/api';
import truckImage from '../../assets/images/turck.webp';

export default function DriverRegister() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const content = {
    sw: {
      eyebrow: 'Usajili wa Dereva',
      title: 'Unda Akaunti ya Dereva',
      subtitle: 'Jiunge na ELOGISTICA kama dereva na uanze kuona mizigo, safari, na mapato yako.',
      name: 'Jina Kamili',
      email: 'Barua Pepe',
      phone: 'Namba ya Simu',
      location: 'Mji / Kituo',
      password: 'Nywila',
      confirmPassword: 'Thibitisha Nywila',
      submit: 'Tengeneza Akaunti',
      submitting: 'Inatengeneza akaunti...',
      registerFailed: 'Imeshindikana kuunda akaunti ya dereva. Jaribu tena.',
      requiredError: 'Tafadhali jaza taarifa zote muhimu.',
      passwordShort: 'Nywila lazima iwe na angalau herufi 6.',
      passwordMismatch: 'Nywila hazifanani.',
      haveAccount: 'Una akaunti tayari?',
      login: 'Ingia',
      highlights: [
        'Kubali mizigo inayokufaa haraka.',
        'Simamia safari na maendeleo ya uwasilishaji.',
        'Fuatilia malipo na nyaraka zako kwenye dashibodi.',
      ],
    },
    en: {
      eyebrow: 'Driver Registration',
      title: 'Create a Driver Account',
      subtitle: 'Join ELOGISTICA as a driver and start seeing loads, trips, and earnings.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'City / Home Base',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submit: 'Create Account',
      submitting: 'Creating account...',
      registerFailed: 'Failed to create your driver account. Please try again.',
      requiredError: 'Please fill in all required details.',
      passwordShort: 'Password must be at least 6 characters.',
      passwordMismatch: 'Passwords do not match.',
      haveAccount: 'Already have an account?',
      login: 'Sign in',
      highlights: [
        'Accept matching open loads quickly.',
        'Manage trip progress and deliveries.',
        'Track payouts and documents from one dashboard.',
      ],
    },
  };

  const text = content[language];

  useEffect(() => {
    const token = getAuthToken('driver');
    const user = getStoredUser('driver');

    if (!token || !user) {
      return;
    }

    if (user.role === 'driver') {
      navigate('/driver-dashboard', { replace: true });
    }
  }, [navigate]);

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.location.trim()) {
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          password,
          role: 'driver',
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

      navigate(`/driver/login?${nextSearch.toString()}`, { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : text.registerFailed;
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7EFE9]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_0.95fr]">
        <div className="relative hidden overflow-hidden lg:block">
          <ImageWithFallback src={truckImage} alt="Driver registration banner" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2E1B19]/90 via-[#4B2E2B]/80 to-[#D4A373]/55" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
            <div>
              <div className="text-4xl">ELOGISTICA</div>
              <div className="mt-3 text-sm uppercase tracking-[0.3em] text-white/70">{text.eyebrow}</div>
            </div>

            <div>
              <h2 className="max-w-xl text-5xl leading-tight">
                {language === 'sw'
                  ? 'Tengeneza akaunti na uanze kazi za usafirishaji.'
                  : 'Create your account and start taking freight jobs.'}
              </h2>
              <div className="mt-10 space-y-4">
                {text.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white/90 backdrop-blur-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-[#D4A373] p-2.5 text-white">
                        <Truck className="h-5 w-5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/70">
              <ShieldCheck className="h-4 w-4 text-[#D4A373]" />
              <span>{language === 'sw' ? 'Akaunti mpya ya dereva huanzishwa hapa.' : 'New driver accounts are created here.'}</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#D4A373]/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#4B2E2B]/10 blur-3xl" />
          </div>

          <div className="relative w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <Link to="/" className="text-3xl text-[#4B2E2B] lg:hidden">
                ELOGISTICA
              </Link>
              <button
                onClick={() => setLanguage(language === 'sw' ? 'en' : 'sw')}
                className="ml-auto rounded-full bg-[#F7EFE9] p-3 text-[#4B2E2B] transition-colors hover:bg-[#EDDCD1]"
              >
                <Globe className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-8">
              <div className="text-sm uppercase tracking-[0.3em] text-[#D4A373]">{text.eyebrow}</div>
              <h1 className="mt-3 text-4xl text-[#4B2E2B]">{text.title}</h1>
              <p className="mt-3 text-sm text-[#4B2E2B]/65">{text.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm text-[#4B2E2B]">{text.name}</span>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/35" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-transparent bg-[#F7EFE9] py-4 pl-12 pr-4 text-[#4B2E2B] outline-none transition-colors focus:border-[#D4A373] focus:bg-white"
                    placeholder={language === 'sw' ? 'Mfano: Jane Nankya' : 'Example: Jane Nankya'}
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]">{text.email}</span>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/35" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-transparent bg-[#F7EFE9] py-4 pl-12 pr-4 text-[#4B2E2B] outline-none transition-colors focus:border-[#D4A373] focus:bg-white"
                    placeholder="you@example.com"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]">{text.phone}</span>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/35" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-transparent bg-[#F7EFE9] py-4 pl-12 pr-4 text-[#4B2E2B] outline-none transition-colors focus:border-[#D4A373] focus:bg-white"
                    placeholder="+256 700 000000"
                  />
                </div>
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm text-[#4B2E2B]">{text.location}</span>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/35" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(event) => updateField('location', event.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-transparent bg-[#F7EFE9] py-4 pl-12 pr-4 text-[#4B2E2B] outline-none transition-colors focus:border-[#D4A373] focus:bg-white"
                    placeholder="Kampala, Uganda"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]">{text.password}</span>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/35" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-transparent bg-[#F7EFE9] py-4 pl-12 pr-4 text-[#4B2E2B] outline-none transition-colors focus:border-[#D4A373] focus:bg-white"
                    placeholder="********"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]">{text.confirmPassword}</span>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/35" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-transparent bg-[#F7EFE9] py-4 pl-12 pr-4 text-[#4B2E2B] outline-none transition-colors focus:border-[#D4A373] focus:bg-white"
                    placeholder="********"
                  />
                </div>
              </label>

              {error && <div className="md:col-span-2 text-sm text-red-600">{error}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="md:col-span-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4B2E2B] to-[#2D1B19] px-4 py-4 text-white shadow-lg disabled:opacity-70"
              >
                <span>{isSubmitting ? text.submitting : text.submit}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-[#4B2E2B]/65">
              {text.haveAccount}{' '}
              <Link to="/driver/login" className="text-[#4B2E2B] transition-colors hover:text-[#D4A373]">
                {text.login}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
