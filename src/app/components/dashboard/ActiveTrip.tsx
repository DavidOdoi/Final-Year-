import { motion } from 'motion/react';
import { MapPin, Phone, Navigation, Clock } from 'lucide-react';

interface ActiveTripProps {
  language: 'sw' | 'en';
}

export function ActiveTrip({ language }: ActiveTripProps) {
  const content = {
    sw: {
      title: 'Safari ya Kazi',
      from: 'Nairobi',
      to: 'Mombasa',
      cargo: 'Electronics',
      progress: 65,
      eta: 'ETA: 3 saa 45 dakika',
      contact: 'Wasiliana na Mteja',
      navigate: 'Anza Usafiri',
      status: 'Njiani',
    },
    en: {
      title: 'Active Trip',
      from: 'Nairobi',
      to: 'Mombasa',
      cargo: 'Electronics',
      progress: 65,
      eta: 'ETA: 3hrs 45min',
      contact: 'Contact Customer',
      navigate: 'Start Navigation',
      status: 'In Transit',
    },
  };

  const text = content[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 border border-[#4B2E2B]/10 shadow-sm hover:shadow-xl transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-[#4B2E2B]">{text.title}</h3>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full"
        >
          {text.status}
        </motion.div>
      </div>

      {/* Route */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <div className="text-[#4B2E2B]">{text.from}</div>
        </div>
        <div className="ml-1.5 border-l-2 border-dashed border-[#D4A373] h-8" />
        <div className="flex items-center gap-3">
          <MapPin className="w-3 h-3 text-red-500 fill-red-500" />
          <div className="text-[#4B2E2B]">{text.to}</div>
        </div>
      </div>

      {/* Cargo */}
      <div className="mb-6 p-3 bg-[#F7EFE9] rounded-xl">
        <div className="text-xs text-[#4B2E2B]/60 mb-1">Cargo</div>
        <div className="text-sm text-[#4B2E2B]">{text.cargo}</div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-[#4B2E2B]/60">{language === 'sw' ? 'Maendeleo' : 'Progress'}</div>
          <div className="text-sm text-[#4B2E2B]">{text.progress}%</div>
        </div>
        <div className="h-2 bg-[#F7EFE9] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${text.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#D4A373] to-[#4B2E2B] rounded-full relative"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute right-0 top-0 bottom-0 w-1 bg-white/50"
            />
          </motion.div>
        </div>
      </div>

      {/* ETA */}
      <div className="flex items-center gap-2 mb-6 text-[#4B2E2B]/70">
        <Clock className="w-4 h-4 text-[#D4A373]" />
        <span className="text-sm">{text.eta}</span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#D4A373] to-[#4B2E2B] text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-md"
        >
          <Navigation className="w-4 h-4" />
          <span className="text-sm">{text.navigate}</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#F7EFE9] text-[#4B2E2B] py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#4B2E2B]/10 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">{text.contact}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}


