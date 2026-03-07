import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, Verified } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReviewsSectionProps {
  language: 'sw' | 'en';
}

export function ReviewsSection({ language }: ReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const content = {
    sw: {
      title: 'Wanachosema Wateja Wetu',
      subtitle: 'Sikia jinsi tunavyobadilisha biashara za watu kote Afrika Mashariki',
      verified: 'Imehakikiwa',
      reviews: [
        {
          name: 'Ahmed Hassan',
          company: 'Nairobi Imports Ltd',
          location: 'Nairobi, Kenya',
          rating: 5,
          text: 'Safirisha imebadilisha biashara yangu kabisa. Sasa naweza kupata madereva wa kuaminika kwa dakika. Huduma bora kabisa! Platform ni rahisi kutumia na timu ya msaada wanasaidia kila wakati.',
          image: 'https://images.unsplash.com/photo-1695640479993-73a1f7a1b909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3NtYW4lMjBoYXBweSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTkzMzM0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Grace Mutua',
          company: 'East Africa Traders',
          location: 'Kampala, Uganda',
          rating: 5,
          text: 'Malipo ya mobile money na ufuatiliaji wa moja kwa moja ni rahisi sana. Nimepunguza muda wa kusimamia usafirishaji kwa asilimia 70. Biashara yangu imekua kwa kasi sana.',
          image: 'https://images.unsplash.com/photo-1765648684630-ac9c15ac98d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3N3b21hbiUyMHNtaWxpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxOTMzMzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'John Mwenda',
          company: 'Dar Logistics Co.',
          location: 'Dar es Salaam, Tanzania',
          rating: 5,
          text: 'Kuvuka mipaka kumekuwa rahisi. Safirisha inashughulikia nyaraka zote na ninaweza kufuatilia mizigo yangu kila wakati. Hakuna wasiwasi tena kuhusu forodha.',
          image: 'https://images.unsplash.com/photo-1712100743761-5e20dc82c44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZW50cmVwcmVuZXVyJTIwbWFsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTkzMzM0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Sarah Achieng',
          company: 'Mombasa Freight Services',
          location: 'Mombasa, Kenya',
          rating: 5,
          text: 'Kama dereva, Safirisha imenisaidia kupata kazi zaidi. Platform ni rahisi kutumia na malipo yanakuja kwa wakati. Sasa naweza kutegemea mapato yangu.',
          image: 'https://images.unsplash.com/photo-1765648684555-de2d0f6af467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBoYXBweXxlbnwxfHx8fDE3NzE5MzMzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Moses Kiprotich',
          company: 'Highland Transport',
          location: 'Kigali, Rwanda',
          rating: 5,
          text: 'Huduma za wateja ni bora kabisa. Timu inasaidia kila wakati na wanakujibu haraka sana. Wamesuluhisha matatizo yangu yote.',
          image: 'https://images.unsplash.com/photo-1614890085618-0e1054da74f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFuJTIwYnVzaW5lc3MlMjBjYXN1YWx8ZW58MXx8fHwxNzcxOTMzMzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
    en: {
      title: 'What Our Customers Say',
      subtitle: 'Hear how we\'re transforming businesses across East Africa',
      verified: 'Verified',
      reviews: [
        {
          name: 'Ahmed Hassan',
          company: 'Nairobi Imports Ltd',
          location: 'Nairobi, Kenya',
          rating: 5,
          text: 'Safirisha has completely transformed my business. I can now find reliable drivers in minutes. Absolutely excellent service! The platform is easy to use and the support team is always available.',
          image: 'https://images.unsplash.com/photo-1695640479993-73a1f7a1b909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3NtYW4lMjBoYXBweSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTkzMzM0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Grace Mutua',
          company: 'East Africa Traders',
          location: 'Kampala, Uganda',
          rating: 5,
          text: 'Mobile money payments and real-time tracking are so easy. I\'ve reduced my logistics management time by 70%. My business has grown rapidly thanks to Safirisha.',
          image: 'https://images.unsplash.com/photo-1765648684630-ac9c15ac98d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3N3b21hbiUyMHNtaWxpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxOTMzMzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'John Mwenda',
          company: 'Dar Logistics Co.',
          location: 'Dar es Salaam, Tanzania',
          rating: 5,
          text: 'Cross-border has become seamless. Safirisha handles all the paperwork and I can track my loads anytime. No more worries about customs.',
          image: 'https://images.unsplash.com/photo-1712100743761-5e20dc82c44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZW50cmVwcmVuZXVyJTIwbWFsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTkzMzM0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Sarah Achieng',
          company: 'Mombasa Freight Services',
          location: 'Mombasa, Kenya',
          rating: 5,
          text: 'As a driver, Safirisha has helped me get more jobs. The platform is easy to use and payments come on time. Now I can rely on my income.',
          image: 'https://images.unsplash.com/photo-1765648684555-de2d0f6af467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBoYXBweXxlbnwxfHx8fDE3NzE5MzMzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Moses Kiprotich',
          company: 'Highland Transport',
          location: 'Kigali, Rwanda',
          rating: 5,
          text: 'Customer service is exceptional. The team is always available and responds very quickly. They\'ve solved all my issues promptly.',
          image: 'https://images.unsplash.com/photo-1614890085618-0e1054da74f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFuJTIwYnVzaW5lc3MlMjBjYXN1YWx8ZW58MXx8fHwxNzcxOTMzMzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div id="reviews" className="py-20 md:py-32 bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
              <span className="text-orange-700">5.0 {language === 'sw' ? 'kutoka kwa' : 'from'} 1000+ {language === 'sw' ? 'mapitio' : 'reviews'}</span>
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl mb-4">{text.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{text.subtitle}</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative min-h-[600px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 },
                }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    {/* Left: Image */}
                    <div className="relative h-full min-h-[400px] md:min-h-[500px] overflow-hidden">
                      <motion.div
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="h-full"
                      >
                        <ImageWithFallback
                          src={text.reviews[currentIndex].image}
                          alt={text.reviews[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Floating Stats */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-6 left-6 right-6"
                      >
                        <div className="flex items-center gap-3 text-white">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30">
                            <Verified className="w-8 h-8" />
                          </div>
                          <div>
                            <div className="text-sm opacity-90">{text.verified}</div>
                            <div className="text-lg">{text.reviews[currentIndex].company}</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right: Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center relative">
                      {/* Quote Icon */}
                      <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-8 right-8 text-orange-100"
                      >
                        <Quote className="w-20 h-20" fill="currentColor" />
                      </motion.div>

                      {/* Stars with Animation */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(text.reviews[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
                          >
                            <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Review Text */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed relative z-10"
                      >
                        "{text.reviews[currentIndex].text}"
                      </motion.p>

                      {/* Reviewer Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative z-10"
                      >
                        <div className="text-2xl mb-1">{text.reviews[currentIndex].name}</div>
                        <div className="text-orange-600 mb-1 text-lg">
                          {text.reviews[currentIndex].company}
                        </div>
                        <div className="text-gray-500 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {text.reviews[currentIndex].location}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-20 bg-white p-4 rounded-full shadow-2xl hover:shadow-orange-200 transition-shadow z-20 border border-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-20 bg-white p-4 rounded-full shadow-2xl hover:shadow-orange-200 transition-shadow z-20 border border-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>

          {/* Dots Indicator with Progress */}
          <div className="flex justify-center gap-3 mt-12">
            {text.reviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 w-12'
                      : 'bg-gray-300 w-2'
                  }`}
                />
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -inset-2 bg-orange-100 rounded-full -z-10"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
