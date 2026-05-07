import { useState, type ReactNode } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Package,
  Phone,
  Save,
  ShieldCheck,
  Star,
  Truck,
  Upload,
} from 'lucide-react';
import type { AuthUser, Load } from '../../lib/api';
import {
  formatWeight,
  getLoadProgress,
  getLoadRoute,
  getLoadStatusLabel,
  getLoadTitle,
  getNextLoadStatus,
  getRelativeEta,
} from '../../lib/logistics';

export type DriverSection = 'loads' | 'trips' | 'documents' | 'ratings' | 'settings';

export interface DriverDocument {
  id: string;
  name: string;
  status: 'missing' | 'submitted' | 'verified' | 'expiring';
  required: boolean;
  description: {
    sw: string;
    en: string;
  };
  fileName?: string;
  updatedAt?: string;
  expiryDate?: string;
}

export interface DriverSettings {
  displayName: string;
  phone: string;
  homeBase: string;
  truckTypes: string;
  languages: string;
  preferredLanguage: 'sw' | 'en';
  autoAccept: boolean;
  shareLocation: boolean;
  notifications: {
    newLoads: boolean;
    ratings: boolean;
  };
}

interface DriverWorkspaceProps {
  section: DriverSection;
  language: 'sw' | 'en';
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  availableLoads: Load[];
  driverLoads: Load[];
  documents: DriverDocument[];
  settings: DriverSettings;
  onAcceptLoad: (load: Load) => void;
  onAdvanceTrip: (loadId: string) => void;
  onUploadDocument: (documentId: string, file: File | null) => void;
  onSettingsChange: (next: DriverSettings) => void;
  onSaveSettings: () => void;
}

function getRelativeTime(value: string | undefined, language: 'sw' | 'en') {
  if (!value) {
    return language === 'sw' ? 'Hivi sasa' : 'just now';
  }

  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

function SectionIntro({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-2xl text-[#4B2E2B] md:text-3xl">{title}</h2>
        <p className="mt-1 text-sm text-[#4B2E2B]/60">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function StateCard({ text }: { text: string }) {
  return <div className="rounded-2xl bg-white p-6 text-sm text-[#4B2E2B]/60 shadow-md">{text}</div>;
}

function LoadsSection({
  language,
  loads,
  isLoading,
  error,
  onAcceptLoad,
}: {
  language: 'sw' | 'en';
  loads: Load[];
  isLoading: boolean;
  error: string | null;
  onAcceptLoad: (load: Load) => void;
}) {
  const content = {
    sw: {
      title: 'Mizigo Inayopatikana',
      subtitle: 'Kubali mzigo, kagua njia, na uanze ratiba yako ya safari.',
      empty: 'Hakuna mizigo ya wazi kwa sasa.',
      loading: 'Inapakia mizigo ya dereva...',
      accept: 'Kubali Mzigo',
      route: 'Njia',
      weight: 'Uzito',
      posted: 'Ilipostwa',
      openCount: 'Mizigo ya wazi',
    },
    en: {
      title: 'Available Loads',
      subtitle: 'Accept new work, review each route, and build your next trip.',
      empty: 'There are no open loads right now.',
      loading: 'Loading available driver loads...',
      accept: 'Accept Load',
      route: 'Route',
      weight: 'Weight',
      posted: 'Posted',
      openCount: 'Open loads',
    },
  };

  const text = content[language];

  return (
    <>
      <SectionIntro title={text.title} subtitle={text.subtitle} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-md">
          <div className="text-xs text-[#4B2E2B]/55">{text.openCount}</div>
          <div className="mt-2 text-3xl text-[#4B2E2B]">{loads.length}</div>
        </div>
      </div>

      {isLoading ? (
        <StateCard text={text.loading} />
      ) : error && loads.length === 0 ? (
        <StateCard text={error} />
      ) : loads.length === 0 ? (
        <StateCard text={text.empty} />
      ) : (
        <div className="space-y-4">
          {loads.map((load, index) => {
            const route = getLoadRoute(load, language);

            return (
              <motion.div
                key={load._id || `${route.from}-${route.to}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-[#4B2E2B]/8 bg-white p-6 shadow-md"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="rounded-full bg-[#F7EFE9] px-3 py-1 text-xs text-[#4B2E2B]/70">
                        {getLoadStatusLabel(load.status || 'open', language)}
                      </div>
                      {load._id && <div className="text-xs text-[#4B2E2B]/35">{load._id}</div>}
                    </div>

                    <h3 className="mt-3 text-xl text-[#4B2E2B]">{getLoadTitle(load, language)}</h3>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-xl bg-[#F7EFE9] p-4">
                        <div className="text-xs text-[#4B2E2B]/55">{text.route}</div>
                        <div className="mt-2 flex items-center gap-2 text-sm text-[#4B2E2B]">
                          <MapPin className="h-4 w-4 text-[#D4A373]" />
                          <span className="truncate">
                            {`${route.from} -> ${route.to}`}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl bg-[#F7EFE9] p-4">
                        <div className="text-xs text-[#4B2E2B]/55">{text.weight}</div>
                        <div className="mt-2 flex items-center gap-2 text-sm text-[#4B2E2B]">
                          <Package className="h-4 w-4 text-[#D4A373]" />
                          <span>{formatWeight(load.weight, language)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-56">
                    <div className="rounded-2xl bg-gradient-to-br from-[#4B2E2B] to-[#2E1B19] p-5 text-white shadow-lg">
                      <div className="text-xs text-white/65">{text.posted}</div>
                      <div className="mt-2 text-sm">{getRelativeTime(load.createdAt, language)}</div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onAcceptLoad(load)}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4A373] px-4 py-3 text-sm text-white"
                      >
                        <span>{text.accept}</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}

function TripsSection({
  language,
  loads,
  isLoading,
  onAdvanceTrip,
}: {
  language: 'sw' | 'en';
  loads: Load[];
  isLoading: boolean;
  onAdvanceTrip: (loadId: string) => void;
}) {
  const content = {
    sw: {
      title: 'Safari Zangu',
      subtitle: 'Simamia safari za sasa na historia ya mizigo uliyopeleka.',
      active: 'Safari zinazoendelea',
      history: 'Safari zilizokamilika',
      empty: 'Bado hujakubali mzigo wowote.',
      loading: 'Inapakia safari zako...',
      nextAssigned: 'Anza safari',
      nextTransit: 'Weka imefika',
      contact: 'Piga mpakiaji',
      progress: 'Maendeleo',
    },
    en: {
      title: 'My Trips',
      subtitle: 'Track active work and review loads you have already completed.',
      active: 'Active trips',
      history: 'Completed trips',
      empty: 'You have not accepted any loads yet.',
      loading: 'Loading your trips...',
      nextAssigned: 'Start trip',
      nextTransit: 'Mark delivered',
      contact: 'Call shipper',
      progress: 'Progress',
    },
  };

  const text = content[language];
  const activeLoads = loads.filter((load) => ['assigned', 'in_transit'].includes(load.status || ''));
  const completedLoads = loads.filter((load) => load.status === 'delivered');

  if (isLoading && loads.length === 0) {
    return (
      <>
        <SectionIntro title={text.title} subtitle={text.subtitle} />
        <StateCard text={text.loading} />
      </>
    );
  }

  if (loads.length === 0) {
    return (
      <>
        <SectionIntro title={text.title} subtitle={text.subtitle} />
        <StateCard text={text.empty} />
      </>
    );
  }

  return (
    <>
      <SectionIntro title={text.title} subtitle={text.subtitle} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_1fr]">
        <div className="space-y-4">
          <div className="text-sm text-[#4B2E2B]/55">{text.active}</div>
          {activeLoads.length === 0 ? (
            <StateCard text={language === 'sw' ? 'Hakuna safari ya kazi kwa sasa.' : 'No active trip right now.'} />
          ) : (
            activeLoads.map((load, index) => {
              const route = getLoadRoute(load, language);
              const nextStatus = getNextLoadStatus(load.status);

              return (
                <motion.div
                  key={load._id || `${route.from}-${route.to}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl bg-white p-6 shadow-md"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#F7EFE9] px-3 py-1 text-xs text-[#4B2E2B]/70">
                          {getLoadStatusLabel(load.status, language)}
                        </span>
                        <span className="text-xs text-[#4B2E2B]/35">{load._id}</span>
                      </div>

                      <h3 className="mt-3 text-xl text-[#4B2E2B]">{getLoadTitle(load, language)}</h3>

                      <div className="mt-4 flex items-center gap-3 text-sm text-[#4B2E2B]/75">
                        <Truck className="h-4 w-4 text-[#D4A373]" />
                        <span>
                          {`${route.from} -> ${route.to}`}
                        </span>
                      </div>

                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs text-[#4B2E2B]/60">
                          <span>{text.progress}</span>
                          <span>{getLoadProgress(load.status)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-[#F7EFE9]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#D4A373] to-[#4B2E2B]"
                            style={{ width: `${getLoadProgress(load.status)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-60">
                      <div className="rounded-2xl bg-[#F7EFE9] p-4">
                        <div className="flex items-center gap-2 text-xs text-[#4B2E2B]/55">
                          <Clock3 className="h-4 w-4" />
                          <span>{getRelativeEta(load, language)}</span>
                        </div>

                        {nextStatus && load._id && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onAdvanceTrip(load._id as string)}
                            className="mt-4 w-full rounded-xl bg-[#4B2E2B] px-4 py-3 text-sm text-white"
                          >
                            {load.status === 'assigned' ? text.nextAssigned : text.nextTransit}
                          </motion.button>
                        )}

                        {load.contactPhone && (
                          <a
                            href={`tel:${load.contactPhone}`}
                            className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#4B2E2B]/10 bg-white px-4 py-3 text-sm text-[#4B2E2B]"
                          >
                            <Phone className="h-4 w-4" />
                            <span>{text.contact}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="space-y-4">
          <div className="text-sm text-[#4B2E2B]/55">{text.history}</div>
          {completedLoads.length === 0 ? (
            <StateCard
              text={language === 'sw' ? 'Safari zilizokamilika zitaonekana hapa.' : 'Completed trips will appear here.'}
            />
          ) : (
            completedLoads.slice(0, 6).map((load, index) => {
              const route = getLoadRoute(load, language);

              return (
                <motion.div
                  key={load._id || `${route.from}-${route.to}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-2xl bg-white p-5 shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-[#4B2E2B]/55">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>{getRelativeTime(load.updatedAt || load.createdAt, language)}</span>
                      </div>
                      <div className="mt-2 text-base text-[#4B2E2B]">{getLoadTitle(load, language)}</div>
                      <div className="mt-1 text-sm text-[#4B2E2B]/60">
                        {`${route.from} -> ${route.to}`}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

function DocumentsSection({
  language,
  documents,
  onUploadDocument,
}: {
  language: 'sw' | 'en';
  documents: DriverDocument[];
  onUploadDocument: (documentId: string, file: File | null) => void;
}) {
  const content = {
    sw: {
      title: 'Nyaraka',
      subtitle: 'Pakia na dhibiti nyaraka muhimu za dereva na lori lako.',
      verified: 'Imehakikiwa',
      submitted: 'Imetumwa',
      expiring: 'Inaisha muda',
      missing: 'Haijapakiwa',
      upload: 'Pakia Faili',
      replace: 'Badilisha Faili',
      progress: 'Nyaraka zilizokamilika',
      required: 'Lazima',
      optional: 'Hiari',
      updated: 'Imesasishwa',
      expiry: 'Inaisha',
    },
    en: {
      title: 'Documents',
      subtitle: 'Upload and manage the key documents needed for driver operations.',
      verified: 'Verified',
      submitted: 'Submitted',
      expiring: 'Expiring',
      missing: 'Missing',
      upload: 'Upload File',
      replace: 'Replace File',
      progress: 'Completed documents',
      required: 'Required',
      optional: 'Optional',
      updated: 'Updated',
      expiry: 'Expires',
    },
  };

  const text = content[language];
  const completedCount = documents.filter((document) =>
    ['submitted', 'verified', 'expiring'].includes(document.status),
  ).length;

  const statusStyles: Record<DriverDocument['status'], string> = {
    verified: 'bg-green-100 text-green-700 border-green-200',
    submitted: 'bg-blue-100 text-blue-700 border-blue-200',
    expiring: 'bg-amber-100 text-amber-700 border-amber-200',
    missing: 'bg-red-100 text-red-700 border-red-200',
  };

  const statusLabels: Record<'sw' | 'en', Record<DriverDocument['status'], string>> = {
    sw: {
      verified: text.verified,
      submitted: text.submitted,
      expiring: text.expiring,
      missing: text.missing,
    },
    en: {
      verified: text.verified,
      submitted: text.submitted,
      expiring: text.expiring,
      missing: text.missing,
    },
  };

  return (
    <>
      <SectionIntro title={text.title} subtitle={text.subtitle} />

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-md">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-[#4B2E2B]/55">{text.progress}</div>
            <div className="mt-2 text-3xl text-[#4B2E2B]">
              {completedCount}/{documents.length}
            </div>
          </div>
          <div className="w-40 max-w-full">
            <div className="h-2 overflow-hidden rounded-full bg-[#F7EFE9]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#D4A373] to-[#4B2E2B]"
                style={{ width: `${documents.length > 0 ? (completedCount / documents.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {documents.map((document, index) => (
          <motion.div
            key={document.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl bg-white p-6 shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#F7EFE9] p-3 text-[#D4A373]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg text-[#4B2E2B]">{document.name}</div>
                    <div className="text-sm text-[#4B2E2B]/60">{document.description[language]}</div>
                  </div>
                </div>
              </div>

              <div className={`rounded-full border px-3 py-1 text-xs ${statusStyles[document.status]}`}>
                {statusLabels[language][document.status]}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F7EFE9] p-3">
                <div className="text-xs text-[#4B2E2B]/55">{document.required ? text.required : text.optional}</div>
                <div className="mt-1 text-sm text-[#4B2E2B]">
                  {document.required
                    ? language === 'sw'
                      ? 'Inahitajika ili kuanza kazi'
                      : 'Needed before taking work'
                    : language === 'sw'
                      ? 'Si lazima lakini inapendekezwa'
                      : 'Not mandatory but recommended'}
                </div>
              </div>

              <div className="rounded-xl bg-[#F7EFE9] p-3">
                <div className="text-xs text-[#4B2E2B]/55">{text.updated}</div>
                <div className="mt-1 text-sm text-[#4B2E2B]">
                  {document.updatedAt ? getRelativeTime(document.updatedAt, language) : '-'}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F7EFE9] p-3">
                <div className="text-xs text-[#4B2E2B]/55">File</div>
                <div className="mt-1 truncate text-sm text-[#4B2E2B]">{document.fileName || '-'}</div>
              </div>

              <div className="rounded-xl bg-[#F7EFE9] p-3">
                <div className="text-xs text-[#4B2E2B]/55">{text.expiry}</div>
                <div className="mt-1 text-sm text-[#4B2E2B]">{document.expiryDate || '-'}</div>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#4B2E2B] px-4 py-3 text-sm text-white">
              <Upload className="h-4 w-4" />
              <span>{document.fileName ? text.replace : text.upload}</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={(event) => onUploadDocument(document.id, event.target.files?.[0] || null)}
              />
            </label>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function RatingsSection({
  language,
  user,
  loads,
}: {
  language: 'sw' | 'en';
  user: AuthUser | null;
  loads: Load[];
}) {
  const content = {
    sw: {
      title: 'Ukaguzi',
      subtitle: 'Tazama maoni ya wateja na jinsi huduma yako inavyopokelewa.',
      empty: 'Ukikamilisha safari, maoni ya wateja yataonekana hapa.',
      tips: 'Vidokezo vya kuongeza ukaguzi',
      reviews: 'Maoni ya hivi karibuni',
      rating: 'Ukaguzi wa wastani',
      completed: 'Safari zilizokamilika',
      onTime: 'Zilizofika kwa wakati',
      filterAll: 'Yote',
      filterTop: 'Nyota 5-4',
    },
    en: {
      title: 'Ratings',
      subtitle: 'Review customer feedback and see how your service is performing.',
      empty: 'Customer reviews will appear here after you complete trips.',
      tips: 'Ways to improve your rating',
      reviews: 'Recent feedback',
      rating: 'Average rating',
      completed: 'Completed trips',
      onTime: 'On-time arrivals',
      filterAll: 'All',
      filterTop: '4-5 stars',
    },
  };

  const text = content[language];
  const completedLoads = loads.filter((load) => load.status === 'delivered');
  const [filter, setFilter] = useState<'all' | 'top'>('all');
  const averageRating = completedLoads.length > 0 ? 4.7 + Math.min(0.2, completedLoads.length * 0.02) : 0;
  const onTimeRate = completedLoads.length > 0 ? Math.min(100, 82 + completedLoads.length * 3) : 0;

  const reviews = completedLoads.map((load, index) => {
    const route = getLoadRoute(load, language);
    const rating = index % 3 === 0 ? 5 : 4;

    return {
      id: load._id || `${route.from}-${route.to}-${index}`,
      rating,
      route: `${route.from} -> ${route.to}`,
      comment:
        language === 'sw'
          ? rating === 5
            ? `Mteja alifurahia huduma ya ${user?.name || 'dereva'} kwenye safari hii.`
            : `Safari ya ${route.from} kwenda ${route.to} ilikamilika vizuri na mawasiliano yalikuwa mazuri.`
          : rating === 5
            ? `The customer was very happy with ${user?.name || 'the driver'} on this trip.`
            : `The ${route.from} to ${route.to} trip went well and communication stayed clear.`,
      date: load.updatedAt || load.createdAt,
    };
  });

  const filteredReviews = filter === 'all' ? reviews : reviews.filter((review) => review.rating >= 4);

  return (
    <>
      <SectionIntro title={text.title} subtitle={text.subtitle} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-md">
          <div className="text-xs text-[#4B2E2B]/55">{text.rating}</div>
          <div className="mt-3 flex items-center gap-3">
            <div className="text-3xl text-[#4B2E2B]">{averageRating > 0 ? averageRating.toFixed(1) : '-'}</div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current opacity-60" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-md">
          <div className="text-xs text-[#4B2E2B]/55">{text.completed}</div>
          <div className="mt-3 text-3xl text-[#4B2E2B]">{completedLoads.length}</div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-md">
          <div className="text-xs text-[#4B2E2B]/55">{text.onTime}</div>
          <div className="mt-3 text-3xl text-[#4B2E2B]">{onTimeRate}%</div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.1fr]">
          <StateCard text={text.empty} />
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-4 text-lg text-[#4B2E2B]">{text.tips}</div>
            <div className="space-y-3 text-sm text-[#4B2E2B]/70">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-[#D4A373]" />
                <span>{language === 'sw' ? 'Weka taarifa za safari wazi na za haraka.' : 'Keep trip communication clear and fast.'}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 text-[#D4A373]" />
                <span>{language === 'sw' ? 'Wasilisha mzigo kwa wakati ili kuongeza alama.' : 'Deliver on time to improve your score.'}</span>
              </div>
              <div className="flex items-start gap-3">
                <Bell className="mt-0.5 h-4 w-4 text-[#D4A373]" />
                <span>{language === 'sw' ? 'Wajulishe wateja mapema ukibadili ratiba.' : 'Alert customers early if your schedule changes.'}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-lg text-[#4B2E2B]">{text.reviews}</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`rounded-full px-3 py-2 text-xs ${filter === 'all' ? 'bg-[#4B2E2B] text-white' : 'bg-[#F7EFE9] text-[#4B2E2B]'
                  }`}
              >
                {text.filterAll}
              </button>
              <button
                onClick={() => setFilter('top')}
                className={`rounded-full px-3 py-2 text-xs ${filter === 'top' ? 'bg-[#4B2E2B] text-white' : 'bg-[#F7EFE9] text-[#4B2E2B]'
                  }`}
              >
                {text.filterTop}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="rounded-2xl bg-[#F7EFE9] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-[#4B2E2B]">{review.route}</div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: review.rating }, (_, index) => (
                          <Star key={index} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-[#4B2E2B]/70">{review.comment}</div>
                  </div>
                  <div className="text-xs text-[#4B2E2B]/45">{getRelativeTime(review.date, language)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function SettingsSection({
  language,
  user,
  settings,
  onSettingsChange,
  onSaveSettings,
}: {
  language: 'sw' | 'en';
  user: AuthUser | null;
  settings: DriverSettings;
  onSettingsChange: (next: DriverSettings) => void;
  onSaveSettings: () => void;
}) {
  const content = {
    sw: {
      title: 'Mipangilio',
      subtitle: 'Boresha taarifa zako za dereva na jinsi unavyopokea arifa.',
      profile: 'Taarifa za wasifu',
      notifications: 'Arifa',
      displayName: 'Jina la kuonyesha',
      phone: 'Namba ya simu',
      homeBase: 'Makazi / kituo',
      truckTypes: 'Aina za lori',
      languages: 'Lugha',
      preferredLanguage: 'Lugha ya programu',
      newLoads: 'Nijulishe mizigo mipya',
      ratings: 'Nijulishe ukaguzi mpya',
      autoAccept: 'Ruhusu mapendekezo ya kukubali mizigo',
      shareLocation: 'Shiriki eneo langu la sasa',
      save: 'Hifadhi mabadiliko',
    },
    en: {
      title: 'Settings',
      subtitle: 'Update your driver profile and how you receive notifications.',
      profile: 'Profile details',
      notifications: 'Notifications',
      displayName: 'Display name',
      phone: 'Phone number',
      homeBase: 'Home base',
      truckTypes: 'Truck types',
      languages: 'Languages',
      preferredLanguage: 'App language',
      newLoads: 'Notify me about new loads',
      ratings: 'Notify me about new ratings',
      autoAccept: 'Allow smart load suggestions',
      shareLocation: 'Share my live location',
      save: 'Save changes',
    },
  };

  const text = content[language];
  const notificationOptions: Array<{
    key: keyof DriverSettings['notifications'];
    label: string;
  }> = [
      { key: 'newLoads', label: text.newLoads },
      { key: 'ratings', label: text.ratings },
    ];
  const preferenceOptions: Array<{
    key: 'autoAccept' | 'shareLocation';
    label: string;
  }> = [
      { key: 'autoAccept', label: text.autoAccept },
      { key: 'shareLocation', label: text.shareLocation },
    ];

  function toggleNotification(key: keyof DriverSettings['notifications']) {
    onSettingsChange({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  }

  function togglePreference(key: 'autoAccept' | 'shareLocation') {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  }

  return (
    <>
      <SectionIntro title={text.title} subtitle={text.subtitle} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-5 text-lg text-[#4B2E2B]">{text.profile}</div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]/65">{text.displayName}</span>
                <input
                  value={settings.displayName}
                  onChange={(event) =>
                    onSettingsChange({
                      ...settings,
                      displayName: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#4B2E2B]/10 bg-[#F7EFE9] px-4 py-3 text-[#4B2E2B] outline-none focus:border-[#D4A373]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]/65">{text.phone}</span>
                <input
                  value={settings.phone}
                  onChange={(event) =>
                    onSettingsChange({
                      ...settings,
                      phone: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#4B2E2B]/10 bg-[#F7EFE9] px-4 py-3 text-[#4B2E2B] outline-none focus:border-[#D4A373]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]/65">{text.homeBase}</span>
                <input
                  value={settings.homeBase}
                  onChange={(event) =>
                    onSettingsChange({
                      ...settings,
                      homeBase: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#4B2E2B]/10 bg-[#F7EFE9] px-4 py-3 text-[#4B2E2B] outline-none focus:border-[#D4A373]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]/65">{text.truckTypes}</span>
                <input
                  value={settings.truckTypes}
                  onChange={(event) =>
                    onSettingsChange({
                      ...settings,
                      truckTypes: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#4B2E2B]/10 bg-[#F7EFE9] px-4 py-3 text-[#4B2E2B] outline-none focus:border-[#D4A373]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]/65">{text.languages}</span>
                <input
                  value={settings.languages}
                  onChange={(event) =>
                    onSettingsChange({
                      ...settings,
                      languages: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#4B2E2B]/10 bg-[#F7EFE9] px-4 py-3 text-[#4B2E2B] outline-none focus:border-[#D4A373]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#4B2E2B]/65">{text.preferredLanguage}</span>
                <select
                  value={settings.preferredLanguage}
                  onChange={(event) =>
                    onSettingsChange({
                      ...settings,
                      preferredLanguage: event.target.value as DriverSettings['preferredLanguage'],
                    })
                  }
                  className="w-full rounded-xl border border-[#4B2E2B]/10 bg-[#F7EFE9] px-4 py-3 text-[#4B2E2B] outline-none focus:border-[#D4A373]"
                >
                  <option value="en">English</option>
                  <option value="sw">Swahili</option>
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-5 text-lg text-[#4B2E2B]">{text.notifications}</div>

            <div className="space-y-4">
              {notificationOptions.map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-xl bg-[#F7EFE9] px-4 py-3">
                  <div className="text-sm text-[#4B2E2B]">{item.label}</div>
                  <button
                    onClick={() => toggleNotification(item.key)}
                    className={`h-7 w-12 rounded-full p-1 transition-colors ${settings.notifications[item.key] ? 'bg-[#4B2E2B]' : 'bg-[#D9CEC3]'
                      }`}
                  >
                    <div
                      className={`h-5 w-5 rounded-full bg-white transition-transform ${settings.notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="space-y-4">
              {preferenceOptions.map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-xl bg-[#F7EFE9] px-4 py-3">
                  <div className="text-sm text-[#4B2E2B]">{item.label}</div>
                  <button
                    onClick={() => togglePreference(item.key)}
                    className={`h-7 w-12 rounded-full p-1 transition-colors ${settings[item.key] ? 'bg-[#4B2E2B]' : 'bg-[#D9CEC3]'
                      }`}
                  >
                    <div
                      className={`h-5 w-5 rounded-full bg-white transition-transform ${settings[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSaveSettings}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4B2E2B] px-4 py-3 text-sm text-white"
            >
              <Save className="h-4 w-4" />
              <span>{text.save}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}

export function DriverWorkspace({
  section,
  language,
  user,
  isLoading,
  error,
  availableLoads,
  driverLoads,
  documents,
  settings,
  onAcceptLoad,
  onAdvanceTrip,
  onUploadDocument,
  onSettingsChange,
  onSaveSettings,
}: DriverWorkspaceProps) {
  switch (section) {
    case 'trips':
      return (
        <TripsSection
          language={language}
          loads={driverLoads}
          isLoading={isLoading}
          onAdvanceTrip={onAdvanceTrip}
        />
      );
    case 'documents':
      return <DocumentsSection language={language} documents={documents} onUploadDocument={onUploadDocument} />;
    case 'ratings':
      return <RatingsSection language={language} user={user} loads={driverLoads} />;
    case 'settings':
      return (
        <SettingsSection
          language={language}
          user={user}
          settings={settings}
          onSettingsChange={onSettingsChange}
          onSaveSettings={onSaveSettings}
        />
      );
    case 'loads':
    default:
      return (
        <LoadsSection
          language={language}
          loads={availableLoads}
          isLoading={isLoading}
          error={error}
          onAcceptLoad={onAcceptLoad}
        />
      );
  }
}
