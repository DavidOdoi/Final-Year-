import { Smartphone, Users, Truck, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface HowItWorksProps {
  language: 'sw' | 'en';
}

export function HowItWorks({ language }: HowItWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const content = {
    sw: {
      title: 'Jinsi Inavyofanya Kazi',
      subtitle: 'Safari rahisi ya hatua nne kutoka kuchapisha hadi kufikisha',
      cta: 'Anza Sasa',
      steps: [
        {
          number: 1,
          icon: Smartphone,
          title: 'Chapisha Mzigo Wako',
          description: 'Weka maelezo ya mzigo wako, mahali pa kuchukua na mahali pa kupeleka. Toa maelezo ya ziada unayohitaji.',
          features: [
            'Fomu rahisi ya kujaza',
            'Upimaji wa bei wa papo hapo',
            'Chaguo la aina ya lori',
          ],
          color: 'from-blue-500 to-cyan-500',
        },
        {
          number: 2,
          icon: Users,
          title: 'Linganishwa na Dereva',
          description: 'Mfumo wetu wa AI unalinganisha mzigo wako na dereva bora zaidi anayepatikana. Pokea zabuni kwa dakika.',
          features: [
            'Ulinganishaji wa mwenendo',
            'Madereva waliopitishwa',
            'Ukaguzi wa wakati halisi',
          ],
          color: 'from-purple-500 to-pink-500',
        },
        {
          number: 3,
          icon: Truck,
          title: 'Safirisha na Usalama',
          description: 'Dereva anachukua na kusafirisha mzigo wako kwa usalama. Malipo yamelindwa mpaka mzigo unafikishwa.',
          features: [
            'Bima ya mzigo',
            'Msaada wa forodha',
            'Malipo salama',
          ],
          color: 'from-orange-500 to-red-500',
        },
        {
          number: 4,
          icon: MapPin,
          title: 'Fuatilia na Pokea',
          description: 'Angalia safari ya mzigo wako wakati wote. Pata taarifa za kila hatua mpaka kufikisha.',
          features: [
            'Ufuatiliaji wa GPS wa moja kwa moja',
            'Taarifa za SMS',
            'Uthibitisho wa ufikishaji',
          ],
          color: 'from-green-500 to-emerald-500',
        },
      ],
    },
    en: {
      title: 'How It Works',
      subtitle: 'Simple four-step journey from posting to delivery',
      cta: 'Get Started',
      steps: [
        {
          number: 1,
          icon: Smartphone,
          title: 'Post Your Load',
          description: 'Enter your cargo details, pickup and delivery locations. Provide any special requirements you need.',
          features: [
            'Easy-to-fill form',
            'Instant price estimates',
            'Truck type selection',
          ],
          color: 'from-blue-500 to-cyan-500',
        },
        {
          number: 2,
          icon: Users,
          title: 'Get Matched with Driver',
          description: 'Our AI system matches your load with the best available driver. Receive bids within minutes.',
          features: [
            'Smart matching algorithm',
            'Verified drivers',
            'Real-time ratings',
          ],
          color: 'from-purple-500 to-pink-500',
        },
        {
          number: 3,
          icon: Truck,
          title: 'Transport Securely',
          description: 'Driver picks up and transports your cargo safely. Payment is secured until delivery is confirmed.',
          features: [
            'Cargo insurance',
            'Customs support',
            'Secure payments',
          ],
          color: 'from-orange-500 to-red-500',
        },
        {
          number: 4,
          icon: MapPin,
          title: 'Track and Receive',
          description: 'Monitor your shipment in real-time. Get updates at every milestone until delivery.',
          features: [
            'Live GPS tracking',
            'SMS notifications',
            'Delivery confirmation',
          ],
          color: 'from-green-500 to-emerald-500',
        },
      ],
    },
  };

  const text = content[language];

  return (
    <div id="how-it-works" ref={containerRef} className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl opacity-20 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-20 blur-xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-green-500 text-white px-5 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wide">{language === 'sw' ? 'Mchakato Rahisi' : 'Simple Process'}</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {text.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">{text.subtitle}</p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
          {text.steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  {/* Icon & Number Side */}
                  <div className={`${isEven ? 'md:order-1' : 'md:order-2'} flex justify-center`}>
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="relative"
                    >
                      {/* Main Card */}
                      <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 rounded-3xl`} />
                        
                        {/* Floating Number Badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1, type: "spring", bounce: 0.6 }}
                          className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl shadow-lg flex items-center justify-center transform rotate-12`}
                        >
                          <span className="text-3xl text-white">{step.number}</span>
                        </motion.div>

                        {/* Icon */}
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                          className="relative z-10"
                        >
                          <div className={`w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mb-6 shadow-lg`}>
                            <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                          </div>
                        </motion.div>

                        {/* Decorative Circles */}
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className={`absolute bottom-4 right-4 w-32 h-32 bg-gradient-to-br ${step.color} rounded-full opacity-10 blur-2xl`}
                        />
                      </div>

                      {/* Connecting Line (only show between steps, not after last one) */}
                      {index < text.steps.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          className={`hidden md:block absolute ${isEven ? 'left-1/2' : 'right-1/2'} top-full w-1 h-20 bg-gradient-to-b ${step.color} origin-top`}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Content Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className={`${isEven ? 'md:order-2' : 'md:order-1'}`}
                  >
                    <div className="space-y-6">
                      <div>
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="text-3xl md:text-4xl mb-4"
                        >
                          {step.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="text-lg md:text-xl text-gray-600 leading-relaxed"
                        >
                          {step.description}
                        </motion.p>
                      </div>

                      {/* Feature List */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="space-y-3"
                      >
                        {step.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.1 + fIndex * 0.05 }}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-3"
                          >
                            <div className={`w-6 h-6 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 text-lg">{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-12 py-5 rounded-full text-xl shadow-2xl hover:shadow-orange-300 transition-shadow"
          >
            {text.cta}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}



