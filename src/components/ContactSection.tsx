import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Contact Section Component - Modern Aquatic Minimalism
 * Form kontak dan informasi untuk pendaftaran
 * Design: Clean form dengan contact information
 */

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.program) {
      toast.error('Silakan isi semua field yang diperlukan');
      return;
    }

    setIsLoading(true);

    try {
      // Send to WhatsApp
      const whatsappMessage = `Pendaftaran Baru - Seruni Swimming School\n\nNama: ${formData.name}\nEmail: ${formData.email}\nTelepon: ${formData.phone}\nProgram: ${formData.program}\nPesan: ${formData.message || '-'}`;
      const whatsappUrl = `https://wa.me/6287880343055?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Send to Email via mailto (browser limitation)
      const emailSubject = `Pendaftaran Baru: ${formData.name}`;
      const emailBody = `Nama Lengkap: ${formData.name}\nEmail: ${formData.email}\nNomor Telepon: ${formData.phone}\nProgram Pilihan: ${formData.program}\nPesan: ${formData.message || '-'}`;
      const mailtoUrl = `mailto:seruniswimmingschool@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Open email client
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      toast.success('Terima kasih! Silakan lengkapi pengiriman melalui WhatsApp dan Email');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        program: '',
        message: '',
      });
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Hubungi Kami
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Siap membantu Anda untuk memulai perjalanan renang bersama Seruni Swimming School
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
              Informasi Kontak
            </h3>

            {/* Contact Items */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:seruniswimmingschool@gmail.com"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600 break-all">seruniswimmingschool@gmail.com</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+6287880343055"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Telepon</h4>
                  <p className="text-gray-600">0878-8034-3055</p>
                </div>
              </a>

              {/* Address */}
              <a
                href="https://share.google/51FaR5em8sO1A0mBc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Lokasi</h4>
                  <p className="text-gray-600 text-sm">
                    Jl. Gatot Subroto, Curug, Kec. Cimanggis, Kota Depok, Jawa Barat 16453
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap Anda"
                  required
                  className="w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email Anda"
                  required
                  className="w-full"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Masukkan nomor telepon Anda"
                  required
                  className="w-full"
                />
              </div>

              {/* Program */}
              <div>
                <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                  Program Pilihan *
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Pilih Program</option>
                  <option value="Pemula (5+ tahun, 60 menit, Rp 200.000/bulan)">Pemula (5+ tahun, 60 menit, Rp 200.000/bulan)</option>
                  <option value="Menengah (Rp 200.000/bulan)">Menengah (Rp 200.000/bulan)</option>
                  <option value="Mahir (Rp 250.000/bulan)">Mahir (Rp 250.000/bulan)</option>
                  <option value="Private (DM)">Private (DM)</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan (Opsional)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tulis pesan atau pertanyaan Anda"
                  rows={4}
                  className="w-full"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  'Daftar Sekarang'
                )}
              </Button>

              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Kami akan menghubungi Anda melalui WhatsApp dan Email
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
