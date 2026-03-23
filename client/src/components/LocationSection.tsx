import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Location Section Component - Modern Aquatic Minimalism
 * Menampilkan lokasi, jam operasional, dan informasi kontak
 * Design: Clean layout dengan informasi yang terorganisir
 */

export default function LocationSection() {
  const locations = [
    {
      name: 'Lokasi Utama - Ciputat',
      address: 'Jl. Renang No. 123, Ciputat, Tangerang Selatan',
      phone: '+62 812-3456-7890',
      email: 'ciputat@seruniswimming.com',
      hours: [
        { day: 'Senin - Jumat', time: '06:00 - 18:00' },
        { day: 'Sabtu - Minggu', time: '07:00 - 17:00' },
      ],
      facilities: ['Kolam Renang 50m', 'Kolam Anak-anak', 'Ruang Ganti', 'Parkir Luas'],
    },
    {
      name: 'Cabang - Jakarta Selatan',
      address: 'Jl. Olahraga No. 456, Jakarta Selatan',
      phone: '+62 812-3456-7891',
      email: 'jakarta@seruniswimming.com',
      hours: [
        { day: 'Senin - Jumat', time: '06:30 - 18:30' },
        { day: 'Sabtu - Minggu', time: '08:00 - 17:00' },
      ],
      facilities: ['Kolam Renang 25m', 'Kolam Anak-anak', 'Kafe', 'Parkir'],
    },
  ];

  return (
    <section id="location" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary bg-blue-50 px-4 py-2 rounded-full inline-block mb-4">
            Lokasi Kami
          </span>
          <h2 className="display-2 text-primary mb-4">
            Kunjungi Kami
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Kami memiliki beberapa lokasi strategis untuk kemudahan Anda mengakses layanan kami.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {locations.map((location, idx) => (
            <div
              key={idx}
              className="border-2 border-border rounded-xl p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
            >
              {/* Location Name */}
              <h3 className="heading-1 text-primary mb-6">{location.name}</h3>

              {/* Address */}
              <div className="flex gap-3 mb-6">
                <MapPin size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Alamat</p>
                  <p className="text-foreground/70">{location.address}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <Phone size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <a href={`tel:${location.phone}`} className="text-primary font-semibold hover:underline">
                      {location.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${location.email}`} className="text-primary font-semibold hover:underline">
                      {location.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock size={20} className="text-primary" />
                  Jam Operasional
                </p>
                <ul className="space-y-2">
                  {location.hours.map((hour, i) => (
                    <li key={i} className="text-sm text-foreground/70 flex justify-between">
                      <span>{hour.day}</span>
                      <span className="font-semibold text-primary">{hour.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Facilities */}
              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3">Fasilitas</p>
                <div className="grid grid-cols-2 gap-2">
                  {location.facilities.map((facility, i) => (
                    <div key={i} className="text-sm text-foreground/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {facility}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button className="w-full bg-primary hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-all duration-200">
                Lihat Lokasi di Maps
              </Button>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-gradient-to-r from-primary/5 to-blue-100 rounded-xl p-8 text-center">
          <h3 className="heading-1 text-primary mb-4">Lokasi Mudah Diakses</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Kedua lokasi kami strategis dan mudah diakses dari berbagai area. Tersedia parkir luas dan fasilitas lengkap untuk kenyamanan Anda.
          </p>
          <Button className="bg-primary hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200">
            Hubungi Kami untuk Informasi Lebih Lanjut
          </Button>
        </div>
      </div>
    </section>
  );
}
