import { motion } from 'motion/react';
import { ArrowRight, Truck, Package } from 'lucide-react';
import { Link } from 'react-router';

interface CTASectionProps {
  language: 'sw' | 'en';
}

export function CTASection({ language }: CTASectionProps) {
  const content = {
    sw: {
      title: 'Tayari Kuanza Safari Yako?',
      subtitle: 'Jiunge na maelfu ya wafanyabiashara na madereva wanaotumia Safirisha kila siku',
      shipperButton: 'Anza Kusafirisha',
      driverButton: 'Jiunge Kama Dereva',
      shipperBenefit: 'Pata madereva wa kuaminika kwa dakika',
      driverBenefit: 'Pata kazi zaidi, malipo kwa wakati',
    },
    en: {
      title: 'Ready to Start Your Journey?',
      subtitle: 'Join thousands of businesses and drivers using Safirisha every day',
      shipperButton: 'Start Shipping',
      driverButton: 'Join as Driver',
      shipperBenefit: 'Get reliable drivers in minutes',
      driverBenefit: 'Get more jobs, timely payments',
    },
  };

  const text = content[language];

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl mb-4">{text.title}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{text.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Shipper Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-green-400/50 transition-all"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-2xl mb-3">{language === 'sw' ? 'Wapelekaji' : 'For Shippers'}</h3>
            <p className="text-gray-300 mb-6">{text.shipperBenefit}</p>
            <Link to="/trader-register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors group"
              >
                {text.shipperButton}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Driver Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-orange-400/50 transition-all"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl mb-3">{language === 'sw' ? 'Madereva' : 'For Drivers'}</h3>
            <p className="text-gray-300 mb-6">{text.driverBenefit}</p>
            <Link to="/driver-dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors group"
              >
                {text.driverButton}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}