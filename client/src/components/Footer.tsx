import { Phone, Mail, MapPin, Instagram, Music } from 'lucide-react';

/**
 * Footer Component - Modern Aquatic Minimalism
 * Responsive footer yang rapi di mobile, tablet, dan desktop
 * Design: Clean layout dengan organized sections
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663469394974/VkGPRQxtHH4MgjsoPUiVdv/7496039864086037511_avatar.png_e0601b6f.jpg"
              alt="Seruni Swimming School Logo"
              className="h-20 w-auto mb-4"
            />
            <p className="text-sm text-blue-100 leading-relaxed">
              Sekolah renang profesional dengan pelatih bersertifikat internasional sejak 2012.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Menu</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#programs" className="text-blue-100 hover:text-white transition-colors">
                  Program Kelas
                </a>
              </li>
              <li>
                <a href="#location" className="text-blue-100 hover:text-white transition-colors">
                  Lokasi Kami
                </a>
              </li>
              <li>
                <a href="#about" className="text-blue-100 hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#contact" className="text-blue-100 hover:text-white transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <a href="tel:087880343055" className="text-blue-100 hover:text-white transition-colors">
                  0878-8034-3055
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:seruniswimmingschool@gmail.com" className="text-blue-100 hover:text-white transition-colors break-all">
                  seruniswimmingschool@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span className="text-blue-100 text-xs">
                  Green Lake View Waterpark, Depok
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/seruniswimmingschool?igsh=MWN3bzFoazluZGVldw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@seruniswimmingschool?_r=1&_t=ZS-94zA7mjBtjQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <Music size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8 md:my-12"></div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-blue-100">
          <div className="text-center sm:text-left">
            <p>&copy; {currentYear} Seruni Swimming School. All rights reserved.</p>
          </div>
          <div className="text-center sm:text-right space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
