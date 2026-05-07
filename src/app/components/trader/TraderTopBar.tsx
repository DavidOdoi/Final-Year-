import { motion } from 'motion/react';
import { Bell, Globe, Menu, Building2 } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TraderTopBarProps {
  language: 'sw' | 'en';
  setLanguage: (value: 'sw' | 'en') => void;
  onMenuClick: () => void;
  companyName?: string;
}

export function TraderTopBar({
  language,
  setLanguage,
  onMenuClick,
  companyName,
}: TraderTopBarProps) {
  const content = {
    sw: { company: 'Kilimanjaro Exports Ltd' },
    en: { company: 'Kilimanjaro Exports Ltd' },
  };

  const text = content[language];

  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return language === 'sw' ? 'Habari za asubuhi' : 'Good morning';
    if (hour < 17) return language === 'sw' ? 'Habari za mchana' : 'Good afternoon';
    return language === 'sw' ? 'Habari za jioni' : 'Good evening';
  };

  return (
    <header className="relative bg-white border-b border-[#4B2E2B]/10 sticky top-0 z-30 shadow-sm">
      <div className="px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Left: Company Info */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-[#F7EFE9] rounded-lg"
            >
              <Menu className="w-6 h-6 text-[#4B2E2B]" />
            </motion.button>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="hidden md:flex w-12 h-12 bg-gradient-to-br from-[#D4A373] to-[#4B2E2B] rounded-xl items-center justify-center"
              >
                <Building2 className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="text-sm text-[#4B2E2B]/60">{getCurrentTime()}</div>
                <div className="text-lg md:text-xl text-[#4B2E2B]">{companyName || text.company}</div>
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3 md:gap-4">

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'sw' ? 'en' : 'sw')}
              className="p-2 hover:bg-[#F7EFE9] rounded-full transition-colors"
            >
              <Globe className="w-5 h-5 text-[#4B2E2B]" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 hover:bg-[#F7EFE9] rounded-full transition-colors"
            >
              <Bell className="w-5 h-5 text-[#4B2E2B]" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
            </motion.button>

            {/* Profile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4A373] shadow-md"
            >
              <ImageWithFallback
                src="yes.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
