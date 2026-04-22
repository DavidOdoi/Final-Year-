import { motion } from 'motion/react';
import { MapPin, Navigation, Clock } from 'lucide-react';

interface TrackingMapProps {
  language: 'sw' | 'en';
}

export function TrackingMap({ language }: TrackingMapProps) {
  const content = {
    sw: {
      title: 'Ufuatiliaji wa Moja kwa Moja',
      shipment: 'Usafirishaji #SH-2401',
      currentLocation: 'Karibu na Busia, KE',
      eta: 'ETA: Masaa 4',
      speed: 'Kasi: 65 km/h',
    },
    en: {
      title: 'Live Tracking',
      shipment: 'Shipment #SH-2401',
      currentLocation: 'Near Busia, KE',
      eta: 'ETA: 4 hours',
      speed: 'Speed: 65 km/h',
    },
  };

  const text = content[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#4B2E2B]/5"
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl text-[#4B2E2B] mb-1">{text.title}</h3>
        <div className="text-sm text-[#4B2E2B]/60">{text.shipment}</div>
      </div>

      {/* Map Preview */}
      <div className="relative w-full h-64 bg-gradient-to-br from-[#F7EFE9] to-[#E8DDD0] rounded-xl overflow-hidden mb-4">
        {/* Simulated Map Background */}
        <div className="absolute inset-0">
          {/* Grid Lines */}
          <svg className="w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4B2E2B" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M 50 180 Q 120 140, 180 120 T 280 80"
            fill="none"
            stroke="#D4A373"
            strokeWidth="3"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Start Point */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute left-12 bottom-12 w-4 h-4 bg-[#4B2E2B] rounded-full border-4 border-white shadow-lg"
        >
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-[#4B2E2B] whitespace-nowrap">
            Nairobi
          </div>
        </motion.div>

        {/* End Point */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute right-12 top-12 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-[#4B2E2B] whitespace-nowrap">
            Kampala
          </div>
        </motion.div>

        {/* Moving Truck */}
        <motion.div
          initial={{ left: '12%', bottom: '12%' }}
          animate={{ 
            left: ['12%', '40%', '60%'],
            bottom: ['12%', '50%', '70%']
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="relative"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#D4A373] to-[#4B2E2B] rounded-lg flex items-center justify-center shadow-lg">
              <Navigation className="w-4 h-4 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-[#D4A373] rounded-lg"
            />
          </motion.div>
        </motion.div>

        {/* Location Markers */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="absolute w-2 h-2 bg-[#4B2E2B] rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Info Cards */}
      <div className="space-y-2">
        <motion.div
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 p-3 bg-[#F7EFE9] rounded-xl"
        >
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#D4A373]" />
          </div>
          <div>
            <div className="text-xs text-[#4B2E2B]/60">Current Location</div>
            <div className="text-sm text-[#4B2E2B]">{text.currentLocation}</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 p-3 bg-[#F7EFE9] rounded-xl"
          >
            <Clock className="w-4 h-4 text-[#4B2E2B]" />
            <div className="text-xs text-[#4B2E2B]">{text.eta}</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 p-3 bg-[#F7EFE9] rounded-xl"
          >
            <Navigation className="w-4 h-4 text-[#4B2E2B]" />
            <div className="text-xs text-[#4B2E2B]">{text.speed}</div>
          </motion.div>
        </div>
      </div>

      {/* Status Indicator */}
      <motion.div
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-6 right-6 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs"
      >
        <div className="w-2 h-2 bg-white rounded-full" />
        Live
      </motion.div>
    </motion.div>
  );
}



