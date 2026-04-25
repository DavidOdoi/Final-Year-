import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Navigation, Clock, Loader } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

interface ActiveTripProps {
  language: 'sw' | 'en';
}

interface ActiveLoadData {
  _id?: string;
  postedBy?: { phone?: string; email?: string };
  pickupLocation?: string;
  deliveryLocation?: string;
  cargoType?: string;
  status?: string;
  contactPhone?: string;
  deliveryPhone?: string;
  createdAt?: string;
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
      navigating: 'Inaanzisha...',
      contacting: 'Inakutumia SMS...',
      noLoad: 'Hakuna safari iliyoko kazi.',
      navigationStarted: 'Usafiri umeanzishwa!',
      contactSent: 'SMS imetumwa!',
      error: 'Kosa imejitokeza',
      operationFailed: 'Operesheni ikashindwa'
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
      navigating: 'Starting...',
      contacting: 'Sending SMS...',
      noLoad: 'No active load.',
      navigationStarted: 'Navigation started!',
      contactSent: 'SMS sent!',
      error: 'Error occurred',
      operationFailed: 'Operation failed'
    },
  };

  const text = content[language];
  const [activeLoad, setActiveLoad] = useState<ActiveLoadData | null>(null);
  const [navigating, setNavigating] = useState(false);
  const [contacting, setContacting] = useState(false);
  const statusLabel = activeLoad?.status === 'assigned'
    ? (language === 'sw' ? 'Imepewa' : 'Assigned')
    : activeLoad?.status === 'in_transit'
      ? text.status
      : activeLoad?.status || text.status;
  const [navigationSuccess, setNavigationSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStatusPriority = (load: ActiveLoadData) => {
    if (load.status === 'in_transit') return 0;
    if (load.status === 'assigned') return 1;
    return 2;
  };

  const fetchActiveLoad = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      const res = await fetch(`${BACKEND_URL}/api/v1/loads?assigned=me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const body = await res.json();
      if (res.ok && Array.isArray(body.data) && body.data.length > 0) {
        const sorted = body.data.sort((a: ActiveLoadData, b: ActiveLoadData) => {
          return loadStatusPriority(a) - loadStatusPriority(b);
        });
        setActiveLoad(sorted[0]);
      }
    } catch (err) {
      console.error('Failed to fetch active load:', err);
    }
  };

  useEffect(() => {
    fetchActiveLoad();
    const listener = () => fetchActiveLoad();
    window.addEventListener('driver:load-accepted', listener);
    return () => window.removeEventListener('driver:load-accepted', listener);
  }, []);

  const handleStartNavigation = async () => {
    if (!activeLoad?._id) return;
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    setNavigating(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/loads/${activeLoad._id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'in_transit' })
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body?.message || text.operationFailed);
      }
      setNavigationSuccess(true);
      setActiveLoad((prev) => (prev ? { ...prev, status: 'in_transit' } : prev));
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          console.log('Current location:', position.coords.latitude, position.coords.longitude);
        });
      }
      setTimeout(() => setNavigationSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : text.operationFailed);
    } finally {
      setNavigating(false);
    }
  };

  const handleContactCustomer = async () => {
    if (!activeLoad?._id) return;
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    const phoneToContact = activeLoad.contactPhone || activeLoad.deliveryPhone || activeLoad.postedBy?.phone;
    if (!phoneToContact) {
      setError(text.operationFailed);
      return;
    }

    setContacting(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/loads/${activeLoad._id}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ phone: phoneToContact })
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body?.message || text.operationFailed);
      }
      setContactSuccess(true);
      setTimeout(() => setContactSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : text.operationFailed);
    } finally {
      setContacting(false);
    }
  };

  if (!activeLoad) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-[#4B2E2B]/10 shadow-sm"
      >
        <h3 className="text-xl text-[#4B2E2B]">{text.title}</h3>
        <p className="text-sm text-[#4B2E2B]/60 mt-4">{text.noLoad}</p>
      </motion.div>
    );
  }

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
          {statusLabel}
        </motion.div>
      </div>

      {/* Route */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <div className="text-[#4B2E2B]">{activeLoad.pickupLocation || text.from}</div>
        </div>
        <div className="ml-1.5 border-l-2 border-dashed border-[#D4A373] h-8" />
        <div className="flex items-center gap-3">
          <MapPin className="w-3 h-3 text-red-500 fill-red-500" />
          <div className="text-[#4B2E2B]">{activeLoad.deliveryLocation || text.to}</div>
        </div>
      </div>

      {/* Cargo */}
      <div className="mb-6 p-3 bg-[#F7EFE9] rounded-xl">
        <div className="text-xs text-[#4B2E2B]/60 mb-1">Cargo</div>
        <div className="text-sm text-[#4B2E2B]">{activeLoad.cargoType || text.cargo}</div>
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

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        <motion.button
          onClick={handleStartNavigation}
          disabled={navigating}
          whileHover={!navigating ? { scale: 1.02 } : {}}
          whileTap={!navigating ? { scale: 0.98 } : {}}
          className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${
            navigationSuccess
              ? 'bg-green-500 text-white'
              : navigating
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-[#D4A373] to-[#4B2E2B] text-white hover:shadow-lg'
          }`}
        >
          {navigationSuccess ? (
            <>
              <Navigation className="w-4 h-4" />
              <span className="text-sm">{text.navigationStarted}</span>
            </>
          ) : navigating ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm">{text.navigating}</span>
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4" />
              <span className="text-sm">{text.navigate}</span>
            </>
          )}
        </motion.button>
        <motion.button
          onClick={handleContactCustomer}
          disabled={contacting || !activeLoad?.postedBy?.phone}
          whileHover={!contacting && activeLoad?.postedBy?.phone ? { scale: 1.02 } : {}}
          whileTap={!contacting && activeLoad?.postedBy?.phone ? { scale: 0.98 } : {}}
          className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
            contactSuccess
              ? 'bg-green-500 text-white'
              : contacting
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-[#F7EFE9] text-[#4B2E2B] hover:bg-[#4B2E2B]/10 transition-colors'
          }`}
        >
          {contactSuccess ? (
            <>
              <Phone className="w-4 h-4" />
              <span className="text-sm">{text.contactSent}</span>
            </>
          ) : contacting ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm">{text.contacting}</span>
            </>
          ) : (
            <>
              <Phone className="w-4 h-4" />
              <span className="text-sm">{text.contact}</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

