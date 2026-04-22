import { motion } from 'motion/react';
import { Package, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';

interface TraderKPICardsProps {
  language: 'sw' | 'en';
}

export function TraderKPICards({ language }: TraderKPICardsProps) {
  const content = {
    sw: {
      cards: [
        {
          title: 'Usafirishaji Unaendelea',
          value: '23',
          change: '+4',
          changeLabel: 'kutoka wiki iliyopita',
          icon: Package,
          color: 'from-blue-500 to-blue-600',
        },
        {
          title: 'Mizigo Inayosubiri',
          value: '8',
          change: '-2',
          changeLabel: 'kutoka jana',
          icon: TrendingUp,
          color: 'from-orange-500 to-orange-600',
        },
        {
          title: 'Matumizi ya Mwezi',
          value: 'UGX 1.2M',
          change: '+12%',
          changeLabel: 'kutoka mwezi uliopita',
          icon: DollarSign,
          color: 'from-green-500 to-green-600',
        },
        {
          title: 'Kiwango cha Wakati',
          value: '94%',
          change: '+3%',
          changeLabel: 'kutoka robo iliyopita',
          icon: CheckCircle,
          color: 'from-purple-500 to-purple-600',
        },
      ],
    },
    en: {
      cards: [
        {
          title: 'Active Shipments',
          value: '23',
          change: '+4',
          changeLabel: 'from last week',
          icon: Package,
          color: 'from-blue-500 to-blue-600',
        },
        {
          title: 'Pending Loads',
          value: '8',
          change: '-2',
          changeLabel: 'from yesterday',
          icon: TrendingUp,
          color: 'from-orange-500 to-orange-600',
        },
        {
          title: 'Monthly Spend',
          value: 'UGX 1.2M',
          change: '+12%',
          changeLabel: 'from last month',
          icon: DollarSign,
          color: 'from-green-500 to-green-600',
        },
        {
          title: 'On-Time Rate',
          value: '94%',
          change: '+3%',
          changeLabel: 'from last quarter',
          icon: CheckCircle,
          color: 'from-purple-500 to-purple-600',
        },
      ],
    },
  };

  const text = content[language];

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {text.cards.map((card, index) => {
        const Icon = card.icon;
        const isPositive = card.change.startsWith('+');

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#4B2E2B]/5"
          >
            {/* Icon */}
            <div className="flex items-start justify-between mb-4">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className={`px-2 py-1 rounded-full text-xs ${
                  isPositive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {card.change}
              </motion.div>
            </div>

            {/* Value */}
            <div className="mb-2">
              <div className="text-3xl text-[#4B2E2B] mb-1">{card.value}</div>
              <div className="text-sm text-[#4B2E2B]/60">{card.title}</div>
            </div>

            {/* Change Label */}
            <div className="text-xs text-[#4B2E2B]/40">{card.changeLabel}</div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D4A373]/5 to-transparent rounded-full -mr-8 -mt-8 blur-2xl" />
          </motion.div>
        );
      })}
    </div>
  );
}



