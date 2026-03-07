import { motion } from 'motion/react';
import { Bell, Wallet, Globe, Menu } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TopBarProps {
  isOnline: boolean;
  setIsOnline: (value: boolean) => void;
  language: 'sw' | 'en';
  setLanguage: (value: 'sw' | 'en') => void;
  onMenuClick: () => void;
}

export function TopBar({ isOnline, setIsOnline, language, setLanguage, onMenuClick }: TopBarProps) {
  const content = {
    sw: {
      greeting: 'Karibu tena',
      name: 'John Mwangi',
      online: 'Mtandaoni',
      offline: 'Nje ya mtandao',
    },
    en: {
      greeting: 'Welcome back',
      name: 'John Mwangi',
      online: 'Online',
      offline: 'Offline',
    },
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
          {/* Left: Greeting */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-[#F7EFE9] rounded-lg"
            >
              <Menu className="w-6 h-6 text-[#4B2E2B]" />
            </motion.button>
            <div>
              <div className="text-sm text-[#4B2E2B]/60">{getCurrentTime()}</div>
              <div className="text-xl text-[#4B2E2B]">{text.name}</div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Online/Offline Toggle */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 bg-[#F7EFE9] px-4 py-2 rounded-full"
            >
              <div 
                className={`w-2 h-2 rounded-full ${
                  isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                }`}
              />
              <button
                onClick={() => setIsOnline(!isOnline)}
                className="text-sm text-[#4B2E2B]"
              >
                {isOnline ? text.online : text.offline}
              </button>
            </motion.div>

            {/* Wallet */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="hidden md:flex items-center gap-2 bg-gradient-to-br from-[#D4A373] to-[#4B2E2B] text-white px-4 py-2 rounded-full shadow-lg"
            >
              <Wallet className="w-4 h-4" />
              <span className="text-sm">KES 45,320</span>
            </motion.div>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
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
                src="https://images.unsplash.com/photo-1614890085618-0e1054da74f8?w=100&h=100&fit=crop"
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