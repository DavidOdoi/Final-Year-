import { motion } from 'motion/react';
import { PlusCircle, Sparkles } from 'lucide-react';

interface PostLoadCTAProps {
  language: 'sw' | 'en';
}

export function PostLoadCTA({ language }: PostLoadCTAProps) {
  const content = {
    sw: {
      title: 'Tayari kutuma mzigo?',
      description: 'Pata madereva wanaoaminika kwa mizigo yako ndani ya dakika',
      button: 'Tuma Mzigo Mpya',
      stat1: '500+',
      stat1Label: 'Madereva Wanaopatikana',
      stat2: '24h',
      stat2Label: 'Wakati wa Kujibu wa Wastani',
    },
    en: {
      title: 'Ready to ship your goods?',
      description: 'Get matched with verified drivers for your loads within minutes',
      button: 'Post New Load',
      stat1: '500+',
      stat1Label: 'Available Drivers',
      stat2: '24h',
      stat2Label: 'Average Response Time',
    },
  };

  const text = content[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative bg-gradient-to-br from-[#4B2E2B] via-[#4B2E2B] to-[#3a2422] rounded-2xl p-6 md:p-8 overflow-hidden shadow-xl"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A373]/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4A373]/5 rounded-full -ml-24 -mb-24 blur-3xl" />
      
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mb-3 justify-center md:justify-start"
          >
            <Sparkles className="w-5 h-5 text-[#D4A373]" />
            <span className="text-[#D4A373] text-sm">Premium Service</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-white mb-2"
          >
            {text.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white/70 text-sm md:text-base mb-6"
          >
            {text.description}
          </motion.p>

          {/* Stats */}
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <div>
              <div className="text-2xl text-white">{text.stat1}</div>
              <div className="text-xs text-white/60">{text.stat1Label}</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <div className="text-2xl text-white">{text.stat2}</div>
              <div className="text-xs text-white/60">{text.stat2Label}</div>
            </div>
          </div>
        </div>

        {/* Right Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-gradient-to-r from-[#D4A373] to-[#c89563] text-[#4B2E2B] px-8 py-4 rounded-full shadow-2xl hover:shadow-[#D4A373]/50 transition-all duration-300"
        >
          <PlusCircle className="w-6 h-6" />
          <span className="text-lg font-medium">{text.button}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
