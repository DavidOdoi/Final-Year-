import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

// Import your images correctly
import CEO from "../../assets/images/CEO.png";
import odoi from '../../assets/images/odoi.png';
import onesmus from '../../assets/images/onesmus.png';
import masikaPeaceImage from '../../assets/images/peace.png';
import niwabineDorothyImage from '../../assets/images/dorothy.png';

interface TeamSectionProps {
  language: 'sw' | 'en';
}

export function TeamSection({ language }: TeamSectionProps) {
  const content = {
    sw: {
      title: 'Timu Yetu',
      subtitle:
        'Wataalamu wanaotumia teknolojia kuboresha usafirishaji wa mizigo Afrika Mashariki',
      members: [
        {
          name: 'Mutebezi Enock',
          role: 'Mkurugenzi Mkuu na Mwanzilishi',
          image: CEO
        },
        {
          name: 'Odoi David',
          role: 'Mkurugenzi wa Teknolojia',
          image: odoi
        },
        {
          name: 'Mwebesa Onesmus',
          role: 'Mkurugenzi wa Shughuli',
          image: onesmus,
        },
        {
          name: 'Masika Peace',
          role: 'Mkurugenzi wa Biashara',
          image: masikaPeaceImage,
        },
        {
          name: 'Niwabine Dorothy',
          role: 'Mkurugenzi wa Fedha',
          image: niwabineDorothyImage,
        },
      ],
    },
    en: {
      title: 'Meet Our Team',
      subtitle:
        'Experts using technology to transform freight logistics in East Africa',
      members: [
        {
          name: 'Mutebezi Enock',
          role: 'CEO & Founder',
          image: CEO,
        },
        {
          name: 'Odoi David',
          role: 'Chief Technology Officer',
          image: odoi,
        },
        {
          name: 'Mwebesa Onesmus',
          role: 'Chief Operations Officer',
          image: onesmus,
        },
        {
          name: 'Masika Peace',
          role: 'Chief Commercial Officer',
          image: masikaPeaceImage,
        },
        {
          name: 'Niwabine Dorothy',
          role: 'Chief Financial Officer',
          image: niwabineDorothyImage,
        },
      ],
    },
  };

  const text = content[language];

  return (
    <div id="team" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Team Grid */}
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

                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>

                  {/* Social Icons */}
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


