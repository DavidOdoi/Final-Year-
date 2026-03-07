import { motion } from 'motion/react';
import { MapPin, Package, DollarSign, ArrowRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface ShipmentCardsProps {
  language: 'sw' | 'en';
}

export function ShipmentCards({ language }: ShipmentCardsProps) {
  const content = {
    sw: {
      title: 'Usafirishaji wa Hivi Karibuni',
      viewAll: 'Tazama Yote',
      viewDetails: 'Tazama Maelezo',
      shipments: [
        {
          id: 'SH-2401',
          from: 'Nairobi, KE',
          to: 'Kampala, UG',
          cargo: 'Vifaa vya Umeme (12 Tani)',
          budget: 'KES 85,000',
          status: 'in-transit',
          statusLabel: 'Njiani',
          eta: '4 masaa',
          driver: 'Peter Omondi',
          progress: 65,
        },
        {
          id: 'SH-2402',
          from: 'Mombasa, KE',
          to: 'Dar es Salaam, TZ',
          cargo: 'Bidhaa za Bahari (8 Tani)',
          budget: 'KES 62,000',
          status: 'pending',
          statusLabel: 'Inasubiri Dereva',
          eta: 'TBD',
          driver: null,
          progress: 0,
        },
        {
          id: 'SH-2403',
          from: 'Kisumu, KE',
          to: 'Kigali, RW',
          cargo: 'Mazao ya Kilimo (15 Tani)',
          budget: 'KES 120,000',
          status: 'delivered',
          statusLabel: 'Imefika',
          eta: 'Imekamilika',
          driver: 'James Mutua',
          progress: 100,
        },
      ],
    },
    en: {
      title: 'Recent Shipments',
      viewAll: 'View All',
      viewDetails: 'View Details',
      shipments: [
        {
          id: 'SH-2401',
          from: 'Nairobi, KE',
          to: 'Kampala, UG',
          cargo: 'Electronics (12 Tons)',
          budget: 'KES 85,000',
          status: 'in-transit',
          statusLabel: 'In Transit',
          eta: '4 hours',
          driver: 'Peter Omondi',
          progress: 65,
        },
        {
          id: 'SH-2402',
          from: 'Mombasa, KE',
          to: 'Dar es Salaam, TZ',
          cargo: 'Marine Products (8 Tons)',
          budget: 'KES 62,000',
          status: 'pending',
          statusLabel: 'Awaiting Driver',
          eta: 'TBD',
          driver: null,
          progress: 0,
        },
        {
          id: 'SH-2403',
          from: 'Kisumu, KE',
          to: 'Kigali, RW',
          cargo: 'Agricultural Produce (15 Tons)',
          budget: 'KES 120,000',
          status: 'delivered',
          statusLabel: 'Delivered',
          eta: 'Completed',
          driver: 'James Mutua',
          progress: 100,
        },
      ],
    },
  };

  const text = content[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-transit':
        return Clock;
      case 'pending':
        return AlertCircle;
      case 'delivered':
        return CheckCircle;
      default:
        return Package;
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl text-[#4B2E2B]"
        >
          {text.title}
        </motion.h3>
        <motion.button
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-[#4B2E2B] hover:text-[#D4A373] transition-colors"
        >
          <span className="text-sm">{text.viewAll}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Shipment Cards */}
      <div className="space-y-4">
        {text.shipments.map((shipment, index) => {
          const StatusIcon = getStatusIcon(shipment.status);

          return (
            <motion.div
              key={shipment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-[#4B2E2B]/5"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-[#4B2E2B]/40 mb-1">{shipment.id}</div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${getStatusColor(shipment.status)}`}>
                    <StatusIcon className="w-3 h-3" />
                    {shipment.statusLabel}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[#4B2E2B]/40 hover:text-[#4B2E2B] transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Route */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1">
                  <div className="text-sm text-[#4B2E2B]/60 mb-1">From</div>
                  <div className="flex items-center gap-2 text-[#4B2E2B]">
                    <MapPin className="w-4 h-4 text-[#D4A373]" />
                    <span className="text-sm">{shipment.from}</span>
                  </div>
                </div>
                <div className="w-12 h-px bg-[#4B2E2B]/20 relative">
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4A373] rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#4B2E2B]/60 mb-1">To</div>
                  <div className="flex items-center gap-2 text-[#4B2E2B]">
                    <MapPin className="w-4 h-4 text-[#4B2E2B]" />
                    <span className="text-sm">{shipment.to}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {shipment.progress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-[#4B2E2B]/60 mb-2">
                    <span>Progress</span>
                    <span>{shipment.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F7EFE9] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${shipment.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#D4A373] to-[#4B2E2B] rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#4B2E2B]/10">
                <div>
                  <div className="text-xs text-[#4B2E2B]/60 mb-1">Cargo</div>
                  <div className="flex items-center gap-1 text-[#4B2E2B] text-sm">
                    <Package className="w-3 h-3" />
                    <span className="truncate">{shipment.cargo.split('(')[0]}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#4B2E2B]/60 mb-1">Budget</div>
                  <div className="flex items-center gap-1 text-[#4B2E2B] text-sm">
                    <DollarSign className="w-3 h-3" />
                    <span>{shipment.budget}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#4B2E2B]/60 mb-1">ETA</div>
                  <div className="text-[#4B2E2B] text-sm">{shipment.eta}</div>
                </div>
                <div>
                  <div className="text-xs text-[#4B2E2B]/60 mb-1">Driver</div>
                  <div className="text-[#4B2E2B] text-sm truncate">
                    {shipment.driver || 'Pending'}
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full py-2 text-sm text-[#4B2E2B] hover:text-white bg-[#F7EFE9] hover:bg-[#4B2E2B] rounded-xl transition-all duration-300"
              >
                {text.viewDetails}
              </motion.button>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#D4A373]/5 to-transparent rounded-full -mr-10 -mt-10 blur-xl" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
