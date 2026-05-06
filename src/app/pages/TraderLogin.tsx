import { useEffect, useState } from 'react';
import loginImage from '../../assets/images/login.webp';
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Globe,
  CheckCircle2,
  LogIn,
} from 'lucide-react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuth } from '../lib/authContext';

export default function TraderLogin() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, user, currentRole, logout } = useAuth();
  const registeredEmail = searchParams.get('email') || '';
  const showRegisteredMessage = searchParams.get('registered') === '1';

  const content = {
    sw: {
      title: 'Karibu Tena',
      subtitle: 'Ingia kwenye akaunti yako',
      email: 'Barua Pepe',
      password: 'Nywila',
      forgotPassword: 'Umesahau nywila?',
      login: 'Ingia',
      noAccount: 'Huna akaunti?',
      register: 'Jisajili',
      loggingIn: 'Inaingia...',
      stats: [
        { value: '5,000+', label: 'Wapelekaji Wameridhika' },
        { value: '10,000+', label: 'Mizigo Imesafirishwa' },
        { value: '99.8%', label: 'Kiwango cha Mafanikio' },
      ],
      features: [
        'Fuatilia Mizigo Wakati Wote',
        'Madereva wa Kuaminika',
        'Malipo Salama',
      ],
      accountCreated: 'Akaunti imeundwa. Ingia sasa kwa kutumia taarifa ulizoweka.',
    },
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your account',
      email: 'Email Address',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      login: 'Sign In',
      noAccount: "Don't have an account?",
      register: 'Register',
      loggingIn: 'Signing in...',
      stats: [
        { value: '5,000+', label: 'Happy Shippers' },
        { value: '10,000+', label: 'Loads Delivered' },
        { value: '99.8%', label: 'Success Rate' },
      ],
      features: [
        'Track Shipments 24/7',
        'Verified Drivers',
        'Secure Payments',
      ],
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

  // If a driver session is open, clear it so they can log in as a trader
  useEffect(() => {
    if (isAuthenticated && user && user.role === 'driver') {
      logout();
    }
  }, [isAuthenticated, user, logout]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await login(email, password, 'shipper');
      navigate('/trader-dashboard', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // Already authenticated as a trader — skip the login page entirely
  if (isAuthenticated && user && user.role === 'shipper') {
    return <Navigate to="/trader-dashboard" replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7EFE9]">
      <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-[#D4A373]/20 blur-3xl" />
      <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-[#4B2E2B]/10 blur-3xl" />

      <div className="relative flex min-h-screen">
        <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
          <div className="absolute inset-0">
            <ImageWithFallback
              src={loginImage}
              alt="ELOGISTICA Platform"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#4B2E2B]/90 via-[#4B2E2B]/70 to-[#4B2E2B]/50" />
          </div>

          <div className="relative z-10 flex flex-col justify-between p-12 text-white">
            <div className="text-4xl">ELOGISTICA</div>

            <div>
              <h2 className="mb-4 text-5xl">
                {language === 'sw' ? 'Simamia Biashara Yako' : 'Manage Your Business'}
              </h2>
              <p className="mb-12 text-xl text-white/80">
                {language === 'sw'
                  ? 'Jifunze jinsi maelfu ya wafanyabiashara wanavyotumia Usafirishaji kusafirisha mizigo yao.'
                  : 'Join thousands of businesses using ELOGISTICA to ship their goods across Uganda.'}
              </p>

              <div className="mb-12 space-y-4">
                {text.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4A373]">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6">
                {text.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
                  >
                    <div className="mb-1 text-3xl text-[#D4A373]">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="h-2 w-8 rounded-full bg-[#D4A373]" />
              <div className="h-2 w-2 rounded-full bg-white/40" />
              <div className="h-2 w-2 rounded-full bg-white/40" />
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center p-4 md:p-8 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <Link to="/" className="text-3xl text-[#4B2E2B] lg:hidden">
                  ELOGISTICA
                </Link>
                <button
                  onClick={() => setLanguage(language === 'sw' ? 'en' : 'sw')}
                  className="rounded-full bg-white p-3 text-[#4B2E2B] shadow-lg transition-colors hover:bg-white/80"
                >
                  <Globe className="h-6 w-6" />
                </button>
              </div>

              <div>
                <h1 className="mb-3 text-4xl text-[#4B2E2B] md:text-5xl">{text.title}</h1>
                <p className="text-lg text-[#4B2E2B]/60">{text.subtitle}</p>
              </div>
            </div>

            <form
              onSubmit={handleLogin}
              className="relative mb-6 overflow-hidden rounded-3xl bg-white p-8 shadow-2xl"
            >
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#4B2E2B] via-[#D4A373] to-[#4B2E2B]" />

              <div className="space-y-6">
                {showRegisteredMessage && (
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {text.accountCreated}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm text-[#4B2E2B]">{text.email} *</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40 group-focus-within:text-[#D4A373]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-xl border-2 border-transparent bg-[#F7EFE9] py-4 pl-12 pr-4 text-[#4B2E2B] focus:border-[#D4A373] focus:bg-white focus:outline-none"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#4B2E2B]">{text.password} *</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E2B]/40 group-focus-within:text-[#D4A373]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-xl border-2 border-transparent bg-[#F7EFE9] py-4 pl-12 pr-14 text-[#4B2E2B] focus:border-[#D4A373] focus:bg-white focus:outline-none"
                      placeholder="********"
                      required
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

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-[#4B2E2B] transition-colors hover:text-[#D4A373]"
                  >
                    {text.forgotPassword}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4B2E2B] to-[#3a2422] py-4 text-white shadow-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
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
              </div>

              {error && <div className="mt-4 text-center text-sm text-red-600">{error}</div>}
            </form>

            <div className="text-center">
              <p className="text-[#4B2E2B]/60">
                {text.noAccount}{' '}
                <Link to="/trader-register" className="inline-flex items-center gap-1 text-[#4B2E2B] transition-colors hover:text-[#D4A373]">
                  <span>{text.register}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 lg:hidden">
              {text.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white p-4 text-center shadow-lg">
                  <div className="mb-1 text-xl text-[#4B2E2B]">{stat.value}</div>
                  <div className="text-xs text-[#4B2E2B]/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}