import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, Truck, Search } from 'lucide-react';
import type { Load } from '../../lib/api';
import { BACKEND_URL } from '../../lib/api';
import {
  formatWeight,
  getLoadProgress,
  getLoadRoute,
  getLoadStatusLabel,
  getLoadTitle,
  getRelativeEta,
} from '../../lib/logistics';

interface TrackingMapProps {
  language: 'sw' | 'en';
  load: Load | null;
  isLoading?: boolean;
}

export function TrackingMap({ language, load, isLoading = false }: TrackingMapProps) {
  const [trackingQuery, setTrackingQuery] = useState('');
  const [trackedLoad, setTrackedLoad] = useState<Load | null>(null);
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  const content = {
    sw: {
      title: 'Ufuatiliaji wa Safari',
      empty: 'Hakuna usafirishaji unaoendelea kwa sasa.',
      trackById: 'Fuatilia kwa Tracking ID',
      trackingPlaceholder: 'Mfano: TRK-AB12-CD34EF',
      track: 'Fuatilia',
      trackingId: 'Tracking ID',
      currentLocation: 'Mahali Pa Sasa',
      eta: 'Muda wa Kuwasili',
      status: 'Hali',
      driver: 'Dereva',
      weight: 'Uzito',
      recentUpdates: 'Mabadiliko ya Hali',
      pendingDriver: 'Bado hajapangiwa dereva',
      scheduleHint: 'Tarehe na hali za mzigo wako zinaonekana hapa.',
      trackError: 'Tracking ID haijapatikana.',
    },
    en: {
      title: 'Shipment Tracking',
      empty: 'There is no active shipment right now.',
      trackById: 'Track by Tracking ID',
      trackingPlaceholder: 'Example: TRK-AB12-CD34EF',
      track: 'Track',
      trackingId: 'Tracking ID',
      currentLocation: 'Current Location',
      eta: 'Estimated Arrival',
      status: 'Status',
      driver: 'Driver',
      weight: 'Weight',
      recentUpdates: 'Recent Status Updates',
      pendingDriver: 'Driver not assigned yet',
      scheduleHint: 'Your load schedule and status updates show up here.',
      trackError: 'Tracking ID was not found.',
    },
  };

  const text = content[language];
  const displayLoad = trackedLoad || load;

  const recentHistory = useMemo(() => {
    if (!displayLoad?.statusHistory || displayLoad.statusHistory.length === 0) {
      return [];
    }
    return [...displayLoad.statusHistory].slice(-3).reverse();
  }, [displayLoad]);

  async function handleTrackById(event: React.FormEvent) {
    event.preventDefault();
    const normalized = trackingQuery.trim().toUpperCase();
    if (!normalized) return;

    setIsTrackingLoading(true);
    setTrackingError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/loads/track/${encodeURIComponent(normalized)}`);
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.data) {
        throw new Error(body?.message || text.trackError);
      }
      setTrackedLoad(body.data as Load);
    } catch (error) {
      setTrackedLoad(null);
      setTrackingError(error instanceof Error ? error.message : text.trackError);
    } finally {
      setIsTrackingLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-6 text-sm text-[#4B2E2B]/60 shadow-md">
        {language === 'sw' ? 'Inapakia ufuatiliaji...' : 'Loading tracking...'}
      </div>
    );
  }

  if (!displayLoad) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h3 className="text-xl text-[#4B2E2B] mb-3">{text.title}</h3>
        <form onSubmit={handleTrackById} className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B2E2B]/45" />
            <input
              value={trackingQuery}
              onChange={(event) => setTrackingQuery(event.target.value)}
              placeholder={text.trackingPlaceholder}
              className="w-full rounded-xl border border-[#4B2E2B]/10 bg-[#F7EFE9] py-2.5 pl-10 pr-3 text-sm text-[#4B2E2B] outline-none focus:border-[#D4A373]"
            />
          </div>
          <button
            type="submit"
            disabled={isTrackingLoading}
            className="rounded-xl bg-[#4B2E2B] px-4 text-sm text-white disabled:opacity-60"
          >
            {isTrackingLoading ? '...' : text.track}
          </button>
        </form>
        {trackingError ? (
          <div className="text-sm text-red-600">{trackingError}</div>
        ) : (
          <div className="text-sm text-[#4B2E2B]/60">{text.empty}</div>
        )}
      </div>
    );
  }

  const route = getLoadRoute(displayLoad, language);
  const progress = getLoadProgress(displayLoad.status);
  const currentLocation = displayLoad.assignedDriver?.currentLocation || route.from;
  const driverName = displayLoad.assignedDriver?.name || text.pendingDriver;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#4B2E2B]/5"
    >
      <div className="mb-4">
        <h3 className="text-xl text-[#4B2E2B] mb-1">{text.title}</h3>
        <div className="text-sm text-[#4B2E2B]/60">{getLoadTitle(displayLoad, language)}</div>
      </div>

      <form onSubmit={handleTrackById} className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B2E2B]/45" />
          <input
            value={trackingQuery}
            onChange={(event) => setTrackingQuery(event.target.value)}
            placeholder={text.trackingPlaceholder}
            className="w-full rounded-xl border border-[#4B2E2B]/10 bg-[#F7EFE9] py-2.5 pl-10 pr-3 text-sm text-[#4B2E2B] outline-none focus:border-[#D4A373]"
          />
        </div>
        <button
          type="submit"
          disabled={isTrackingLoading}
          className="rounded-xl bg-[#4B2E2B] px-4 py-2.5 text-sm text-white disabled:opacity-60"
        >
          {isTrackingLoading ? '...' : text.track}
        </button>
      </form>

      {trackingError && <div className="mb-4 text-sm text-red-600">{trackingError}</div>}

      <div className="mb-4 rounded-xl bg-[#F7EFE9] p-3 text-sm text-[#4B2E2B]">
        <span className="text-[#4B2E2B]/60">{text.trackingId}: </span>
        <span className="font-medium">{displayLoad.trackingId || displayLoad._id}</span>
      </div>

      <div className="relative w-full h-64 bg-gradient-to-br from-[#F7EFE9] to-[#E8DDD0] rounded-xl overflow-hidden mb-4">
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20">
            <defs>
              <pattern id="tracking-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4B2E2B" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tracking-grid)" />
          </svg>
        </div>

        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M 42 180 Q 135 135, 200 120 T 305 70"
            fill="none"
            stroke="#D4A373"
            strokeWidth="4"
            strokeDasharray="10 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </svg>

        <div className="absolute left-10 bottom-10">
          <div className="w-4 h-4 bg-[#4B2E2B] rounded-full border-4 border-white shadow-lg" />
          <div className="mt-2 text-xs text-[#4B2E2B]">{route.from}</div>
        </div>

        <div className="absolute right-10 top-10">
          <div className="w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg" />
          <div className="mt-2 text-xs text-[#4B2E2B] text-right">{route.to}</div>
        </div>

        <motion.div
          initial={{ left: '14%', bottom: '14%' }}
          animate={{
            left: [`14%`, `${Math.max(18, progress - 4)}%`],
            bottom: ['14%', `${Math.min(70, Math.max(28, progress - 2))}%`],
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute"
        >
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-[#D4A373] to-[#4B2E2B] rounded-xl flex items-center justify-center shadow-lg">
              <Navigation className="w-4 h-4 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-[#4B2E2B]/60 mb-2">
          <span>{text.status}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-[#F7EFE9] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-[#D4A373] to-[#4B2E2B] rounded-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 bg-[#F7EFE9] rounded-xl">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#D4A373]" />
          </div>
          <div>
            <div className="text-xs text-[#4B2E2B]/60">{text.currentLocation}</div>
            <div className="text-sm text-[#4B2E2B]">{currentLocation}</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-2">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 p-3 bg-[#F7EFE9] rounded-xl">
            <Clock className="w-4 h-4 text-[#4B2E2B]" />
            <div className="text-xs text-[#4B2E2B]">{getRelativeEta(displayLoad, language)}</div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 p-3 bg-[#F7EFE9] rounded-xl">
            <Truck className="w-4 h-4 text-[#4B2E2B]" />
            <div className="text-xs text-[#4B2E2B]">{getLoadStatusLabel(displayLoad.status, language)}</div>
          </motion.div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-[#F7EFE9] p-3">
          <div className="text-xs text-[#4B2E2B]/60 mb-1">{text.driver}</div>
          <div className="text-[#4B2E2B]">{driverName}</div>
        </div>
        <div className="rounded-xl bg-[#F7EFE9] p-3">
          <div className="text-xs text-[#4B2E2B]/60 mb-1">{text.weight}</div>
          <div className="text-[#4B2E2B]">{formatWeight(displayLoad.weight, language)}</div>
        </div>
      </div>

      {recentHistory.length > 0 && (
        <div className="mt-4 rounded-xl bg-[#F7EFE9] p-3">
          <div className="mb-2 text-xs text-[#4B2E2B]/60">{text.recentUpdates}</div>
          <div className="space-y-1.5 text-xs text-[#4B2E2B]">
            {recentHistory.map((entry, index) => (
              <div key={`${entry.status}-${entry.timestamp || index}`}>
                {getLoadStatusLabel(entry.status, language)} - {entry.location || route.from}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-[#4B2E2B]/50">{text.scheduleHint}</div>
    </motion.div>
  );
}
