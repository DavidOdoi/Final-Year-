import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import truck from '../../assets/images/turck.png';

interface HeroSectionProps {
  language: 'sw' | 'en';
  onToggleLanguage: () => void;
}

export function HeroSection({ language }: HeroSectionProps) {
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
          src={truck}
          alt="Freight trucks on the highway"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl text-white">
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
            className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl"
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
      </div>
    </div>
  );
}
