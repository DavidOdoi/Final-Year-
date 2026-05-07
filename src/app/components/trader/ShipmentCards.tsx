import { motion } from 'motion/react';
import {
  MapPin,
  Package,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Load } from '../../lib/api';
import {
  formatWeight,
  getLoadProgress,
  getLoadRoute,
  getLoadStatusLabel,
  getLoadTitle,
  getRelativeEta,
} from '../../lib/logistics';

interface ShipmentCardsProps {
  language: 'sw' | 'en';
  loads: Load[];
  isLoading?: boolean;
}

export function ShipmentCards({
  language,
  loads,
  isLoading = false,
}: ShipmentCardsProps) {
  const navigate = useNavigate();

  const content = {
    sw: {
      title: 'Usafirishaji wa Hivi Karibuni',
      viewAll: 'Tazama Soko la Malori',
      viewDetails: 'Fungua Maelezo',
      findTruck: 'Tafuta Dereva',
      loading: 'Inapakia usafirishaji wako...',
      empty: 'Bado hujachapisha mzigo wowote.',
      from: 'Kutoka',
      to: 'Kwenda',
      progress: 'Maendeleo',
      cargo: 'Mzigo',
      eta: 'Muda',
      driver: 'Dereva',
      trackingId: 'Tracking ID',
      pending: 'Inasubiri',
      routeHint: 'Chagua mzigo ulio wazi ili uone madereva wanaolingana.',
    },
    en: {
      title: 'Recent Shipments',
      viewAll: 'Open Marketplace',
      viewDetails: 'Open Details',
      findTruck: 'Find Driver',
      loading: 'Loading your shipments...',
      empty: 'You have not posted any loads yet.',
      from: 'From',
      to: 'To',
      progress: 'Progress',
      cargo: 'Cargo',
      eta: 'ETA',
      driver: 'Driver',
      trackingId: 'Tracking ID',
      pending: 'Pending',
      routeHint: 'Choose an open load to see matching drivers.',
    },
  };

  const text = content[language];
  const recentLoads = [...loads].slice(0, 4);

  const getStatusColor = (status: Load['status']) => {
    switch (status) {
      case 'in_transit':  return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'assigned':    return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'delivered':   return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':   return 'bg-red-100 text-red-700 border-red-200';
      case 'open':
      default:            return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  const getStatusIcon = (status: Load['status']) => {
    switch (status) {
      case 'in_transit': return Clock;
      case 'assigned':   return Truck;
      case 'delivered':  return CheckCircle;
      default:           return AlertCircle;
    }
  };

  return (
    <div className="relative">
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
          onClick={() => navigate('/truck-marketplace')}
          className="flex items-center gap-2 text-[#4B2E2B] hover:text-[#D4A373] transition-colors"
        >
          <span className="text-sm">{text.viewAll}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {isLoading ? (
        <div className="rounded-2xl bg-white p-6 text-sm text-[#4B2E2B]/60 shadow-md">{text.loading}</div>
      ) : recentLoads.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-sm text-[#4B2E2B]/60 shadow-md">{text.empty}</div>
      ) : (
        <div className="space-y-4">
          {recentLoads.map((shipment, index) => {
            const StatusIcon = getStatusIcon(shipment.status);
            const route = getLoadRoute(shipment, language);
            const progress = getLoadProgress(shipment.status);
            const driverName = shipment.assignedDriver?.name || text.pending;
            const actionLabel = shipment.status === 'open' ? text.findTruck : text.viewDetails;

            return (
              <motion.div
                key={shipment._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-[#4B2E2B]/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-[#4B2E2B]/40 mb-1">{shipment._id}</div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${getStatusColor(shipment.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      {getLoadStatusLabel(shipment.status, language)}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      navigate(
                        shipment.status === 'open' && shipment._id
                          ? `/truck-marketplace?loadId=${shipment._id}`
                          : '/truck-marketplace',
                      )
                    }
                    className="text-[#4B2E2B]/40 hover:text-[#4B2E2B] transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <div className="text-sm text-[#4B2E2B]/60 mb-1">{text.from}</div>
                    <div className="flex items-center gap-2 text-[#4B2E2B]">
                      <MapPin className="w-4 h-4 text-[#D4A373]" />
                      <span className="text-sm">{route.from}</span>
                    </div>
                  </div>
                  <div className="w-12 h-px bg-[#4B2E2B]/20 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4A373] rounded-full" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[#4B2E2B]/60 mb-1">{text.to}</div>
                    <div className="flex items-center gap-2 text-[#4B2E2B]">
                      <MapPin className="w-4 h-4 text-[#4B2E2B]" />
                      <span className="text-sm">{route.to}</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-[#4B2E2B]/60 mb-2">
                    <span>{text.progress}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F7EFE9] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-[#D4A373] to-[#4B2E2B] rounded-full"
                    />
                  </div>
                  {shipment.status === 'open' && (
                    <div className="mt-2 text-xs text-[#4B2E2B]/50">{text.routeHint}</div>
                  )}
                </div>

                {/* Info grid — no price column */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#4B2E2B]/10">
                  <div>
                    <div className="text-xs text-[#4B2E2B]/60 mb-1">{text.cargo}</div>
                    <div className="flex items-center gap-1 text-[#4B2E2B] text-sm">
                      <Package className="w-3 h-3" />
                      <span className="truncate">{getLoadTitle(shipment, language)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#4B2E2B]/60 mb-1">{text.eta}</div>
                    <div className="text-[#4B2E2B] text-sm">{getRelativeEta(shipment, language)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#4B2E2B]/60 mb-1">{text.driver}</div>
                    <div className="text-[#4B2E2B] text-sm truncate">{driverName}</div>
                    <div className="text-xs text-[#4B2E2B]/40 mt-1">{formatWeight(shipment.weight, language)}</div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-[#4B2E2B]/55">
                  {text.trackingId}: <span className="text-[#4B2E2B]">{shipment.trackingId || shipment._id}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    navigate(
                      shipment.status === 'open' && shipment._id
                        ? `/truck-marketplace?loadId=${shipment._id}`
                        : '/truck-marketplace',
                    )
                  }
                  className="mt-4 w-full py-2 text-sm text-[#4B2E2B] hover:text-white bg-[#F7EFE9] hover:bg-[#4B2E2B] rounded-xl transition-all duration-300"
                >
                  {actionLabel}
                </motion.button>

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#D4A373]/5 to-transparent rounded-full -mr-10 -mt-10 blur-xl" />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
