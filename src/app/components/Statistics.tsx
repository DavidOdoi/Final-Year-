import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Users, Package, Award, Globe, Zap } from 'lucide-react';

interface StatisticsProps {
  language: 'sw' | 'en';
}

function Counter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Statistics({ language }: StatisticsProps) {
  const content = {
    sw: {
      title: 'Athari Yetu',
      subtitle: 'Kubadilisha usafirishaji wa mizigo katika Afrika Mashariki',
      badge: 'Takwimu za Moja kwa Moja',
      stats: [
        {
          value: 10000,
          suffix: '+',
          label: 'Madereva Waliojisajili',
          subtext: 'Madereva wa kuaminika',
          icon: Users,
          color: 'from-blue-500 to-cyan-500',
        },
        {
          value: 50000,
          suffix: '+',
          label: 'Mizigo Iliyosafirisha',
          subtext: 'Safari zilizokamilika',
          icon: Package,
          color: 'from-purple-500 to-pink-500',
        },
        {
          value: 8,
          suffix: '',
          label: 'Nchi za Afrika Mashariki',
          subtext: 'Mtandao wa kikanda',
          icon: Globe,
          color: 'from-orange-500 to-red-500',
        },
        {
          value: 98,
          suffix: '%',
          label: 'Kuridhika kwa Wateja',
          subtext: 'Ukaguzi wa wastani',
          icon: Award,
          color: 'from-green-500 to-emerald-500',
        },
      ],
      additionalStats: [
        {
          value: '4.8',
          label: 'Ukaguzi wa Wastani',
          icon: Award,
        },
        {
          value: '24/7',
          label: 'Msaada wa Wateja',
          icon: Zap,
        },
        {
          value: '2hrs',
          label: 'Muda wa Wastani wa Ulinganishaji',
          icon: TrendingUp,
        },
      ],
    },
    en: {
      title: 'Our Impact',
      subtitle: 'Transforming freight logistics across East Africa',
      badge: 'Live Statistics',
      stats: [
        {
          value: 10000,
          suffix: '+',
          label: 'Registered Drivers',
          subtext: 'Verified professionals',
          icon: Users,
          color: 'from-blue-500 to-cyan-500',
        },
        {
          value: 50000,
          suffix: '+',
          label: 'Loads Delivered',
          subtext: 'Successful trips',
          icon: Package,
          color: 'from-purple-500 to-pink-500',
        },
        {
          value: 8,
          suffix: '',
          label: 'East African Countries',
          subtext: 'Regional network',
          icon: Globe,
          color: 'from-orange-500 to-red-500',
        },
        {
          value: 98,
          suffix: '%',
          label: 'Customer Satisfaction',
          subtext: 'Average rating',
          icon: Award,
          color: 'from-green-500 to-emerald-500',
        },
      ],
      additionalStats: [
        {
          value: '4.8',
          label: 'Average Rating',
          icon: Award,
        },
        {
          value: '24/7',
          label: 'Customer Support',
          icon: Zap,
        },
        {
          value: '2hrs',
          label: 'Average Match Time',
          icon: TrendingUp,
        },
      ],
    },
  };

  const text = content[language];

  return (
    <div className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm uppercase tracking-wide">{text.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl mb-4 text-white"
          >
            {text.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
          >
            {text.subtitle}
          </motion.p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 max-w-7xl mx-auto">
          {text.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 hover:border-white/40 transition-all overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color}`}
                  />

                  {/* Icon */}
                  <motion.div
                    animate={{
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: index * 0.2 }}
                    className="relative z-10 mb-4"
                  >
                    <div className={`inline-flex w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${stat.color} rounded-2xl items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Number */}
                  <div className="relative z-10 mb-2">
                    <div className="text-4xl md:text-5xl lg:text-6xl text-white mb-1">
                      <Counter end={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div className="text-white/60 text-xs md:text-sm mb-2">{stat.subtext}</div>
                    <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
                  </div>

                  {/* Decorative Corner */}
                  <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-20 group-hover:opacity-30 blur-2xl transition-opacity`} />
                </div>

                {/* Floating Particle Effect */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className={`absolute -top-2 right-8 w-3 h-3 bg-gradient-to-br ${stat.color} rounded-full`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Additional Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8">
            <div className="grid grid-cols-3 gap-6 md:gap-12">
              {text.additionalStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                      className="inline-block mb-3"
                    >
                      <Icon className="w-8 h-8 text-orange-400" />
                    </motion.div>
                    <div className="text-2xl md:text-3xl text-white mb-1">{stat.value}</div>
                    <div className="text-white/70 text-xs md:text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}



