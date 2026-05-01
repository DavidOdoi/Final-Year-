import { motion } from 'motion/react';
import { Package, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';
import type { Load } from '../../lib/api';
import { formatCurrency } from '../../lib/logistics';

interface TraderKPICardsProps {
  language: 'sw' | 'en';
  loads: Load[];
  isLoading?: boolean;
}

export function TraderKPICards({ language, loads, isLoading = false }: TraderKPICardsProps) {
  const content = {
    sw: {
      activeShipments: 'Usafirishaji Unaendelea',
      pendingLoads: 'Mizigo Inayosubiri',
      monthlySpend: 'Matumizi ya Mwezi',
      completionRate: 'Kiwango cha Kukamilika',
      loading: 'Inapakia takwimu...',
      activeHint: 'Mizigo iliyopewa dereva au iliyoko njiani',
      pendingHint: 'Mizigo inayosubiri mpangilio wa dereva',
      spendHint: 'Jumla ya bei na bajeti za mwezi huu',
      completionHint: 'Sehemu ya mizigo iliyofikishwa salama',
    },
    en: {
      activeShipments: 'Active Shipments',
      pendingLoads: 'Pending Loads',
      monthlySpend: 'Monthly Spend',
      completionRate: 'Completion Rate',
      loading: 'Loading metrics...',
      activeHint: 'Loads already assigned or in transit',
      pendingHint: 'Loads still waiting for a driver',
      spendHint: 'Combined prices and budgets this month',
      completionHint: 'Share of loads delivered successfully',
    },
  };

  const text = content[language];
  const now = new Date();
  const monthlyLoads = loads.filter((load) => {
    const rawDate = load.createdAt || load.updatedAt;
    if (!rawDate) {
      return false;
    }

    const date = new Date(rawDate);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });

  const activeShipments = loads.filter((load) => ['assigned', 'in_transit'].includes(load.status || '')).length;
  const pendingLoads = loads.filter((load) => (load.status || 'open') === 'open').length;
  const monthlySpend = monthlyLoads.reduce((sum, load) => sum + (load.price || load.budget || 0), 0);
  const deliveredLoads = loads.filter((load) => load.status === 'delivered').length;
  const completionRate = loads.length > 0 ? Math.round((deliveredLoads / loads.length) * 100) : 0;

  const cards = [
    {
      title: text.activeShipments,
      value: isLoading ? text.loading : String(activeShipments),
      hint: text.activeHint,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: text.pendingLoads,
      value: isLoading ? text.loading : String(pendingLoads),
      hint: text.pendingHint,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: text.monthlySpend,
      value: isLoading ? text.loading : formatCurrency(monthlySpend, language, true),
      hint: text.spendHint,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      title: text.completionRate,
      value: isLoading ? text.loading : `${completionRate}%`,
      hint: text.completionHint,
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

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
            </div>

            {/* Value */}
            <div className="mb-2">
              <div className="text-3xl text-[#4B2E2B] mb-1">{card.value}</div>
              <div className="text-sm text-[#4B2E2B]/60">{card.title}</div>
            </div>

            {/* Change Label */}
            <div className="text-xs text-[#4B2E2B]/40">{card.hint}</div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D4A373]/5 to-transparent rounded-full -mr-8 -mt-8 blur-2xl" />
          </motion.div>
        );
      })}
    </div>
  );
}



