/// <reference types="vite/client" />
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import we from '../../assets/images/we.webp';
import paulImage from '../../assets/images/yes.webp';

interface ReviewsSectionProps {
  language: 'sw' | 'en';
}

const BG = '#050505';

export function ReviewsSection({ language }: ReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const content = {
    en: {
      label: 'CUSTOMER STORIES',
      title: 'Trusted by Businesses',
      titleGradient: 'Across Uganda',
      subtitle: "Hear how we're transforming freight for shippers and drivers every day",
      reviews: [
        {
          name: 'Twesigye Eria',
          company: 'Kampala Trading Company',
          location: 'Kampala, Uganda',
          role: 'Cargo Shipper',
          rating: 5,
          text: 'ELOGISTICA has completely transformed my business. I can now find reliable drivers in minutes instead of hours. The platform is fast, transparent, and I always know where my cargo is.',
          image: we,
        },
        {
          name: 'Paul Mugisha',
          company: 'Jinja Freight Solutions',
          location: 'Jinja, Uganda',
          role: 'Truck Driver',
          rating: 5,
          text: 'As a driver, I get consistent work every week and payments always come on time. ELOGISTICA has made it so easy to connect with shippers who need my truck.',
          image: paulImage,
        },
      ],
    },
    sw: {
      label: 'HADITHI ZA WATEJA',
      title: 'Waaminifu kwa Biashara',
      titleGradient: 'Kote Uganda',
      subtitle: 'Sikia jinsi tunavyobadilisha usafirishaji kila siku',
      reviews: [
        {
          name: 'Twesigye Eria',
          company: 'Kampala Trading Company',
          location: 'Kampala, Uganda',
          role: 'Msafirishaji wa Mizigo',
          rating: 5,
          text: 'ELOGISTICA imebadilisha biashara yangu kabisa. Sasa napata madereva wa kuaminika kwa dakika badala ya masaa. Jukwaa ni la haraka, wazi, na ninajua daima mizigo yangu iko wapi.',
          image: we,
        },
        {
          name: 'Paul Mugisha',
          company: 'Jinja Freight Solutions',
          location: 'Jinja, Uganda',
          role: 'Dereva wa Lori',
          rating: 5,
          text: 'Kama dereva, ninapata kazi za kutosha kila wiki na malipo yanakuja kwa wakati. ELOGISTICA imerahisisha kuunganishwa na wasafirishaji wanaohitaji lori langu.',
          image: paulImage,
        },
      ],
    },
  };

  const text = content[language];

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % text.reviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + text.reviews.length) % text.reviews.length);
  };

  const review = text.reviews[currentIndex];

  return (
    <section style={{ background: BG }} className="py-20 md:py-32 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, #f9731630 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(249,115,22,0.35)', background: 'rgba(249,115,22,0.08)' }}
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#f97316' }}
            />
            <span style={{ color: '#fdba74', fontSize: '0.65rem' }} className="font-bold uppercase tracking-widest">
              {text.label}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-black text-white leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {text.title}{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {text.titleGradient}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem' }}
          >
            {text.subtitle}
          </motion.p>
        </div>

        {/* Review Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 left-0 right-0 rounded-t-3xl"
                  style={{ height: '2px', background: 'linear-gradient(90deg, #f97316, #fbbf24, transparent)' }}
                />

                {/* Quote icon */}
                <div
                  className="mb-6 font-black leading-none select-none"
                  style={{ fontSize: '4rem', color: '#f97316', opacity: 0.6, lineHeight: 1 }}
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.07, type: 'spring', stiffness: 200 }}
                    >
                      <Star className="fill-yellow-400 text-yellow-400" style={{ width: '1.1rem', height: '1.1rem' }} />
                    </motion.div>
                  ))}
                </div>

                {/* Review text */}
                <p
                  className="text-white font-light leading-relaxed mb-8"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: '1.8' }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Avatar + info row */}
                <div className="flex items-center gap-4">
                  {/* Circular avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
                    className="flex-shrink-0 rounded-full overflow-hidden"
                    style={{
                      width: '60px',
                      height: '60px',
                      border: '2px solid rgba(249,115,22,0.5)',
                      boxShadow: '0 0 20px rgba(249,115,22,0.2)',
                    }}
                  >
                    <ImageWithFallback
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Name & company */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-white" style={{ fontSize: '1rem' }}>
                        {review.name}
                      </span>
                      <BadgeCheck style={{ width: '1rem', height: '1rem', color: '#f97316', flexShrink: 0 }} />
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
                      {review.company}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>
                      {review.location}
                    </div>
                  </div>

                  {/* Role badge */}
                  <div
                    className="hidden sm:block flex-shrink-0 px-3 py-1 rounded-full"
                    style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)' }}
                  >
                    <span style={{ color: '#fdba74', fontSize: '0.7rem', fontWeight: 600 }}>
                      {review.role}
                    </span>
                  </div>
                </div>

                {/* Subtle background glow inside card */}
                <div
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: '#f97316', opacity: 0.05, filter: 'blur(30px)' }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prevReview}
              className="absolute -left-5 md:-left-6 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all"
              style={{
                width: '44px', height: '44px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(249,115,22,0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            >
              <ChevronLeft style={{ width: '1.1rem', height: '1.1rem', color: 'white' }} />
            </button>

            <button
              onClick={nextReview}
              className="absolute -right-5 md:-right-6 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all"
              style={{
                width: '44px', height: '44px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(249,115,22,0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            >
              <ChevronRight style={{ width: '1.1rem', height: '1.1rem', color: 'white' }} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {text.reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentIndex ? '24px' : '8px',
                  height: '8px',
                  background: i === currentIndex ? '#f97316' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
