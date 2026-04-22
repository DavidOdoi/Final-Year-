interface FooterProps {
  language: 'sw' | 'en';
}

export function Footer({ language }: FooterProps) {
  const content = {
    sw: {
      tagline: 'Usafirishaji Mizigo Kwa Urahisi - Huduma ya usafirishaji wa Afrika Mashariki',
      copyright: '© 2026 Usafirishaji. Haki zote zimehifadhiwa.',
    },
    en: {
      tagline: 'Transport Goods Easily - East Africa Freight Service',
      copyright: '© 2026 ELOGISTICA. All rights reserved.',
    },
  };

  const text = content[language];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-lg mb-4">{text.tagline}</p>
          <p className="text-gray-400">{text.copyright}</p>
        </div>
      </div>
    </footer>
  );
}



