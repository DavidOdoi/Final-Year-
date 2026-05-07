import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  Users, Star, Clock, Shield,
} from 'lucide-react';

interface StatisticsProps {
  language: 'sw' | 'en';
}

type LucideIcon = typeof Users;

interface TrustItem {
  value: string;
  label: string;
  icon: LucideIcon;
}

const BG = '#050505';

const TICKER_ITEMS = [
  { icon: '🚛', text: 'Kampala → Jinja' },
  { icon: '📦', text: 'Entebbe → Gulu' },
  { icon: '🚚', text: 'Mbarara → Kampala' },
  { icon: '🛣️', text: 'Kampala → Fort Portal' },
  { icon: '📍', text: 'Jinja → Mbale' },
  { icon: '🚛', text: 'Kampala → Arua' },
  { icon: '📦', text: 'Masaka → Kampala' },
  { icon: '🚚', text: 'Soroti → Kampala' },
  { icon: '🛣️', text: 'Lira → Kampala' },
  { icon: '📍', text: 'Kampala → Kabale' },
  { icon: '🚛', text: 'Kampala → Kasese' },
  { icon: '📦', text: 'Tororo → Kampala' },
];

interface LogoItem {
  name: string;
  short: string;
  color: string;
  bg: string;
}

const LOGOS_ROW_A: LogoItem[] = [
  { name: 'DHL Express',      short: 'DHL',  color: '#ffffff', bg: '#d40511' },
  { name: 'Bolloré Logistics',short: 'BL',   color: '#ffffff', bg: '#003087' },
  { name: 'Spedag Interfreight', short: 'SIF', color: '#ffffff', bg: '#1a5276' },
  { name: 'Siginon Logistics',short: 'SIG',  color: '#ffffff', bg: '#1e8449' },
  { name: 'DB Schenker',      short: 'DBS',  color: '#ffffff', bg: '#cc0000' },
  { name: 'Agility Logistics',short: 'AGI',  color: '#ffffff', bg: '#0057a8' },
];

const LOGOS_ROW_B: LogoItem[] = [
  { name: 'Mitchell Cotts',   short: 'MCF',  color: '#ffffff', bg: '#6d4c41' },
  { name: 'Crown Beverages',  short: 'CBC',  color: '#ffffff', bg: '#e65100' },
  { name: 'Total Energies',   short: 'TE',   color: '#ffffff', bg: '#c0392b' },
  { name: 'Vivo Energy',      short: 'VE',   color: '#ffffff', bg: '#27ae60' },
  { name: 'UFFAA',            short: 'UFF',  color: '#ffffff', bg: '#6c3483' },
  { name: 'Exim Logistics',   short: 'EXL',  color: '#ffffff', bg: '#1a6ba0' },
];

function LogoChip({ item }: { item: LogoItem }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl mx-3 cursor-default select-none"
      style={{
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(8px)',
        minWidth: '180px',
      }}
    >
      {/* Brand colour badge */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-lg font-black"
        style={{
          width: '38px', height: '38px',
          background: item.bg,
          color: item.color,
          fontSize: '0.58rem',
          letterSpacing: '0.06em',
        }}
      >
        {item.short}
      </div>
      <span className="font-semibold text-white" style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
        {item.name}
      </span>
    </div>
  );
}

export function Statistics({ language }: StatisticsProps) {
  const [activeLive, setActiveLive] = useState(0);

  const activities = {
    sw: [
      '🟢 Dereva mpya alisajiliwa — Kampala, Uganda',
      '📦 Mizigo 8T ilifanikiwa — Kampala → Jinja',
      '⭐ Ukaguzi 5/5 ulipewa — Mbarara, Uganda',
      '🚛 Safari ilikamilika — Entebbe → Gulu',
      '📍 Mzigo mkubwa uliowekwa — Jinja, Uganda',
      '🟢 Kampuni mpya ilisajiliwa — Kampala, Uganda',
    ],
    en: [
      '🟢 New driver verified — Kampala, Uganda',
      '📦 8T shipment matched — Kampala → Jinja',
      '⭐ 5-star rating received — Mbarara, Uganda',
      '🚛 Trip completed — Entebbe → Gulu',
      '📍 Bulk cargo listed — Jinja, Uganda',
      '🟢 New company onboarded — Kampala, Uganda',
    ],
  };

  const content = {
    sw: {
      badge: 'NGUVU YA USAFIRISHAJI UGANDA',
      headlineBase: 'Usafirishaji Bora,',
      headlineGradient: 'Matokeo Mazuri',
      subtitle:
        'Safirisha mizigo kwa akili zaidi. Unganishwa na madereva waliohakikiwa Uganda kwa dakika chache — wa kuaminika, wa haraka, na kwa wakati.',
      companiesLabel: 'Imewaamini Makampuni Makubwa Uganda',
      trustItems: [
        { value: '4.8★', label: 'Ukaguzi wa Wastani', icon: Star },
        { value: '24/7', label: 'Msaada wa Wateja', icon: Shield },
        { value: '<2hrs', label: 'Muda wa Ulinganishaji', icon: Clock },
      ] as TrustItem[],
    },
    en: {
      badge: "UGANDA'S #1 FREIGHT PLATFORM",
      headlineBase: 'Smarter Freight,',
      headlineGradient: 'Better Outcomes',
      subtitle:
        'Move freight smarter. Connect with verified drivers across Uganda in minutes — reliable, transparent, and always on time.',
      companiesLabel: 'Trusted by Uganda\'s Leading Logistics Companies',
      trustItems: [
        { value: '4.8★', label: 'Average Rating', icon: Star },
        { value: '24/7', label: 'Customer Support', icon: Shield },
        { value: '<2hrs', label: 'Match Time', icon: Clock },
      ] as TrustItem[],
    },
  };

  const t = content[language];
  const liveActivities = activities[language];

  useEffect(() => {
    const timer = setInterval(
      () => setActiveLive((p) => (p + 1) % liveActivities.length),
      3500
    );
    return () => clearInterval(timer);
  }, [liveActivities.length]);

  return (
    <section className="relative overflow-hidden" style={{ background: BG }}>

      {/* ── Background ───────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.07 }}>
          <defs>
            <pattern id="roadGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 L100 50" stroke="white" strokeWidth="1" strokeDasharray="6 4" />
              <path d="M50 0 L50 100" stroke="white" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="50" cy="50" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#roadGrid)" />
        </svg>

        <div
          className="absolute inset-0 flex items-center justify-center select-none"
          style={{ opacity: 0.022, pointerEvents: 'none' }}
        >
          <span
            className="font-black text-white uppercase whitespace-nowrap"
            style={{ fontSize: 'clamp(80px, 18vw, 240px)', letterSpacing: '0.15em' }}
          >
            UGANDA
          </span>
        </div>

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15], x: [0, 60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, #f9731650 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.22, 0.12], x: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, #10b98150 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
          className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #3b82f650 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
      </div>

      {/* ── Journey Ticker ───────────────────────────────────────── */}
      <div
        className="relative z-10 overflow-hidden"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.03)',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        <div
          className="absolute left-0 inset-y-0 w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${BG}, transparent)` }}
        />
        <div
          className="absolute right-0 inset-y-0 w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${BG}, transparent)` }}
        />
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="inline-flex items-center gap-3" style={{ marginLeft: '2rem', marginRight: '2rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              <span
                className="font-bold tracking-wide"
                style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}
              >
                {item.text}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.18)', marginLeft: '1.5rem', marginRight: '0.5rem' }}>
                ●
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4" style={{ maxWidth: '1280px' }}>

          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full"
              style={{
                border: '1px solid rgba(249,115,22,0.4)',
                background: 'rgba(249,115,22,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#f97316' }}
              />
              <span className="font-bold uppercase tracking-widest" style={{ color: '#fdba74', fontSize: '0.65rem' }}>
                {t.badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-black text-white leading-none tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
            >
              {t.headlineBase}{' '}
              <span className="relative inline-block">
                <span
                  className="relative z-10"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t.headlineGradient}
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                  className="absolute bottom-0.5 left-0 right-0 rounded-full origin-left"
                  style={{ height: '3px', background: 'linear-gradient(90deg, #f97316, #fbbf24)' }}
                />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
              style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', lineHeight: '1.75' }}
            >
              {t.subtitle}
            </motion.p>
          </div>

          {/* ── Logo Wall ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            {/* Section label */}
            <div className="text-center mb-8">
              <p
                className="font-semibold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem' }}
              >
                {t.companiesLabel}
              </p>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div style={{ height: '1px', width: '60px', background: 'rgba(255,255,255,0.1)' }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', opacity: 0.6 }} />
                <div style={{ height: '1px', width: '60px', background: 'rgba(255,255,255,0.1)' }} />
              </div>
            </div>

            {/* Row A — scrolling left */}
            <div className="relative overflow-hidden mb-3">
              <div
                className="absolute left-0 inset-y-0 w-24 z-10 pointer-events-none"
                style={{ background: `linear-gradient(to right, ${BG}, transparent)` }}
              />
              <div
                className="absolute right-0 inset-y-0 w-24 z-10 pointer-events-none"
                style={{ background: `linear-gradient(to left, ${BG}, transparent)` }}
              />
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="flex"
              >
                {[...LOGOS_ROW_A, ...LOGOS_ROW_A].map((item, i) => (
                  <LogoChip key={i} item={item} />
                ))}
              </motion.div>
            </div>

            {/* Row B — scrolling right */}
            <div className="relative overflow-hidden">
              <div
                className="absolute left-0 inset-y-0 w-24 z-10 pointer-events-none"
                style={{ background: `linear-gradient(to right, ${BG}, transparent)` }}
              />
              <div
                className="absolute right-0 inset-y-0 w-24 z-10 pointer-events-none"
                style={{ background: `linear-gradient(to left, ${BG}, transparent)` }}
              />
              <motion.div
                animate={{ x: ['-50%', '0%'] }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="flex"
              >
                {[...LOGOS_ROW_B, ...LOGOS_ROW_B].map((item, i) => (
                  <LogoChip key={i} item={item} />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ── Bottom Bar ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-6 md:p-8"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

              {/* Trust metrics */}
              <div className="grid grid-cols-3 gap-4 divide-x divide-white/10">
                {t.trustItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ scale: 1.06 }}
                      className="text-center pl-4 first:pl-0"
                    >
                      <motion.div
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
                        className="inline-block mb-2"
                      >
                        <Icon className="w-5 h-5 mx-auto" style={{ color: '#fb923c' }} />
                      </motion.div>
                      <div className="font-black text-white" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.6rem)' }}>
                        {item.value}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.72rem' }}>
                        {item.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Live activity feed */}
              <div
                className="rounded-xl px-4 py-3"
                style={{ border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: '#10b981' }}
                    />
                    <span className="font-bold uppercase tracking-widest" style={{ color: '#10b981', fontSize: '0.62rem' }}>
                      LIVE
                    </span>
                  </div>
                  <div className="relative flex-1 overflow-hidden" style={{ height: '1.2rem' }}>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeLive}
                        initial={{ y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -18, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="absolute whitespace-nowrap"
                        style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}
                      >
                        {liveActivities[activeLive]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
