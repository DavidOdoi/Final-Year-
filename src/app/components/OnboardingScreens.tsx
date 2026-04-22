import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingScreensProps {
  language: 'sw' | 'en';
}

export function OnboardingScreens({ language }: OnboardingScreensProps) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const content = {
    sw: {
      title: 'Huduma Zetu',
      screens: [
        {
          image: 'https://images.unsplash.com/photo-1758061364787-94220d36bef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVja3MlMjBjcm9zc2luZyUyMGJvcmRlciUyMEFmcmljYXxlbnwxfHx8fDE3NzE4NDA0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
          title: 'Usafirishaji wa Kikanda',
          description: 'Safirisha mizigo kwa urahisi kati ya nchi za Afrika Mashariki. Huduma yetu inafanya biashara ya kikanda kuwa rahisi.',
        },
        {
          image: 'https://images.unsplash.com/photo-1716651333407-545b1336c99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBtb25leSUyMHBheW1lbnQlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzcxODQwNDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
          title: 'Malipo ya Mobile Money',
          description: 'Lipa kwa urahisi kwa kutumia M-Pesa, Airtel Money, na huduma zingine za malipo ya simu. Usalama na urahisi.',
        },
        {
          image: 'https://images.unsplash.com/photo-1764347923709-fc48487f2486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHUFMlMjB0cmFja2luZyUyMHNtYXJ0cGhvbmUlMjBtYXB8ZW58MXx8fHwxNzcxODQwNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          title: 'Ufuatiliaji wa Wakati Halisi',
          description: 'Angalia mahali mzigo wako ulipo kila wakati. Pata taarifa za moja kwa moja kuhusu safari ya usafirishaji wako.',
        },
      ],
    },
    en: {
      title: 'Our Services',
      screens: [
        {
          image: 'https://images.unsplash.com/photo-1758061364787-94220d36bef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVja3MlMjBjcm9zc2luZyUyMGJvcmRlciUyMEFmcmljYXxlbnwxfHx8fDE3NzE4NDA0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
          title: 'Regional Reach',
          description: 'Transport goods seamlessly across East African countries. Our service makes cross-border trade easy and efficient.',
        },
        {
          image: 'https://images.unsplash.com/photo-1716651333407-545b1336c99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBtb25leSUyMHBheW1lbnQlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzcxODQwNDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
          title: 'Mobile Money Payments',
          description: 'Pay easily using M-Pesa, Airtel Money, and other mobile payment services. Secure and convenient.',
        },
        {
          image: 'https://images.unsplash.com/photo-1764347923709-fc48487f2486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHUFMlMjB0cmFja2luZyUyMHNtYXJ0cGhvbmUlMjBtYXB8ZW58MXx8fHwxNzcxODQwNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          title: 'Real-Time Tracking',
          description: 'See where your cargo is at all times. Get live updates on your shipment journey.',
        },
      ],
    },
  };

  const text = content[language];

  const nextScreen = () => {
    setCurrentScreen((prev) => (prev + 1) % text.screens.length);
  };

  const prevScreen = () => {
    setCurrentScreen((prev) => (prev - 1 + text.screens.length) % text.screens.length);
  };

  return (
    <div id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl text-center mb-12"
        >
          {text.title}
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {/* Screen Display */}
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
            <div className="aspect-[16/10] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={text.screens[currentScreen].image}
                    alt={text.screens[currentScreen].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Navigation Arrows */}
              <button
                onClick={prevScreen}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                aria-label="Previous screen"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextScreen}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                aria-label="Next screen"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Text Content */}
              <motion.div
                key={`text-${currentScreen}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-8 text-white"
              >
                <h3 className="text-2xl md:text-3xl mb-3">{text.screens[currentScreen].title}</h3>
                <p className="text-lg md:text-xl text-white/90">
                  {text.screens[currentScreen].description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {text.screens.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentScreen(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentScreen ? 'bg-orange-500 w-8' : 'bg-gray-300'
                  }`}
                aria-label={`Go to screen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


