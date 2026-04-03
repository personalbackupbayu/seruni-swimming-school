import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

/**
 * Hero Section Component - Modern Aquatic Minimalism
 * Asymmetric layout dengan hero image di sisi kanan dan teks di sisi kiri
 * Design: Clean, professional dengan deep ocean blue primary color
 */

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaSecondary?: string;
  backgroundImage: string;
  onCtaClick?: () => void;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaSecondary,
  backgroundImage,
  onCtaClick,
}: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="max-w-lg">
            <div className="inline-block mb-4">
              <span className="text-xs sm:text-sm font-semibold text-primary bg-blue-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                {subtitle}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-4 sm:mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8 leading-relaxed">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                className="bg-primary hover:bg-blue-800 text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                onClick={onCtaClick}
              >
                {ctaText}
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </Button>

              {ctaSecondary && (
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-blue-50 font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base"
                  onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {ctaSecondary}
                </Button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Dipercaya oleh ribuan keluarga</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="font-bold text-primary text-lg">100+</p>
                  <p className="text-muted-foreground">Siswa Aktif</p>
                </div>
                <div>
                  <p className="font-bold text-primary text-lg">10</p>
                  <p className="text-muted-foreground">Pelatih Profesional</p>
                </div>
                <div>
                  <p className="font-bold text-primary text-lg">12+</p>
                  <p className="text-muted-foreground">Tahun Pengalaman</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual (handled by background image) */}
          <div className="hidden lg:block relative h-96"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
