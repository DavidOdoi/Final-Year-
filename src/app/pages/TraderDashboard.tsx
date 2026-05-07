import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { TraderSidebar } from '../components/trader/TraderSidebar';
import { TraderTopBar } from '../components/trader/TraderTopBar';
import { TraderKPICards } from '../components/trader/TraderKPICards';
import { PostLoadCTA } from '../components/trader/PostLoadCTA';
import { ShipmentCards } from '../components/trader/ShipmentCards';
import { TrackingMap } from '../components/trader/TrackingMap';
import { SpendAnalytics } from '../components/trader/SpendAnalytics';
import {
  apiRequest,
  clearStoredSession,
  getAuthToken,
  getStoredUser,
  type AuthUser,
  type Load,
} from '../lib/api';

export default function TraderDashboard() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loads, setLoads] = useState<Load[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken('trader');
    const storedUser = getStoredUser('trader');

    setUser(storedUser);

    if (!token || !storedUser) {
      navigate('/trader-login', { replace: true });
      return;
    }

    if (storedUser.role === 'driver') {
      navigate('/driver-dashboard', { replace: true });
      return;
    }

    let cancelled = false;

    async function fetchTraderLoads() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiRequest<Load[]>('/api/v1/loads?mine=true', {}, { auth: true });

        if (!cancelled) {
          const loadsData = response.data;
          setLoads(Array.isArray(loadsData) ? loadsData : []);
        }
      } catch (err) {
        console.error('Failed to fetch loads:', err);

        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Unable to load shipments.';
          setError(message);

          if (message.toLowerCase().includes('unauthorized') || message.includes('Authentication required')) {
            clearStoredSession('trader');
            navigate('/trader-login', { replace: true });
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchTraderLoads();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const activeLoad =
    loads.find((load) => load.status === 'in_transit') ||
    loads.find((load) => load.status === 'assigned') ||
    loads.find((load) => load.status === 'open') ||
    null;

  return (
    <div className="relative min-h-screen bg-[#F7EFE9]">
      <TraderSidebar
        language={language}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="lg:ml-64 relative">
        <TraderTopBar
          language={language}
          setLanguage={setLanguage}
          onMenuClick={() => setIsSidebarOpen(true)}
          companyName={user?.companyName || user?.name}
        />
        <main className="relative p-4 md:p-8">
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <TraderKPICards language={language} loads={loads} isLoading={isLoading} />

          <div className="mt-8">
            <PostLoadCTA language={language} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <ShipmentCards
                language={language}
                loads={loads}
                isLoading={isLoading}
              />
            </div>
            <div className="space-y-6">
              <TrackingMap language={language} load={activeLoad} isLoading={isLoading} />
              <SpendAnalytics language={language} loads={loads} isLoading={isLoading} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
