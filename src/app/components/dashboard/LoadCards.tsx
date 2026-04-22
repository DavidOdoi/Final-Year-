import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Package, ArrowRight, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface Load {
  _id?: string;
  pickupLocation?: string;
  pickupCity?: string;
  deliveryLocation?: string;
  deliveryCity?: string;
  cargoType?: string;
  weight?: number;
  price?: number;
  status?: string;
  createdAt?: string;
}

interface LoadCardsProps {
  language: 'sw' | 'en';
}

export function LoadCards({ language }: LoadCardsProps) {
  const content = {
    sw: {
      title: 'Mizigo Inayopatikana',
      subtitle: 'Chagua mzigo na uanze safari',
      accept: 'Kubali Mzigo',
      distance: 'Njia',
      weight: 'Uzito',
      posted: 'Ilipostwa',
      payoutLabel: 'Malipo',
      loading: 'Inapakia mizigo...',
      empty: 'Hakuna mizigo kwa sasa.',
      error: 'Imeshindwa kupakia mizigo. Jaribu tena.',
      authRequired: 'Tafadhali ingia ili kuona mizigo.'
    },
    en: {
      title: 'Available Loads',
      subtitle: 'Select a load and start your trip',
      accept: 'Accept Load',
      distance: 'Route',
      weight: 'Weight',
      posted: 'Posted',
      payoutLabel: 'Payout',
      loading: 'Loading loads...',
      empty: 'No loads available yet.',
      error: 'Unable to load loads. Please try again.',
      authRequired: 'Please sign in to view loads.'
    }
  };

  const text = content[language];
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchLoads() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setError(text.authRequired);
          setLoading(false);
          return;
        }

        const res = await fetch(`${BACKEND_URL}/api/v1/loads?status=open`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const body = await res.json();
        if (!cancelled) {
          setLoads(Array.isArray(body.data) ? body.data : []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError(text.error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchLoads();
    return () => {
      cancelled = true;
    };
  }, [language, text.error, text.authRequired]);

  const renderCards = () => {
    if (loading) {
      return <p className="text-[#4B2E2B]/60">{text.loading}</p>;
    }
    if (error) {
      return <p className="text-red-600">{error}</p>;
    }
    if (loads.length === 0) {
      return <p className="text-[#4B2E2B]/60">{text.empty}</p>;
    }

    return loads.map((load, index) => {
      const from = load.pickupCity || load.pickupLocation || (language === 'sw' ? 'Haijulikani' : 'Unknown');
      const to = load.deliveryCity || load.deliveryLocation || (language === 'sw' ? 'Haijulikani' : 'Unknown');
      const weightLabel = typeof load.weight === 'number'
        ? `${load.weight} ${language === 'sw' ? 'ton' : 'tons'}`
        : language === 'sw' ? 'Haijawekwa' : 'Not set';
      const payout = typeof load.price === 'number'
        ? `UGX ${load.price.toLocaleString()}`
        : language === 'sw' ? 'Weka bei' : 'Set price';
      const posted = load.createdAt
        ? formatDistanceToNow(new Date(load.createdAt), { addSuffix: true })
        : language === 'sw' ? 'Sasa hivi' : 'just now';
      const urgent = (load.status || 'open') === 'open';

      return (
        <motion.div
          key={load._id || index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
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
                    <div className="text-sm">{from}</div>
                    <ArrowRight className="w-4 h-4 inline" />
                    <div className="text-sm inline ml-2">{to}</div>
                  </div>
                </div>
              </div>

              {/* Urgent Badge */}
              {urgent && (
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
                      <h3 className="text-xl text-[#4B2E2B] mb-1">{load.cargoType || (language === 'sw' ? 'Mzigo' : 'Load')}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#4B2E2B]/60">
                        <Clock className="w-4 h-4" />
                        <span>{text.posted} {posted}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl text-[#D4A373]">{payout}</div>
                      <div className="text-xs text-[#4B2E2B]/60">{text.payoutLabel}</div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-[#4B2E2B]/70">
                      <MapPin className="w-4 h-4 text-[#D4A373]" />
                      <div>
                        <div className="text-xs text-[#4B2E2B]/60">{text.distance}</div>
                        <div className="text-sm">{from} → {to}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#4B2E2B]/70">
                      <Package className="w-4 h-4 text-[#D4A373]" />
                      <div>
                        <div className="text-xs text-[#4B2E2B]/60">{text.weight}</div>
                        <div className="text-sm">{weightLabel}</div>
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
      );
    });
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl text-[#4B2E2B] mb-1">{text.title}</h2>
        <p className="text-sm text-[#4B2E2B]/60">{text.subtitle}</p>
      </div>

      {/* Load Cards */}
      <div className="space-y-4">
        {renderCards()}
      </div>
    </div>
  );
}


