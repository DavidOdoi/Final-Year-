import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  Wallet, 
  BarChart3, 
  Settings,
  ChevronLeft,
  Home,
  X,
  PlusCircle,
  Truck,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

interface TraderSidebarProps {
  language: 'sw' | 'en';
  isOpen?: boolean;
  onClose?: () => void;
}

export function TraderSidebar({ language, isOpen = false, onClose }: TraderSidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const content = {
    sw: {
      logo: 'Usafirishaji',
      tagline: 'Mfanyabiashara',
      menu: [
        { id: 'dashboard', label: 'Dashibodi', icon: LayoutDashboard, path: '/trader-dashboard' },
        { id: 'post-load', label: 'Tuma Mzigo', icon: PlusCircle, path: '/post-load' },
        { id: 'marketplace', label: 'Soko la Malori', icon: TrendingUp, path: '/truck-marketplace' },
        { id: 'shipments', label: 'Usafirishaji Wangu', icon: Truck, path: '/trader-dashboard' },
        { id: 'tracking', label: 'Ufuatiliaji', icon: MapPin, path: '/trader-dashboard' },
        { id: 'payments', label: 'Malipo', icon: Wallet, path: '/trader-dashboard' },
        { id: 'analytics', label: 'Uchambuzi', icon: BarChart3, path: '/trader-dashboard' },
        { id: 'settings', label: 'Mipangilio', icon: Settings, path: '/trader-dashboard' },
      ],
    },
    en: {
      logo: 'ELOGISTICA',
      tagline: 'Trader',
      menu: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/trader-dashboard' },
        { id: 'post-load', label: 'Post Load', icon: PlusCircle, path: '/post-load' },
        { id: 'marketplace', label: 'Truck Marketplace', icon: TrendingUp, path: '/truck-marketplace' },
        { id: 'shipments', label: 'My Shipments', icon: Truck, path: '/trader-dashboard' },
        { id: 'tracking', label: 'Tracking', icon: MapPin, path: '/trader-dashboard' },
        { id: 'payments', label: 'Payments', icon: Wallet, path: '/trader-dashboard' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/trader-dashboard' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/trader-dashboard' },
      ],
    },
  };

  const text = content[language];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen || window.innerWidth >= 1024 ? 0 : -256
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-[#4B2E2B]/10 shadow-lg z-50 w-64"
        style={{ width: isCollapsed ? 80 : 256 }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#4B2E2B]/10">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Link to="/" className="block">
                    <div className="text-2xl text-[#4B2E2B]">{text.logo}</div>
                    <div className="text-xs text-[#D4A373]">{text.tagline}</div>
                  </Link>
                </motion.div>
              )}
              <div className="flex items-center gap-2">
                {/* Mobile Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="lg:hidden p-2 hover:bg-[#F7EFE9] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#4B2E2B]" />
                </motion.button>
                {/* Collapse Button (Desktop Only) */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden lg:block p-2 hover:bg-[#F7EFE9] rounded-lg transition-colors"
                >
                  <ChevronLeft 
                    className={`w-5 h-5 text-[#4B2E2B] transition-transform ${
                      isCollapsed ? 'rotate-180' : ''
                    }`}
                  />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {/* Back to Home */}
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#4B2E2B]/70 hover:bg-[#F7EFE9] hover:text-[#4B2E2B] transition-all duration-200 mb-4"
              >
                <Home className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm"
                  >
                    {language === 'sw' ? 'Rudi Nyumbani' : 'Back to Home'}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {text.menu.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <Link key={item.id} to={item.path}>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveItem(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-200
                      ${isActive 
                        ? 'bg-[#4B2E2B] text-white shadow-lg shadow-[#4B2E2B]/20' 
                        : 'text-[#4B2E2B]/70 hover:bg-[#F7EFE9] hover:text-[#4B2E2B]'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicatorTrader"
                        className="ml-auto w-1.5 h-1.5 bg-[#D4A373] rounded-full"
                      />
                    )}
                  </motion.button>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#4B2E2B]/10">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-br from-[#D4A373]/10 to-[#4B2E2B]/5 rounded-xl p-4"
              >
                <div className="text-xs text-[#4B2E2B]/60 mb-1">
                  {language === 'sw' ? 'Unahitaji msaada?' : 'Need help?'}
                </div>
                <div className="text-sm text-[#4B2E2B]">
                  {language === 'sw' ? 'Msaada 24/7' : '24/7 Support'}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3 w-full bg-[#4B2E2B] text-white text-xs py-2 rounded-lg hover:bg-[#4B2E2B]/90 transition-colors"
                >
                  {language === 'sw' ? 'Wasiliana Nasi' : 'Contact Us'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}


