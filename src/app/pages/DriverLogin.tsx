import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Globe,
  Lock,
  LogIn,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Wallet,
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuth } from '../lib/authContext';
import truckImage from '../../assets/images/turck.webp';

export default function DriverLogin() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, user, logout } = useAuth();
  const registeredEmail = searchParams.get('email') || '';
  const showRegisteredMessage = searchParams.get('registered') === '1';

  const content = {
    sw: {
      eyebrow: 'Portal ya Dereva',
      title: 'Karibu Tena',
      subtitle: 'Ingia kwenye akaunti yako ya dereva ili uone mizigo na safari zako.',
      email: 'Barua Pepe',
      password: 'Nywila',
      login: 'Ingia Kama Dereva',
      loggingIn: 'Inaingia...',
      noAccount: 'Huna akaunti ya dereva?',
      register: 'Jisajili',
      features: [
        { icon: Truck, title: 'Mizigo Mpya', description: 'Ona mizigo inayokufaa na ukubali kazi upesi.' },
        { icon: Wallet, title: 'Malipo', description: 'Fuatilia mapato yako na maombi ya malipo.' },
        { icon: MapPin, title: 'Safari', description: 'Simamia safari na hatua za uwasilishaji.' },
      ],
      trusted: 'Madereva waliothibitishwa huingia hapa kila siku.',
      accountCreated: 'Akaunti imeundwa. Ingia sasa kwa kutumia taarifa ulizoweka.',
    },
    en: {
      eyebrow: 'Driver Portal',
      title: 'Welcome Back',
      subtitle: 'Sign in to your driver account to view loads, trips, and earnings.',
      email: 'Email Address',
      password: 'Password',
      login: 'Sign In as Driver',
      loggingIn: 'Signing in...',
      noAccount: "Don't have a driver account?",
      register: 'Register',
      features: [
        { icon: Truck, title: 'Fresh Loads', description: 'See matching open loads and accept work quickly.' },
        { icon: Wallet, title: 'Earnings', description: 'Track payouts, balances, and trip income.' },
        { icon: MapPin, title: 'Trips', description: 'Manage active trips and delivery progress.' },
      ],
      trusted: 'Verified drivers use this workspace every day.',
      accountCreated: 'Account created successfully. Sign in now with the credentials you registered.',
    },
  };

  const text = content[language];

  useEffect(() => {
    if (!registeredEmail) {
      return;
    }

    setEmail((current) => current || registeredEmail);
  }, [registeredEmail]);

  useEffect(() => {
    // If user is authenticated as a shipper, log them out so they can log in as a driver
    if (isAuthenticated && user && user.role === 'shipper') {
      logout();
      return;
    }

    // If user is already authenticated as a driver, redirect to driver dashboard
    if (isAuthenticated && user && user.role === 'driver') {
      navigate('/driver-dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate, user, logout]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    try {
      await login(email, password, 'driver');
    } catch (err) {
      console.error('Login error:', err);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7EFE9]">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden overflow-hidden lg:block">
          <ImageWithFallback src={truckImage} alt="Driver on freight route" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#221716]/90 via-[#4B2E2B]/80 to-[#D4A373]/45" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
            <div>
              <div className="text-4xl">SIMBA</div>
              <div className="mt-3 text-sm uppercase tracking-[0.3em] text-white/70">{text.eyebrow}</div>
            </div>

            <div>
              <h2 className="max-w-xl text-5xl leading-tight">
                {language === 'sw' ? 'Ingia na uanze safari zako za kazi.' : 'Sign in and keep your freight work moving.'}
              </h2>
              <p className="mt-5 max-w-lg text-lg text-white/80">{text.trusted}</p>

              <div className="mt-10 space-y-4">
                {text.features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-[#D4A373] p-3 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-lg">{feature.title}</div>
                          <div className="mt-1 text-sm text-white/70">{feature.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/70">
              <ShieldCheck className="h-4 w-4 text-[#D4A373]" />
              <span>{language === 'sw' ? 'Salama kwa akaunti za dereva' : 'Secure access for driver accounts'}</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#D4A373]/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#4B2E2B]/10 blur-3xl" />
          </div>

          <div className="relative w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <Link to="/" className="text-3xl text-[#4B2E2B] lg:hidden">
                SIMBA
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

            <form onSubmit={handleLogin} className="space-y-5">
              {showRegisteredMessage && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {text.accountCreated}
                </div>
              )}

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]">{text.email}</span>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/35" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-transparent bg-[#F7EFE9] py-4 pl-12 pr-4 text-[#4B2E2B] outline-none transition-colors focus:border-[#D4A373] focus:bg-white"
                    placeholder="you@example.com"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]">{text.password}</span>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/35" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-transparent bg-[#F7EFE9] py-4 pl-12 pr-14 text-[#4B2E2B] outline-none transition-colors focus:border-[#D4A373] focus:bg-white"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4B2E2B]/40 transition-colors hover:text-[#D4A373]"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4B2E2B] to-[#2D1B19] px-4 py-4 text-white shadow-lg disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>{text.loggingIn}</span>
                  </>
                ) : (
                  <>
                    <span>{text.login}</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-[#4B2E2B]/65">
              {text.noAccount}{' '}
              <Link to="/driver/register" className="text-[#4B2E2B] transition-colors hover:text-[#D4A373]">
                {text.register}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
