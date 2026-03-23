import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Header Component - Modern Aquatic Minimalism
 * Navigation bar dengan logo dan menu items
 * Design: Clean, minimalist dengan deep ocean blue primary color
 */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Beranda', href: '#home' },
    { label: 'Program', href: '#programs' },
    { label: 'Lokasi', href: '#location' },
    { label: 'Tentang', href: '#about' },
    { label: 'Kontak', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-primary">Seruni</h1>
            <p className="text-xs text-muted-foreground">Swimming School</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:087880343055" className="text-sm text-primary font-semibold hover:underline">
            0878-8034-3055
          </a>
          <Button
            className="bg-primary hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Daftar Sekarang
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              className="w-full bg-primary hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-all duration-200 mt-2"
              onClick={() => {
                setIsMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Daftar Sekarang
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
