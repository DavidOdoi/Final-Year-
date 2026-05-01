import { motion } from 'motion/react';
import { BarChart3, MapPin, Package, TrendingUp } from 'lucide-react';
import type { Load } from '../../lib/api';
import { formatCurrency, getLoadRoute, getMonthlySpendSeries } from '../../lib/logistics';

interface SpendAnalyticsProps {
  language: 'sw' | 'en';
  loads: Load[];
  isLoading?: boolean;
}

export function SpendAnalytics({ language, loads, isLoading = false }: SpendAnalyticsProps) {
  const content = {
    sw: {
      title: 'Uchambuzi wa Matumizi',
      subtitle: 'Muhtasari wa miezi sita ya gharama za usafirishaji.',
      loading: 'Inapakia uchambuzi wa matumizi...',
      empty: 'Tuma mzigo wako wa kwanza ili kuona mwenendo wa matumizi hapa.',
      thisMonth: 'Mwezi huu',
      shipments: 'Mizigo',
      trend: 'Mabadiliko',
      busiestLane: 'Njia yenye shughuli zaidi',
      up: 'juu ya mwezi uliopita',
      down: 'chini ya mwezi uliopita',
      steady: 'Hakuna mabadiliko kutoka mwezi uliopita',
      noLane: 'Hakuna njia bado',
    },
    en: {
      title: 'Spend Analytics',
      subtitle: 'Six-month snapshot of your freight spending.',
      loading: 'Loading spend analytics...',
      empty: 'Post your first load to start seeing spend trends here.',
      thisMonth: 'This month',
      shipments: 'Shipments',
      trend: 'Change',
      busiestLane: 'Busiest lane',
      up: 'above last month',
      down: 'below last month',
      steady: 'No change from last month',
      noLane: 'No routes yet',
    },
  };

  const text = content[language];

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-6 text-sm text-[#4B2E2B]/60 shadow-md">
        {text.loading}
      </div>
    );
  }

  const series = getMonthlySpendSeries(loads, language);
  const currentMonth = series[series.length - 1] || { month: '-', spend: 0, shipments: 0 };
  const previousMonth = series[series.length - 2] || { month: '-', spend: 0, shipments: 0 };
  const peakSpend = series.reduce((highest, item) => Math.max(highest, item.spend), 0);

  const trendDelta =
    previousMonth.spend > 0
      ? Math.round(((currentMonth.spend - previousMonth.spend) / previousMonth.spend) * 100)
      : currentMonth.spend > 0
        ? 100
        : 0;

  const trendLabel =
    trendDelta > 0
      ? `${trendDelta}% ${text.up}`
      : trendDelta < 0
        ? `${Math.abs(trendDelta)}% ${text.down}`
        : text.steady;

  const laneMap = new Map<string, { route: string; shipments: number; spend: number }>();

  loads.forEach((load) => {
    const route = getLoadRoute(load, language);
    const label = `${route.from} -> ${route.to}`;
    const current = laneMap.get(label) || { route: label, shipments: 0, spend: 0 };

    current.shipments += 1;
    current.spend += load.price || load.budget || 0;

    laneMap.set(label, current);
  });

  const busiestLane =
    [...laneMap.values()].sort((left, right) => {
      if (right.shipments !== left.shipments) {
        return right.shipments - left.shipments;
      }

      return right.spend - left.spend;
    })[0] || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-[#4B2E2B]/5 bg-white p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl text-[#4B2E2B]">{text.title}</h3>
          <p className="mt-1 text-sm text-[#4B2E2B]/60">{text.subtitle}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4A373] to-[#4B2E2B] shadow-lg">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
      </div>

      {loads.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-[#F7EFE9] p-4 text-sm text-[#4B2E2B]/65">
          {text.empty}
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#F7EFE9] p-4">
              <div className="text-xs text-[#4B2E2B]/60">{text.thisMonth}</div>
              <div className="mt-1 text-lg text-[#4B2E2B]">
                {formatCurrency(currentMonth.spend, language, true)}
              </div>
            </div>
            <div className="rounded-xl bg-[#F7EFE9] p-4">
              <div className="text-xs text-[#4B2E2B]/60">{text.shipments}</div>
              <div className="mt-1 text-lg text-[#4B2E2B]">{currentMonth.shipments}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between text-xs text-[#4B2E2B]/60">
              <span>{text.title}</span>
              <span>{currentMonth.month}</span>
            </div>

            <div className="flex h-36 items-end gap-3">
              {series.map((item, index) => {
                const height = peakSpend > 0 ? Math.max(12, (item.spend / peakSpend) * 100) : 10;

                return (
                  <div key={`${item.month}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-full w-full items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: index * 0.08 + 0.1, duration: 0.5 }}
                        className="w-full rounded-t-xl bg-gradient-to-t from-[#4B2E2B] to-[#D4A373]"
                        title={`${item.month}: ${formatCurrency(item.spend, language)}`}
                      />
                    </div>
                    <div className="text-[11px] text-[#4B2E2B]/60">{item.month}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 rounded-xl bg-[#F7EFE9] p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <TrendingUp className="h-5 w-5 text-[#D4A373]" />
              </div>
              <div>
                <div className="text-xs text-[#4B2E2B]/60">{text.trend}</div>
                <div className="text-sm text-[#4B2E2B]">{trendLabel}</div>
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr_auto] items-start gap-3 rounded-xl bg-[#F7EFE9] p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <MapPin className="h-5 w-5 text-[#4B2E2B]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-[#4B2E2B]/60">{text.busiestLane}</div>
                <div className="truncate text-sm text-[#4B2E2B]">
                  {busiestLane?.route || text.noLane}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#4B2E2B]/60">
                <Package className="h-3.5 w-3.5" />
                <span>{busiestLane?.shipments || 0}</span>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="absolute right-0 top-0 h-24 w-24 -translate-y-6 translate-x-6 rounded-full bg-gradient-to-br from-[#D4A373]/10 to-transparent blur-2xl" />
    </motion.div>
  );
}
