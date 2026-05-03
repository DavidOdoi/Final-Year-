import { useMemo, useState, useEffect } from 'react';
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
import { InteractiveMap, geocodeAddress, type MapLocation } from '../ui/InteractiveMap';

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
  const [mapLocations, setMapLocations] = useState<{
    start?: MapLocation;
    end?: MapLocation;
    current?: MapLocation;
  }>({});

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

  useEffect(() => {
    async function geocodeLocations() {
      if (!displayLoad) return;
      const route = getLoadRoute(displayLoad, language);
      const startLoc = displayLoad.pickupLocation || route.from;
      const endLoc = displayLoad.deliveryLocation || route.to;

      const [startData, endData] = await Promise.all([
        geocodeAddress(startLoc),
        geocodeAddress(endLoc),
      ]);

      setMapLocations({
        start: startData || { lat: 0.3476, lng: 32.5825, name: startLoc },
        end: endData || { lat: 0.3476, lng: 32.5825, name: endLoc },
      });
    }
    geocodeLocations();
  }, [displayLoad, language]);

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

      {/* Real OpenStreetMap Integration */}
      <div className="mb-4">
        <InteractiveMap
          language={language}
          height="300px"
          startLocation={mapLocations.start}
          endLocation={mapLocations.end}
          center={mapLocations.start ? [mapLocations.start.lat, mapLocations.start.lng] : [0.3476, 32.5825]}
          zoom={8}
        />
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
