import { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';

interface NavigationProps {
  language: 'sw' | 'en';
  onToggleLanguage: () => void;
}

export function Navigation({ language, onToggleLanguage }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    sw: {
      logo: 'Safirisha',
      menu: [
        { label: 'Nyumbani', href: '#hero' },
        { label: 'Huduma', href: '#services' },
        { label: 'Jinsi Inavyofanya', href: '#how-it-works' },
        { label: 'Mapitio', href: '#reviews' },
        { label: 'Timu', href: '#team' },
        { label: 'Wasiliana', href: '#contact' },
      ],
      cta: 'Anza Sasa',
      driverLogin: 'Ingia - Dereva',
    },
    en: {
      logo: 'Safirisha',
      menu: [
        { label: 'Home', href: '#hero' },
        { label: 'Services', href: '#services' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Reviews', href: '#reviews' },
        { label: 'Team', href: '#team' },
        { label: 'Contact', href: '#contact' },
      ],
      cta: 'Get Started',
      driverLogin: 'Driver Login',
    },
  };

  const text = content[language];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            {text.logo}
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {text.menu.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-orange-600 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Languages className="w-5 h-5" />
              <span className="hidden sm:inline">{language === 'sw' ? 'EN' : 'SW'}</span>
            </button>

            <Link
              to="/driver-dashboard"
              className="hidden md:block text-orange-600 hover:text-orange-700 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-50 transition-all"
            >
              {text.driverLogin}
            </Link>

            <button className="hidden lg:block bg-gradient-to-r from-green-600 to-orange-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-shadow">
              {text.cta}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {text.menu.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="w-full bg-gradient-to-r from-green-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow">
                {text.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}