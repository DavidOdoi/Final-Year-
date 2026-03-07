import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';

interface SpendAnalyticsProps {
  language: 'sw' | 'en';
}

export function SpendAnalytics({ language }: SpendAnalyticsProps) {
  const content = {
    sw: {
      title: 'Uchambuzi wa Matumizi',
      period: 'Miezi 6 iliyopita',
      total: 'Jumla ya Matumizi',
      average: 'Wastani wa Mwezi',
      trend: '+18% kutoka mwaka uliopita',
    },
    en: {
      title: 'Spend Analytics',
      period: 'Last 6 Months',
      total: 'Total Spend',
      average: 'Monthly Average',
      trend: '+18% from last year',
    },
  };

  const text = content[language];

  // Mock data for the chart
  const data = [
    { month: 'Sep', spend: 850000, shipments: 18 },
    { month: 'Oct', spend: 920000, shipments: 21 },
    { month: 'Nov', spend: 780000, shipments: 16 },
    { month: 'Dec', spend: 1100000, shipments: 25 },
    { month: 'Jan', spend: 950000, shipments: 20 },
    { month: 'Feb', spend: 1200000, shipments: 27 },
  ];

  const totalSpend = data.reduce((sum, item) => sum + item.spend, 0);
  const averageSpend = totalSpend / data.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#4B2E2B]/5"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl text-[#4B2E2B]">{text.title}</h3>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs"
          >
            {text.trend}
          </motion.div>
        </div>
        <div className="text-sm text-[#4B2E2B]/60">{text.period}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ y: -2, scale: 1.02 }}
          className="bg-gradient-to-br from-[#4B2E2B] to-[#3a2422] rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-[#D4A373]" />
            </div>
            <span className="text-xs text-white/60">{text.total}</span>
          </div>
          <div className="text-2xl text-white">
            KES {(totalSpend / 1000000).toFixed(1)}M
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2, scale: 1.02 }}
          className="bg-gradient-to-br from-[#D4A373] to-[#c89563] rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-white/80">{text.average}</span>
          </div>
          <div className="text-2xl text-white">
            KES {Math.round(averageSpend / 1000)}K
          </div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4B2E2B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4B2E2B" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B2E2B" opacity={0.1} />
            <XAxis 
              dataKey="month" 
              stroke="#4B2E2B" 
              opacity={0.6}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#4B2E2B" 
              opacity={0.6}
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #4B2E2B20',
                borderRadius: '12px',
                padding: '12px',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'spend') {
                  return [`KES ${(value / 1000).toFixed(0)}K`, 'Spend'];
                }
                return [value, 'Shipments'];
              }}
            />
            <Bar 
              dataKey="spend" 
              fill="url(#colorSpend)" 
              radius={[8, 8, 0, 0]}
            />
            <Line 
              type="monotone" 
              dataKey="shipments" 
              stroke="#D4A373" 
              strokeWidth={2}
              dot={{ fill: '#D4A373', r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[#4B2E2B]/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#4B2E2B] rounded-sm" />
          <span className="text-xs text-[#4B2E2B]/60">
            {language === 'sw' ? 'Matumizi' : 'Spend'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#D4A373] rounded-sm" />
          <span className="text-xs text-[#4B2E2B]/60">
            {language === 'sw' ? 'Usafirishaji' : 'Shipments'}
          </span>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4A373]/5 to-transparent rounded-full -mr-16 -mt-16 blur-3xl" />
    </motion.div>
  );
}
