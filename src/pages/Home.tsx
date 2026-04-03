import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProgramsSection from '@/components/ProgramsSection';
import LocationSection from '@/components/LocationSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

/**
 * Home Page - Seruni Swimming School
 * Modern Aquatic Minimalism Design
 * 
 * Layout:
 * - Header (sticky navigation)
 * - Hero Section (asymmetric layout)
 * - Programs Section (grid of program cards)
 * - Location Section (multiple locations)
 * - About Section (company info)
 * - Contact Section (form + contact info)
 * - Footer
 */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title="Belajar Renang Bersama Kami"
          subtitle="Selamat Datang di Seruni Swimming School"
          description="Program renang profesional untuk semua usia dengan pelatih bersertifikat internasional. Dari pemula hingga advanced, kami siap membimbing Anda menguasai teknik renang dengan aman dan menyenangkan."
          ctaText="Daftar Sekarang"
          ctaSecondary="Lihat Program"
          backgroundImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663469394974/VkGPRQxtHH4MgjsoPUiVdv/hero-swimmers-WJnVGJuaXAJnefMxhTN8wM.webp"
          onCtaClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        />

        {/* Programs Section */}
        <ProgramsSection />

        {/* Location Section */}
        <LocationSection />

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
