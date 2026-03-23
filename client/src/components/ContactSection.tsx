import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast.success('Terima kasih! Kami akan menghubungi Anda segera.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        program: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary bg-blue-50 px-4 py-2 rounded-full inline-block mb-4">
            Hubungi Kami
          </span>
          <h2 className="display-2 text-primary mb-4">
            Daftar Sekarang
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Isi formulir di bawah ini atau hubungi kami langsung untuk informasi lebih lanjut tentang program renang kami.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Telepon</h4>
                <p className="text-foreground/70 mb-2">Hubungi kami untuk konsultasi gratis</p>
                <a href="tel:087880343055" className="text-primary font-semibold hover:underline">
                  0878-8034-3055
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Email</h4>
                <p className="text-foreground/70 mb-2">Kirim pertanyaan Anda kepada kami</p>
                <a href="mailto:seruniswimmingschool@gmail.com" className="text-primary font-semibold hover:underline">
                  seruniswimmingschool@gmail.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Alamat</h4>
                <p className="text-foreground/70">
                  Jl. Renang No. 123<br />
                  Ciputat, Tangerang Selatan<br />
                  Indonesia
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-4">Jam Operasional</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span className="font-semibold text-primary">06:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sabtu - Minggu</span>
                  <span className="font-semibold text-primary">07:00 - 17:00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-white border-2 border-border rounded-xl p-8">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Nama Lengkap
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Masukkan email Anda"
                    required
                    className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nomor Telepon
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Masukkan nomor telepon"
                    required
                    className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Program Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Program yang Diminati
                </label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
                >
                  <option value="">Pilih program...</option>
                  <option value="pemula">Kelas Pemula (4+ tahun)</option>
                  <option value="menengah">Kelas Menengah (8+ tahun)</option>
                  <option value="mahir">Kelas Mahir (12+ tahun)</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Pesan (Opsional)
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none h-32"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Formulir'}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Kami akan menghubungi Anda dalam waktu 24 jam untuk konfirmasi pendaftaran.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
