import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface EnhancedFooterProps {
  language: 'sw' | 'en';
}

export function EnhancedFooter({ language }: EnhancedFooterProps) {
  const content = {
    sw: {
      tagline: 'Safirisha Mizigo Kwa Urahisi',
      description: 'Platform ya kwanza ya usafirishaji wa mizigo katika Afrika Mashariki inayounganisha wapelekaji na madereva kwa urahisi.',
      quickLinks: {
        title: 'Viungo vya Haraka',
        links: [
          { label: 'Kuhusu Sisi', href: '#about' },
          { label: 'Huduma', href: '#services' },
          { label: 'Bei', href: '#pricing' },
          { label: 'Habari', href: '#news' },
        ],
      },
      support: {
        title: 'Msaada',
        links: [
          { label: 'Kituo cha Msaada', href: '#help' },
          { label: 'Maswali Yanayoulizwa Mara kwa Mara', href: '#faq' },
          { label: 'Wasiliana Nasi', href: '#contact' },
          { label: 'Sera ya Faragha', href: '#privacy' },
        ],
      },
      contact: {
        title: 'Wasiliana',
        email: 'info@safirisha.com',
        phone: '+254 700 123 456',
        address: 'Nairobi, Kenya',
      },
      social: 'Tufuate',
      copyright: '© 2026 Safirisha. Haki zote zimehifadhiwa.',
    },
    en: {
      tagline: 'Transport Goods Easily',
      description: 'East Africa\'s premier freight platform connecting shippers with drivers seamlessly.',
      quickLinks: {
        title: 'Quick Links',
        links: [
          { label: 'About Us', href: '#about' },
          { label: 'Services', href: '#services' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'News', href: '#news' },
        ],
      },
      support: {
        title: 'Support',
        links: [
          { label: 'Help Center', href: '#help' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Contact Us', href: '#contact' },
          { label: 'Privacy Policy', href: '#privacy' },
        ],
      },
      contact: {
        title: 'Contact',
        email: 'info@safirisha.com',
        phone: '+254 700 123 456',
        address: 'Nairobi, Kenya',
      },
      social: 'Follow Us',
      copyright: '© 2026 Safirisha. All rights reserved.',
    },
  };

  const text = content[language];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl mb-4 bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent"
            >
              {text.tagline}
            </motion.h3>
            <p className="text-gray-400 mb-6">{text.description}</p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-green-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">{text.quickLinks.title}</h4>
            <ul className="space-y-2">
              {text.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg mb-4">{text.support.title}</h4>
            <ul className="space-y-2">
              {text.support.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4">{text.contact.title}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <a href={`mailto:${text.contact.email}`} className="hover:text-orange-400 transition-colors">
                  {text.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <a href={`tel:${text.contact.phone}`} className="hover:text-orange-400 transition-colors">
                  {text.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <span>{text.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">{text.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
