import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Download } from 'lucide-react';

interface EarningsChartProps {
  language: 'sw' | 'en';
}

export function EarningsChart({ language }: EarningsChartProps) {
  const content = {
    sw: {
      title: 'Mapato ya Wiki Hii',
      total: 'Jumla',
      withdraw: 'Ondoa Pesa',
      days: ['Jum', 'Jmt', 'Jpi', 'Alh', 'Iju', 'Jmo', 'Jmp'],
    },
    en: {
      title: 'This Week Earnings',
      total: 'Total',
      withdraw: 'Withdraw',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  };

  const text = content[language];

  const data = [
    { day: text.days[0], amount: 8500 },
    { day: text.days[1], amount: 12000 },
    { day: text.days[2], amount: 9500 },
    { day: text.days[3], amount: 15000 },
    { day: text.days[4], amount: 11000 },
    { day: text.days[5], amount: 13500 },
    { day: text.days[6], amount: 10500 },
  ];

  const totalEarnings = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 border border-[#4B2E2B]/10 shadow-sm hover:shadow-xl transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl text-[#4B2E2B] mb-1">{text.title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-[#D4A373]">
              UGX {totalEarnings.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+12%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6 -mx-2">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B2E2B10" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: '#4B2E2B', fontSize: 12 }}
              stroke="#4B2E2B20"
            />
            <YAxis 
              tick={{ fill: '#4B2E2B', fontSize: 12 }}
              stroke="#4B2E2B20"
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #4B2E2B20',
                borderRadius: '12px',
                padding: '8px 12px',
              }}
              formatter={(value: number) => [`UGX ${value.toLocaleString()}`, text.total]}
            />
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A373" />
                <stop offset="100%" stopColor="#4B2E2B" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="amount"
              stroke="url(#earningsGradient)"
              strokeWidth={3}
              dot={{ fill: '#D4A373', r: 4 }}
              activeDot={{ r: 6, fill: '#4B2E2B' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Withdraw Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow"
      >
        <Download className="w-4 h-4" />
        <span className="text-sm">{text.withdraw}</span>
      </motion.button>

      {/* Payment Methods */}
      <div className="mt-4 flex items-center justify-center gap-3 text-xs text-[#4B2E2B]/60">
        <span>M-Pesa</span>
        <span>•</span>
        <span>Airtel Money</span>
        <span>•</span>
        <span>Bank</span>
      </div>
    </motion.div>
  );
}


