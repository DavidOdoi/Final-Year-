/// <reference types="vite/client" />
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, Verified } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import we from '../../assets/images/we.png';
import paulImage from '../../assets/images/yes.png';

interface ReviewsSectionProps {
  language: 'sw' | 'en';
}

export function ReviewsSection({ language }: ReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const content = {
    en: {
      title: 'What Our Customers Say',
      subtitle: "Hear how we're transforming businesses across East Africa",
      verified: 'Verified',
      reviews: [
        {
          name: 'Twesigye Eria',
          company: 'Nairobi Imports Ltd',
          location: 'Nairobi, Kenya',
          rating: 5,
          text: 'ELOGISTICA has completely transformed my business. I can now find reliable drivers in minutes.',
          image: we,
        },
        {
          name: 'Paul',
          company: 'Mombasa Freight Services',
          location: 'Mombasa, Kenya',
          rating: 5,
          text: 'As a driver, I get more jobs and payments come on time.',
          image: paulImage,
        },
      ],
    },
    sw: {
      title: 'Wanachosema Wateja Wetu',
      subtitle: 'Sikia jinsi tunavyobadilisha biashara Afrika Mashariki',
      verified: 'Imehakikiwa',
      reviews: [
        {
          name: 'Tuwesigye Eria',
          company: 'Nairobi Imports Ltd',
          location: 'Nairobi, Kenya',
          rating: 5,
          text: 'Usafirishaji imebadilisha biashara yangu kabisa.',
          image: we,
        },
        {
          name: 'Paul',
          company: 'Mombasa Freight Services',
          location: 'Mombasa, Kenya',
          rating: 5,
          text: 'Ninapata kazi zaidi na malipo kwa wakati.',
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
    setCurrentIndex((prev) =>
      (prev - 1 + text.reviews.length) % text.reviews.length
    );
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">{text.title}</h2>
          <p className="text-gray-600">{text.subtitle}</p>
        </div>

        {/* Card */}
        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2">

                {/* LEFT: IMAGE (FIXED HEIGHT ✅) */}
                <div className="h-[10px] md:h-[670px] overflow-hidden">
                  <ImageWithFallback
                    src={text.reviews[currentIndex].image}
                    alt={text.reviews[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* RIGHT: TEXT */}
                <div className="p-8 flex flex-col justify-center">

                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(text.reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-lg text-gray-700 mb-6">
                    "{text.reviews[currentIndex].text}"
                  </p>

                  {/* Name */}
                  <div className="font-semibold text-xl">
                    {text.reviews[currentIndex].name}
                  </div>

                  <div className="text-orange-600">
                    {text.reviews[currentIndex].company}
                  </div>

                  <div className="text-gray-500 text-sm">
                    {text.reviews[currentIndex].location}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
