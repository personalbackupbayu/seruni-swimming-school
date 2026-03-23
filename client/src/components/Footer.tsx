import { MapPin, Phone, Mail, Clock } from 'lucide-react';

/**
 * Footer Component - Modern Aquatic Minimalism
 * Informasi kontak, lokasi, dan jam operasional
 * Design: Clean footer dengan informasi yang terorganisir
 */

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Seruni Swimming School</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Sekolah renang profesional dengan pelatih bersertifikat, menyediakan program pembelajaran renang untuk semua usia dan tingkat kemampuan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-blue-100 hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#programs" className="text-blue-100 hover:text-white transition-colors">Program</a></li>
              <li><a href="#location" className="text-blue-100 hover:text-white transition-colors">Lokasi</a></li>
              <li><a href="#about" className="text-blue-100 hover:text-white transition-colors">Tentang</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <span className="text-blue-100">0878-8034-3055</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <span className="text-blue-100">seruniswimmingschool@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span className="text-blue-100">Jl. Renang No. 123, Jakarta</span>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="font-semibold mb-4">Jam Operasional</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li className="flex items-center gap-2">
                <Clock size={16} />
                <span>Senin - Jumat: 06:00 - 18:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} />
                <span>Sabtu - Minggu: 07:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-400 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-100">
          <p>&copy; 2026 Seruni Swimming School. Semua hak dilindungi.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Hubungi Kami</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
