import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

/**
 * WhatsApp Floating Button Component
 * Sticky button di bawah layar untuk menghubungi via WhatsApp
 * Design: Modern dengan animasi hover dan pulse effect
 */

export default function WhatsAppFloatingButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = '6287880343055'; // Format: country code + number tanpa +
  const whatsappMessage = 'Halo! Saya tertarik untuk mendaftar di Seruni Swimming School. Bisa tolong informasi lebih lanjut?';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pulse Animation Background */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-20 group-hover:opacity-30 transition-opacity"></div>

        {/* Main Button */}
        <div
          className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        >
          <MessageCircle size={24} className="sm:w-7 sm:h-7 text-white" />
        </div>

        {/* Tooltip */}
        <div
          className={`absolute bottom-full right-0 mb-3 bg-gray-800 text-white text-xs sm:text-sm px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 transform origin-bottom ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          Chat via WhatsApp
          <div className="absolute top-full right-2 w-2 h-2 bg-gray-800 transform rotate-45"></div>
        </div>
      </a>

      {/* Mobile-optimized version with text label */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
