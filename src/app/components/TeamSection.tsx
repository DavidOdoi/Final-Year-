import { motion } from 'motion/react';
import { Linkedin, Twitter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TeamSectionProps {
  language: 'sw' | 'en';
}

export function TeamSection({ language }: TeamSectionProps) {
  const content = {
    sw: {
      title: 'Timu Yetu',
      subtitle: 'Wataalamu wanaotumia teknolojia kuboresha usafirishaji wa mizigo Afrika Mashariki',
      members: [
        {
          name: 'Amani Mwangi',
          role: 'Mkurugenzi Mkuu na Mwanzilishi',
          image: 'https://images.unsplash.com/photo-1617244147030-8bd6f9e21d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBtYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc3MTg0MTc2OXww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Zuri Okafor',
          role: 'Mkurugenzi wa Teknolojia',
          image: 'https://images.unsplash.com/photo-1739300293504-234817eead52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE4NDE3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Jabari Kamau',
          role: 'Mkurugenzi wa Shughuli',
          image: 'https://images.unsplash.com/photo-1573496528388-2c5e0088d40f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdGVjaCUyMGVudHJlcHJlbmV1cnxlbnwxfHx8fDE3NzE4NDE3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Nia Abebe',
          role: 'Mkurugenzi wa Biashara',
          image: 'https://images.unsplash.com/photo-1712700004723-4adc42a3532f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbG9naXN0aWNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTg0MTc2OXww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Kofi Mensah',
          role: 'Mkurugenzi wa Fedha',
          image: 'https://images.unsplash.com/photo-1559154352-06e29e1e11aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdGVhbSUyMGxlYWRlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTg0MTc3MHww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Imani Nkrumah',
          role: 'Mkurugenzi wa Huduma kwa Wateja',
          image: 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcxODQxNzcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
    en: {
      title: 'Meet Our Team',
      subtitle: 'Experts using technology to transform freight logistics in East Africa',
      members: [
        {
          name: 'Amani Mwangi',
          role: 'CEO & Founder',
          image: 'https://images.unsplash.com/photo-1617244147030-8bd6f9e21d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBtYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc3MTg0MTc2OXww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Zuri Okafor',
          role: 'Chief Technology Officer',
          image: 'https://images.unsplash.com/photo-1739300293504-234817eead52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE4NDE3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Jabari Kamau',
          role: 'Chief Operations Officer',
          image: 'https://images.unsplash.com/photo-1573496528388-2c5e0088d40f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdGVjaCUyMGVudHJlcHJlbmV1cnxlbnwxfHx8fDE3NzE4NDE3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Nia Abebe',
          role: 'Chief Commercial Officer',
          image: 'https://images.unsplash.com/photo-1712700004723-4adc42a3532f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbG9naXN0aWNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTg0MTc2OXww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Kofi Mensah',
          role: 'Chief Financial Officer',
          image: 'https://images.unsplash.com/photo-1559154352-06e29e1e11aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdGVhbSUyMGxlYWRlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTg0MTc3MHww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Imani Nkrumah',
          role: 'Head of Customer Success',
          image: 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcxODQxNzcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
  };

  const text = content[language];

  return (
    <div id="team" className="py-16 md:py-24 bg-gray-50">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {text.members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
