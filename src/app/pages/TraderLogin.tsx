import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff,
  Globe,
  Sparkles,
  TrendingUp,
  Users,
  Package,
  CheckCircle2,
  LogIn
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function TraderLogin() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const navigate = useNavigate();

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
      loginFailed: 'Imeshindikana kuingia. Angalia taarifa zako.',
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
      loginFailed: 'Login failed. Please check your credentials.',
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
    },
  };

  const text = content[language];

  const images = [
    'https://images.unsplash.com/photo-1764169689207-e23fb66e1fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWwlMjBjb25maWRlbnR8ZW58MXx8fHwxNzcyNDQxMTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1766171359875-73155eff7f66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBkYXNoYm9hcmQlMjBjb21wdXRlciUyMHNjcmVlbnxlbnwxfHx8fDE3NzI0NDExODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1669333490889-194e8f46a766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YSUyMG5haXJvYmklMjBjaXR5JTIwc2t5bGluZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MjQ0MTE4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Generate floating elements
  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setFloatingElements(elements);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || text.loginFailed);
      }

      if (data?.data?.token) {
        localStorage.setItem('auth_token', data.data.token);
      }
      if (data?.data?.user) {
        localStorage.setItem('auth_user', JSON.stringify(data.data.user));
      }

      navigate('/trader-dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : text.loginFailed);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7EFE9] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              x: [element.x + '%', (element.x + 10) + '%', element.x + '%'],
              y: [element.y + '%', (element.y + 10) + '%', element.y + '%'],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: element.delay,
            }}
            className="absolute"
          >
            <div className="w-2 h-2 bg-[#D4A373]/30 rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Large gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-48 -left-48 w-96 h-96 bg-[#D4A373]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-48 -right-48 w-96 h-96 bg-[#4B2E2B]/10 rounded-full blur-3xl"
      />

      <div className="relative min-h-screen flex">
        {/* Left Side - Image Showcase */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotate: -2 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={images[currentImageIndex]}
                alt="Safirisha Platform"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#4B2E2B]/90 via-[#4B2E2B]/70 to-[#4B2E2B]/50" />
            </motion.div>
          </AnimatePresence>

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col justify-between p-12 text-white">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl"
            >
              Safirisha
            </motion.div>

            {/* Center Content */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl mb-4"
              >
                {language === 'sw' ? 'Simamia Biashara Yako' : 'Manage Your Business'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-white/80 mb-12"
              >
                {language === 'sw' 
                  ? 'Jifunze jinsi maelfu ya wafanyabiashara wanavyotumia Safirisha kusafirisha mizigo yao.'
                  : 'Join thousands of businesses using Safirisha to ship their goods across East Africa.'}
              </motion.p>

              {/* Features List */}
              <div className="space-y-4 mb-12">
                {text.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-[#D4A373] rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {text.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                  >
                    <div className="text-3xl text-[#D4A373] mb-1">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image Indicators */}
            <div className="flex gap-2">
              {images.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: currentImageIndex === index ? 1.2 : 1,
                    width: currentImageIndex === index ? '32px' : '8px',
                  }}
                  className={`h-2 rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-[#D4A373]' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
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
                    className="text-3xl text-[#4B2E2B] lg:hidden"
                  >
                    Safirisha
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLanguage(language === 'sw' ? 'en' : 'sw')}
                  className="p-3 bg-white hover:bg-white/80 rounded-full transition-colors shadow-lg"
                >
                  <Globe className="w-6 h-6 text-[#4B2E2B]" />
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-5xl text-[#4B2E2B] mb-3">
                  {text.title}
                </h1>
                <p className="text-lg text-[#4B2E2B]/60">
                  {text.subtitle}
                </p>
              </motion.div>
            </div>

            {/* Login Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleLogin}
              className="bg-white rounded-3xl p-8 shadow-2xl mb-6 relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4B2E2B] via-[#D4A373] to-[#4B2E2B]" />

              <div className="space-y-6">
                {/* Email Input */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <label className="block text-sm text-[#4B2E2B] mb-2">
                    {text.email} *
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40 group-focus-within:text-[#D4A373] transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </motion.div>

                {/* Password Input */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <label className="block text-sm text-[#4B2E2B] mb-2">
                    {text.password} *
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B2E2B]/40 group-focus-within:text-[#D4A373] transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-14 py-4 bg-[#F7EFE9] border-2 border-transparent rounded-xl focus:border-[#D4A373] focus:bg-white focus:outline-none transition-all text-[#4B2E2B]"
                      placeholder="••••••••"
                      required
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4B2E2B]/40 hover:text-[#D4A373] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <motion.button
                    type="button"
                    whileHover={{ x: 3 }}
                    className="text-sm text-[#4B2E2B] hover:text-[#D4A373] transition-colors"
                  >
                    {text.forgotPassword}
                  </motion.button>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#4B2E2B] to-[#3a2422] text-white rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <LogIn className="w-5 h-5" />
                      </motion.div>
                      {text.loggingIn}
                    </>
                  ) : (
                    <>
                      {text.login}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                  
                  {/* Shimmer effect */}
                  {!isLoading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.button>
              </div>

              {error && (
                <div className="mt-4 text-center text-sm text-red-600">{error}</div>
              )}

              {/* Sparkle decorations */}
              <motion.div
                animate={{
                  rotate: [0, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2 text-[#D4A373]"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <motion.div
                animate={{
                  rotate: [0, -10, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -left-2 text-[#D4A373]/50"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </motion.form>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-[#4B2E2B]/60">
                {text.noAccount}{' '}
                <Link to="/trader-register">
                  <motion.span
                    whileHover={{ x: 3 }}
                    className="text-[#4B2E2B] hover:text-[#D4A373] transition-colors inline-flex items-center gap-1"
                  >
                    {text.register}
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </p>
            </motion.div>

            {/* Mobile Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:hidden grid grid-cols-3 gap-3 mt-8"
            >
              {text.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-white rounded-2xl p-4 shadow-lg text-center"
                >
                  <div className="text-xl text-[#4B2E2B] mb-1">{stat.value}</div>
                  <div className="text-xs text-[#4B2E2B]/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#4B2E2B]/20 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-[#D4A373] border-t-transparent rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
