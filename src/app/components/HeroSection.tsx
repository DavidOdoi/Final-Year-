import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import truck from '../../assets/images/turck.webp';

interface HeroSectionProps {
  language: 'sw' | 'en';
  onToggleLanguage: () => void;
}

function AnimatedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 70, rotateX: -40, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1.1, 0.36, 1] }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
}

function FloatingOrb({
  x, y, size, delay, duration, color,
}: {
  x: string; y: string; size: number; delay: number; duration: number; color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: 'blur(1px)' }}
      animate={{ y: [0, -60, 0], opacity: [0, 0.55, 0], scale: [0.6, 1.1, 0.6] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

const ORBS = [
  { x: '8%',  y: '30%', size: 7,  delay: 0,   duration: 5,   color: 'rgba(255,255,255,0.25)' },
  { x: '18%', y: '65%', size: 5,  delay: 1.2, duration: 6.5, color: 'rgba(22,163,74,0.4)' },
  { x: '30%', y: '45%', size: 9,  delay: 0.6, duration: 4.8, color: 'rgba(255,255,255,0.18)' },
  { x: '50%', y: '75%', size: 6,  delay: 2.1, duration: 5.5, color: 'rgba(234,88,12,0.35)' },
  { x: '65%', y: '25%', size: 8,  delay: 1.5, duration: 6,   color: 'rgba(255,255,255,0.2)' },
  { x: '75%', y: '55%', size: 5,  delay: 0.9, duration: 4.5, color: 'rgba(22,163,74,0.3)' },
  { x: '85%', y: '35%', size: 7,  delay: 2.8, duration: 5.2, color: 'rgba(255,255,255,0.22)' },
  { x: '12%', y: '82%', size: 6,  delay: 3.2, duration: 6.2, color: 'rgba(234,88,12,0.3)' },
  { x: '42%', y: '18%', size: 4,  delay: 1.7, duration: 4.2, color: 'rgba(255,255,255,0.15)' },
  { x: '92%', y: '70%', size: 8,  delay: 0.4, duration: 5.8, color: 'rgba(22,163,74,0.25)' },
];

export function HeroSection({ language }: HeroSectionProps) {
  const content = {
    sw: {
      badge: 'Waaminifu Uganda & Afrika Mashariki',
      headline: 'Safirisha Mizigo Kwa Urahisi',
      subheadline: 'Unganisha na madereva wa mizigo kwa haraka na usalama katika Afrika Mashariki',
      shipperCTA: 'Shipper Register',
      driverCTA: 'Driver Register',
      scroll: 'Telezesha chini',
    },
    en: {
      badge: 'Trusted across Uganda & East Africa',
      headline: 'Transport Goods Easily',
      subheadline: 'Connect with freight drivers quickly and safely across Uganda',
      shipperCTA: 'Shipper Register',
      driverCTA: 'Driver Register',
      scroll: 'Scroll to explore',
    },
  };

  const text = content[language];
  const words = text.headline.split(' ');

  return (
    <div id="hero" className="relative min-h-[600px] md:min-h-[700px] overflow-hidden pt-20">

      {/* ── Ken Burns background ── */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.16 }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        >
          <ImageWithFallback
            src={truck}
            alt="Freight trucks on the highway"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />

        {/* Animated colour-cast sweep */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(120deg, rgba(0,40,10,0.35) 0%, transparent 60%)',
              'linear-gradient(120deg, rgba(50,10,0,0.25) 0%, transparent 60%)',
              'linear-gradient(120deg, rgba(0,40,10,0.35) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Floating orbs ── */}
      {ORBS.map((orb, i) => <FloatingOrb key={i} {...orb} />)}

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl text-white">

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1.1, 0.36, 1] }}
            className="mb-5 inline-block"
          >
            <motion.div
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5"
              animate={{
                boxShadow: [
                  '0 0 0px rgba(255,255,255,0)',
                  '0 0 18px rgba(255,255,255,0.12)',
                  '0 0 0px rgba(255,255,255,0)',
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.55, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span className="text-sm text-white/90 font-medium tracking-wide">{text.badge}</span>
            </motion.div>
          </motion.div>

          {/* Headline — word-by-word 3-D rise */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2"
            style={{ perspective: '900px' }}
          >
            <span className="flex flex-wrap" style={{ gap: '0 0.35em' }}>
              {words.map((word, i) => (
                <AnimatedWord key={i} word={word} delay={0.3 + i * 0.13} />
              ))}
            </span>
          </h1>

          {/* Gradient underline draw */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 + words.length * 0.13 + 0.15, ease: [0.22, 1.1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="h-1 w-28 rounded-full mb-6 bg-gradient-to-r from-green-400 via-emerald-300 to-orange-400"
          />

          {/* Subheadline — blur-in */}
          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)', y: 18 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.95, delay: 0.85 }}
            className="text-lg md:text-xl mb-8 text-white/85 max-w-2xl leading-relaxed"
          >
            {text.subheadline}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Shipper */}
            <Link to="/trader-register">
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.94 }}
                className="relative bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl shadow-xl text-lg font-semibold overflow-hidden"
              >
                {/* shimmer sweep */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                  initial={{ x: '-110%' }}
                  animate={{ x: '210%' }}
                  transition={{ duration: 1.8, delay: 1.6, repeat: Infinity, repeatDelay: 3.5 }}
                />
                {/* glow ring */}
                <motion.span
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(22,163,74,0)',
                      '0 0 28px rgba(22,163,74,0.65)',
                      '0 0 0px rgba(22,163,74,0)',
                    ],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: 1.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {text.shipperCTA}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </Link>

            {/* Driver */}
            <Link to="/driver">
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.94 }}
                className="relative bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl shadow-xl text-lg font-semibold overflow-hidden"
              >
                {/* shimmer sweep */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                  initial={{ x: '-110%' }}
                  animate={{ x: '210%' }}
                  transition={{ duration: 1.8, delay: 2.8, repeat: Infinity, repeatDelay: 3.5 }}
                />
                {/* glow ring */}
                <motion.span
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(234,88,12,0)',
                      '0 0 28px rgba(234,88,12,0.65)',
                      '0 0 0px rgba(234,88,12,0)',
                    ],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: 2.4 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {text.driverCTA}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="mt-12 flex items-center gap-3"
          >
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-1.5"
              animate={{
                borderColor: ['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.65)', 'rgba(255,255,255,0.25)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2.5 rounded-full bg-white/75"
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.span
              className="text-xs text-white/45 tracking-widest uppercase"
              animate={{ opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {text.scroll}
            </motion.span>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
