import { motion } from 'motion/react';
import { Shield, Clock, DollarSign, Globe, HeadphonesIcon, FileCheck } from 'lucide-react';

interface FeaturesSectionProps {
  language: 'sw' | 'en';
}

export function FeaturesSection({ language }: FeaturesSectionProps) {
  const content = {
    sw: {
      title: 'Kwa Nini Usafirishaji?',
      subtitle: 'Huduma zinazokamilika za usafirishaji wa mizigo',
      features: [
        {
          icon: Shield,
          title: 'Usalama wa Mizigo',
          description: 'Bima kamili na ufuatiliaji wa GPS kuhakikisha mizigo yako iko salama',
        },
        {
          icon: Clock,
          title: 'Utoaji wa Wakati',
          description: 'Ulinganishaji wa haraka na madereva wa kuaminika kwa ajili ya usafirishaji wa wakati',
        },
        {
          icon: DollarSign,
          title: 'Bei Nafuu',
          description: 'Bei za ushindani bila ada za kufichwa. Lipa tu kwa kile unachohitaji',
        },
        {
          icon: Globe,
          title: 'Usafirishaji wa Kikanda',
          description: 'Safari za usafirishaji bila mshono katika nchi za Afrika Mashariki',
        },
        {
          icon: HeadphonesIcon,
          title: 'Msaada wa Saa 24/7',
          description: 'Timu yetu ya msaada iko tayari kukusaidia wakati wowote',
        },
        {
          icon: FileCheck,
          title: 'Nyaraka za Dijiti',
          description: 'Usimamizi wa nyaraka zote za forodha na mipaka mtandaoni',
        },
      ],
    },
    en: {
      title: 'Why Choose ELOGISTICA?',
      subtitle: 'Complete freight logistics solutions',
      features: [
        {
          icon: Shield,
          title: 'Cargo Security',
          description: 'Full insurance and GPS tracking to ensure your goods are safe',
        },
        {
          icon: Clock,
          title: 'On-Time Delivery',
          description: 'Fast matching with reliable drivers for timely transportation',
        },
        {
          icon: DollarSign,
          title: 'Affordable Pricing',
          description: 'Competitive rates with no hidden fees. Pay only for what you need',
        },
        {
          icon: Globe,
          title: 'Regional Transport',
          description: 'Seamless freight journeys across East African countries',
        },
        {
          icon: HeadphonesIcon,
          title: '24/7 Support',
          description: 'Our support team is ready to help you anytime',
        },
        {
          icon: FileCheck,
          title: 'Digital Documentation',
          description: 'Manage all customs and border documents online',
        },
      ],
    },
  };

  const text = content[language];

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">{text.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{text.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {text.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



