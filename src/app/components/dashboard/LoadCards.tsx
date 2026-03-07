import { motion } from 'motion/react';
import { MapPin, Package, Calendar, DollarSign, ArrowRight, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface LoadCardsProps {
  language: 'sw' | 'en';
}

export function LoadCards({ language }: LoadCardsProps) {
  const content = {
    sw: {
      title: 'Mizigo Inayopatikana',
      subtitle: 'Chagua mzigo na uanze safari',
      accept: 'Kubali Mzigo',
      distance: 'Umbali',
      weight: 'Uzito',
      posted: 'Ilipostwa',
      loads: [
        {
          id: 1,
          from: 'Nairobi',
          to: 'Mombasa',
          cargo: 'General Goods',
          weight: '15 Tons',
          distance: '485 km',
          payout: 'KES 85,000',
          posted: '2 hours ago',
          urgent: true,
        },
        {
          id: 2,
          from: 'Kampala',
          to: 'Dar es Salaam',
          cargo: 'Construction Materials',
          weight: '20 Tons',
          distance: '1,150 km',
          payout: 'KES 165,000',
          posted: '5 hours ago',
          urgent: false,
        },
        {
          id: 3,
          from: 'Kigali',
          to: 'Nairobi',
          cargo: 'Agricultural Products',
          weight: '12 Tons',
          distance: '890 km',
          payout: 'KES 125,000',
          posted: '1 day ago',
          urgent: false,
        },
      ],
    },
    en: {
      title: 'Available Loads',
      subtitle: 'Select a load and start your trip',
      accept: 'Accept Load',
      distance: 'Distance',
      weight: 'Weight',
      posted: 'Posted',
      loads: [
        {
          id: 1,
          from: 'Nairobi',
          to: 'Mombasa',
          cargo: 'General Goods',
          weight: '15 Tons',
          distance: '485 km',
          payout: 'KES 85,000',
          posted: '2 hours ago',
          urgent: true,
        },
        {
          id: 2,
          from: 'Kampala',
          to: 'Dar es Salaam',
          cargo: 'Construction Materials',
          weight: '20 Tons',
          distance: '1,150 km',
          payout: 'KES 165,000',
          posted: '5 hours ago',
          urgent: false,
        },
        {
          id: 3,
          from: 'Kigali',
          to: 'Nairobi',
          cargo: 'Agricultural Products',
          weight: '12 Tons',
          distance: '890 km',
          payout: 'KES 125,000',
          posted: '1 day ago',
          urgent: false,
        },
      ],
    },
  };

  const text = content[language];

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl text-[#4B2E2B] mb-1">{text.title}</h2>
        <p className="text-sm text-[#4B2E2B]/60">{text.subtitle}</p>
      </div>

      {/* Load Cards */}
      <div className="space-y-4">
        {text.loads.map((load, index) => (
          <motion.div
            key={load.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group bg-white rounded-2xl overflow-hidden border border-[#4B2E2B]/10 shadow-sm hover:shadow-2xl transition-all duration-300"
          >
            <div className="grid md:grid-cols-3 gap-0">
              {/* Map Preview */}
              <div className="relative h-48 md:h-auto overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1735837864038-c035a3418188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZW55YSUyMHJvYWQlMjBtYXAlMjBHUFMlMjBuYXZpZ2F0aW9ufGVufDF8fHx8MTc3MjAxMjQzOHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Route map"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Route Indicator */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="text-sm">{load.from}</div>
                      <ArrowRight className="w-4 h-4 inline" />
                      <div className="text-sm inline ml-2">{load.to}</div>
                    </div>
                  </div>
                </div>

                {/* Urgent Badge */}
                {load.urgent && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-lg"
                  >
                    {language === 'sw' ? 'Haraka' : 'Urgent'}
                  </motion.div>
                )}
              </div>

              {/* Details */}
              <div className="md:col-span-2 p-6">
                <div className="flex flex-col h-full">
                  {/* Top Section */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl text-[#4B2E2B] mb-1">{load.cargo}</h3>
                        <div className="flex items-center gap-2 text-sm text-[#4B2E2B]/60">
                          <Clock className="w-4 h-4" />
                          <span>{text.posted} {load.posted}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-[#D4A373]">{load.payout}</div>
                        <div className="text-xs text-[#4B2E2B]/60">{language === 'sw' ? 'Malipo' : 'Payout'}</div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-[#4B2E2B]/70">
                        <MapPin className="w-4 h-4 text-[#D4A373]" />
                        <div>
                          <div className="text-xs text-[#4B2E2B]/60">{text.distance}</div>
                          <div className="text-sm">{load.distance}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[#4B2E2B]/70">
                        <Package className="w-4 h-4 text-[#D4A373]" />
                        <div>
                          <div className="text-xs text-[#4B2E2B]/60">{text.weight}</div>
                          <div className="text-sm">{load.weight}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accept Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#D4A373] to-[#4B2E2B] text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow group"
                  >
                    <span>{text.accept}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}