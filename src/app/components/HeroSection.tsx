import { Languages } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Link } from 'react-router';

interface HeroSectionProps {
  language: 'sw' | 'en';
  onToggleLanguage: () => void;
}

export function HeroSection({ language, onToggleLanguage }: HeroSectionProps) {
  const content = {
    sw: {
      headline: 'Safirisha Mizigo Kwa Urahisi',
      subheadline: 'Unganisha na madereva wa mizigo kwa haraka na usalama katika Afrika Mashariki',
      shipperCTA: 'Shipper Register',
      driverCTA: 'Driver Register',
    },
    en: {
      headline: 'Transport Goods Easily',
      subheadline: 'Connect with freight drivers quickly and safely across East Africa',
      shipperCTA: 'Shipper Register',
      driverCTA: 'Driver Register',
    },
  };

  const text = content[language];

  return (
    <div id="hero" className="relative min-h-[600px] md:min-h-[700px] overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1623762399556-78d289e12c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb3VudCUyMEtpbGltYW5qYXJvJTIwc2F2YW5uYWglMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcxODQwNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mount Kilimanjaro and savannah landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-orange-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl mb-6"
            >
              {text.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl mb-8 text-white/90"
            >
              {text.subheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/trader-register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition-colors shadow-lg text-lg"
                >
                  {text.shipperCTA}
                </motion.button>
              </Link>
              <Link to="/driver-dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg transition-colors shadow-lg text-lg"
                >
                  {text.driverCTA}
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Driver Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1563558055993-34e0a8d9322c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdHJ1Y2slMjBkcml2ZXIlMjBzbWlsaW5nfGVufDF8fHx8MTc3MTg0MDQ3NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="African truck driver"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}