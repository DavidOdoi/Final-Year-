import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import {
  DriverWorkspace,
  type DriverDocument,
  type DriverSection,
  type DriverSettings,
} from '../components/dashboard/DriverWorkspace';
import { apiRequest, clearStoredSession, getAuthToken, getStoredUser, setStoredSession, type AuthUser, type Load } from '../lib/api';
import { getLoadValue, getNextLoadStatus } from '../lib/logistics';

const DRIVER_LOCAL_LOADS_KEY = 'driver_dashboard_local_loads_v1';
const DRIVER_DOCUMENTS_KEY = 'driver_dashboard_documents_v1';
const DRIVER_SETTINGS_KEY = 'driver_dashboard_settings_v1';
const DEFAULT_SECTION: DriverSection = 'loads';
const DRIVER_SECTIONS: DriverSection[] = ['loads', 'trips', 'earnings', 'documents', 'ratings', 'settings'];

function readLocalValue<T>(key: string, fallback: T) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.error(`Unable to parse local storage for ${key}`, error);
    return fallback;
  }
}

function isDriverSection(value: string | null): value is DriverSection {
  return DRIVER_SECTIONS.includes(value as DriverSection);
}

function createDefaultDocuments(): DriverDocument[] {
  return [
    {
      id: 'license',
      name: 'Driver License',
      status: 'verified',
      required: true,
      description: {
        sw: 'Leseni halali ya udereva',
        en: 'Valid commercial driver license',
      },
      fileName: 'license.pdf',
      updatedAt: new Date().toISOString(),
      expiryDate: '2027-08-14',
    },
    {
      id: 'national-id',
      name: 'National ID',
      status: 'submitted',
      required: true,
      description: {
        sw: 'Kitambulisho cha taifa cha dereva',
        en: 'Government-issued national ID',
      },
      fileName: 'national-id.pdf',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'insurance',
      name: 'Cargo Insurance',
      status: 'expiring',
      required: true,
      description: {
        sw: 'Bima ya mzigo na safari',
        en: 'Insurance covering cargo operations',
      },
      fileName: 'insurance-policy.pdf',
      updatedAt: new Date().toISOString(),
      expiryDate: '2026-06-01',
    },
    {
      id: 'inspection',
      name: 'Vehicle Inspection',
      status: 'missing',
      required: true,
      description: {
        sw: 'Ripoti ya ukaguzi wa lori',
        en: 'Latest truck inspection report',
      },
    },
  ];
}

function createDefaultSettings(user: AuthUser | null): DriverSettings {
  return {
    displayName: user?.name || '',
    phone: '',
    homeBase: user?.location || '',
    truckTypes: 'Flatbed, Box Truck',
    languages: 'English, Swahili',
    paymentMethod: 'M-Pesa',
    preferredLanguage: 'en',
    autoAccept: false,
    shareLocation: true,
    notifications: {
      newLoads: true,
      payouts: true,
      ratings: true,
    },
  };
}

function mergeSettings(base: DriverSettings, saved: Partial<DriverSettings> | null | undefined): DriverSettings {
  if (!saved) {
    return base;
  }

  return {
    ...base,
    ...saved,
    notifications: {
      ...base.notifications,
      ...saved.notifications,
    },
  };
}

function mergeLoads(primary: Load[], secondary: Load[]) {
  const loadMap = new Map<string, Load>();
  const looseLoads: Load[] = [];

  primary.forEach((load) => {
    if (load._id) {
      loadMap.set(load._id, load);
      return;
    }

    looseLoads.push(load);
  });

  secondary.forEach((load) => {
    if (load._id) {
      loadMap.set(load._id, {
        ...loadMap.get(load._id),
        ...load,
        assignedDriver: load.assignedDriver || loadMap.get(load._id)?.assignedDriver,
      });
      return;
    }

    looseLoads.push(load);
  });

  return [...loadMap.values(), ...looseLoads].sort((left, right) => {
    const leftDate = new Date(left.updatedAt || left.createdAt || 0).getTime();
    const rightDate = new Date(right.updatedAt || right.createdAt || 0).getTime();
    return rightDate - leftDate;
  });
}

function getSectionLabel(section: DriverSection, language: 'sw' | 'en') {
  const labels = {
    sw: {
      loads: 'Mizigo Inayopatikana',
      trips: 'Safari Zangu',
      earnings: 'Mapato',
      documents: 'Nyaraka',
      ratings: 'Ukaguzi',
      settings: 'Mipangilio',
    },
    en: {
      loads: 'Available Loads',
      trips: 'My Trips',
      earnings: 'Earnings',
      documents: 'Documents',
      ratings: 'Ratings',
      settings: 'Settings',
    },
  };

  return labels[language][section];
}

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialUser = getStoredUser();
  const initialSettings = mergeSettings(
    createDefaultSettings(initialUser),
    readLocalValue<Partial<DriverSettings> | null>(DRIVER_SETTINGS_KEY, null),
  );

  const [isOnline, setIsOnline] = useState(true);
  const [language, setLanguage] = useState<'sw' | 'en'>(initialSettings.preferredLanguage);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [remoteAvailableLoads, setRemoteAvailableLoads] = useState<Load[]>([]);
  const [remoteDriverLoads, setRemoteDriverLoads] = useState<Load[]>([]);
  const [localDriverLoads, setLocalDriverLoads] = useState<Load[]>(
    readLocalValue<Load[]>(DRIVER_LOCAL_LOADS_KEY, []),
  );
  const [documents, setDocuments] = useState<DriverDocument[]>(
    readLocalValue<DriverDocument[]>(DRIVER_DOCUMENTS_KEY, createDefaultDocuments()),
  );
  const [settings, setSettings] = useState<DriverSettings>(initialSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const activeSection = isDriverSection(searchParams.get('section'))
    ? (searchParams.get('section') as DriverSection)
    : DEFAULT_SECTION;

  const driverLoads = mergeLoads(remoteDriverLoads, localDriverLoads);
  const driverLoadIds = new Set(
    driverLoads.map((load) => load._id).filter((loadId): loadId is string => Boolean(loadId)),
  );
  const availableLoads = remoteAvailableLoads.filter((load) => !load._id || !driverLoadIds.has(load._id));
  const walletBalance = driverLoads
    .filter((load) => load.status === 'delivered')
    .reduce((sum, load) => sum + getLoadValue(load), 0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(DRIVER_LOCAL_LOADS_KEY, JSON.stringify(localDriverLoads));
  }, [localDriverLoads]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(DRIVER_DOCUMENTS_KEY, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(DRIVER_SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeoutId = window.setTimeout(() => setFeedback(null), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  useEffect(() => {
    const token = getAuthToken('driver');
    const storedUser = getStoredUser('driver');
    setUser(storedUser);

    if (!token || !storedUser) {
      navigate('/driver/login', { replace: true });
      return;
    }

    if (storedUser?.role === 'trader') {
      navigate('/trader-dashboard', { replace: true });
      return;
    }

    setSettings((current) => mergeSettings(createDefaultSettings(storedUser), current));

    void (async () => {
      try {
        const profileRes = await apiRequest<AuthUser>('/api/v1/users/me', {}, { auth: true });
        const profile = profileRes.data;
        setUser(profile);
        setSettings((current) => ({
          ...current,
          displayName: profile.name || current.displayName,
          homeBase: profile.location || current.homeBase,
          phone: profile.phone || current.phone,
        }));

        const token = getAuthToken('driver');
        if (token) {
          setStoredSession(profile, token);
        }
      } catch (err) {
        console.error('Unable to sync profile', err);
      }
    })();
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;
    const token = getAuthToken('driver');

    async function fetchDriverData() {
      if (!token) {
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      const [availableResult, mineResult] = await Promise.allSettled([
        apiRequest<Load[]>('/api/v1/loads?status=open', {}, { auth: true }),
        apiRequest<Load[]>('/api/v1/loads?assigned=me', {}, { auth: true }),
      ]);

      if (cancelled) {
        return;
      }

      if (availableResult.status === 'fulfilled') {
        const data = availableResult.value.data;
        setRemoteAvailableLoads(Array.isArray(data) ? data : []);
      } else {
        setRemoteAvailableLoads([]);
      }

      if (mineResult.status === 'fulfilled') {
        const data = mineResult.value.data;
        setRemoteDriverLoads(Array.isArray(data) ? data : []);
      } else {
        setRemoteDriverLoads([]);
      }

      if (availableResult.status === 'rejected' && mineResult.status === 'rejected') {
        const availableMessage =
          availableResult.reason instanceof Error ? availableResult.reason.message : 'Unable to load driver data.';
        const mineMessage =
          mineResult.reason instanceof Error ? mineResult.reason.message : 'Unable to load trips.';

        if (
          availableMessage.toLowerCase().includes('unauthorized') ||
          mineMessage.toLowerCase().includes('unauthorized') ||
          availableMessage.includes('Authentication required') ||
          mineMessage.includes('Authentication required')
        ) {
          clearStoredSession('driver');
          navigate('/driver/login', { replace: true });
          return;
        }

        setError(availableMessage === mineMessage ? availableMessage : `${availableMessage} ${mineMessage}`);
      }

      setIsLoading(false);
    }

    fetchDriverData();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  function handleSectionChange(section: DriverSection) {
    if (section === DEFAULT_SECTION) {
      setSearchParams({});
    } else {
      setSearchParams({ section });
    }
  }

  function handleLanguageChange(nextLanguage: 'sw' | 'en') {
    setLanguage(nextLanguage);
    setSettings((current) => ({
      ...current,
      preferredLanguage: nextLanguage,
    }));
  }

  function handleAcceptLoad(load: Load) {
    if (!load._id) {
      const acceptedLoad: Load = {
        ...load,
        status: 'assigned',
        assignedDriver: {
          _id: user?.id || 'local-driver',
          name: settings.displayName || user?.name || 'Driver',
          email: user?.email,
          currentLocation: settings.homeBase || user?.location || load.pickupCity || load.pickupLocation,
        },
        updatedAt: new Date().toISOString(),
      };
      setLocalDriverLoads((current) => mergeLoads(current, [acceptedLoad]));
      setFeedback(
        language === 'sw'
          ? 'Mzigo umeongezwa kwenye safari zako.'
          : 'The load has been added to your trips.',
      );
      handleSectionChange('trips');
      return;
    }

    setError(null);
    void (async () => {
      try {
        const response = await apiRequest<Load>(
          `/api/v1/loads/${load._id}/accept`,
          { method: 'POST' },
          { auth: true },
        );
        const acceptedLoad = response.data;

        setRemoteDriverLoads((current) => mergeLoads(current, [acceptedLoad]));
        setRemoteAvailableLoads((current) => current.filter((item) => item._id !== load._id));
        setLocalDriverLoads((current) => current.filter((item) => item._id !== load._id));

        setFeedback(
          language === 'sw'
            ? 'Mzigo umeongezwa kwenye safari zako.'
            : 'The load has been added to your trips.',
        );
        handleSectionChange('trips');
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : language === 'sw'
              ? 'Imeshindikana kukubali mzigo.'
              : 'Failed to accept this load.';
        setError(message);
      }
    })();
  }

  function handleAdvanceTrip(loadId: string) {
    const currentLoad = driverLoads.find((load) => load._id === loadId);
    const nextStatus = currentLoad ? getNextLoadStatus(currentLoad.status) : null;

    if (!currentLoad || !nextStatus) {
      return;
    }

    setError(null);
    void (async () => {
      try {
        const response = await apiRequest<Load>(
          `/api/v1/loads/${loadId}/status`,
          {
            method: 'POST',
            body: JSON.stringify({ status: nextStatus }),
          },
          { auth: true },
        );
        const updatedLoad = response.data;

        setRemoteDriverLoads((current) => mergeLoads(current, [updatedLoad]));
        setLocalDriverLoads((current) => mergeLoads(current, [updatedLoad]));
        setFeedback(
          nextStatus === 'in_transit'
            ? language === 'sw'
              ? 'Safari imewekwa kuwa njiani.'
              : 'Trip marked as in transit.'
            : language === 'sw'
              ? 'Safari imewekwa kuwa imefika.'
              : 'Trip marked as delivered.',
        );
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : language === 'sw'
              ? 'Imeshindikana kubadilisha hali ya safari.'
              : 'Failed to update trip status.';
        setError(message);
      }
    })();
  }

  function handleUploadDocument(documentId: string, file: File | null) {
    if (!file) {
      return;
    }

    setDocuments((current) =>
      current.map((document) =>
        document.id === documentId
          ? {
              ...document,
              status: document.status === 'verified' ? 'verified' : 'submitted',
              fileName: file.name,
              updatedAt: new Date().toISOString(),
            }
          : document,
      ),
    );

    setFeedback(
      language === 'sw'
        ? `${file.name} imeongezwa kwenye nyaraka zako.`
        : `${file.name} has been added to your documents.`,
    );
  }

  function handleSaveSettings() {
    const nextUser = user
      ? {
          ...user,
          name: settings.displayName || user.name,
          location: settings.homeBase || user.location,
        }
      : null;

    if (nextUser) {
      const token = getAuthToken('driver');
      if (token) {
        setStoredSession(nextUser, token);
      }
      setUser(nextUser);
    }

    setLanguage(settings.preferredLanguage);
    setError(null);
    void (async () => {
      try {
        await apiRequest<AuthUser>(
          '/api/v1/users/me',
          {
            method: 'PATCH',
            body: JSON.stringify({
              name: settings.displayName,
              location: settings.homeBase,
              phone: settings.phone,
            }),
          },
          { auth: true },
        );
        setFeedback(language === 'sw' ? 'Mipangilio imehifadhiwa.' : 'Settings saved.');
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : language === 'sw'
              ? 'Imeshindikana kuhifadhi mipangilio.'
              : 'Failed to save settings.';
        setError(message);
      }
    })();
  }

  function handleWithdraw() {
    setFeedback(
      walletBalance > 0
        ? language === 'sw'
          ? `Ombi la malipo limetayarishwa kupitia ${settings.paymentMethod}.`
          : `A payout request has been prepared via ${settings.paymentMethod}.`
        : language === 'sw'
          ? 'Hakuna salio la kutoa kwa sasa.'
          : 'There is no available balance to withdraw yet.',
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F7EFE9]">
      <Sidebar
        language={language}
        activeItem={activeSection}
        onSelect={handleSectionChange}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="relative lg:ml-64">
        <TopBar
          isOnline={isOnline}
          setIsOnline={setIsOnline}
          language={language}
          setLanguage={handleLanguageChange}
          onMenuClick={() => setIsSidebarOpen(true)}
          driverName={settings.displayName || user?.name}
          walletBalance={walletBalance}
          currentSectionLabel={getSectionLabel(activeSection, language)}
        />

        <main className="relative p-4 md:p-8">
          {feedback && (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {feedback}
            </div>
          )}

          {error && activeSection !== 'loads' && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {error}
            </div>
          )}

          <DriverWorkspace
            section={activeSection}
            language={language}
            user={user}
            isLoading={isLoading}
            error={error}
            availableLoads={availableLoads}
            driverLoads={driverLoads}
            documents={documents}
            settings={settings}
            onAcceptLoad={handleAcceptLoad}
            onAdvanceTrip={handleAdvanceTrip}
            onUploadDocument={handleUploadDocument}
            onSettingsChange={setSettings}
            onSaveSettings={handleSaveSettings}
            onWithdraw={handleWithdraw}
          />
        </main>
      </div>
    </div>
  );
}
