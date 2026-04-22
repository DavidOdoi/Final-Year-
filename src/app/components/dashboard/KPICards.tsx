import { motion } from 'motion/react';
import { Package, Truck, DollarSign, Star, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardsProps {
  language: 'sw' | 'en';
}

export function KPICards({ language }: KPICardsProps) {
  const content = {
    sw: {
      cards: [
        {
          title: 'Mizigo Inayopatikana',
          value: '24',
          change: '+12%',
          trend: 'up',
          icon: Package,
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'bg-blue-50',
        },
        {
          title: 'Safari za Kazi',
          value: '3',
          change: '+2',
          trend: 'up',
          icon: Truck,
          color: 'from-orange-500 to-red-500',
          bgColor: 'bg-orange-50',
        },
        {
          title: 'Mapato ya Leo',
          value: 'UGX 12,450',
          change: '+8%',
          trend: 'up',
          icon: DollarSign,
          color: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-50',
        },
        {
          title: 'Ukaguzi',
          value: '4.8',
          change: '+0.2',
          trend: 'up',
          icon: Star,
          color: 'from-yellow-500 to-amber-500',
          bgColor: 'bg-yellow-50',
        },
      ],
    },
    en: {
      cards: [
        {
          title: 'Available Loads',
          value: '24',
          change: '+12%',
          trend: 'up',
          icon: Package,
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'bg-blue-50',
        },
        {
          title: 'Active Trips',
          value: '3',
          change: '+2',
          trend: 'up',
          icon: Truck,
          color: 'from-orange-500 to-red-500',
          bgColor: 'bg-orange-50',
        },
        {
          title: "Today's Earnings",
          value: 'UGX 12,450',
          change: '+8%',
          trend: 'up',
          icon: DollarSign,
          color: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-50',
        },
        {
          title: 'Rating',
          value: '4.8',
          change: '+0.2',
          trend: 'up',
          icon: Star,
          color: 'from-yellow-500 to-amber-500',
          bgColor: 'bg-yellow-50',
        },
      ],
    },
  };

  const text = content[language];

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {text.cards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            className="group relative"
          >
            <div className="bg-white rounded-2xl p-6 border border-[#4B2E2B]/10 shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Gradient Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} rounded-t-2xl`} />

              {/* Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className={`${card.bgColor} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 bg-gradient-to-br ${card.color} bg-clip-text text-transparent`} />
                </div>
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className={`flex items-center gap-1 text-xs ${
                    card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  <TrendIcon className="w-3 h-3" />
                  <span>{card.change}</span>
                </motion.div>
              </div>

              {/* Value */}
              <div className="mb-2">
                <div className="text-3xl text-[#4B2E2B] mb-1">{card.value}</div>
                <div className="text-sm text-[#4B2E2B]/60">{card.title}</div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}


