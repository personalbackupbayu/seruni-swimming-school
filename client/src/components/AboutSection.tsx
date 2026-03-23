import { Award, Users, Target, Heart } from 'lucide-react';

/**
 * About Section Component - Modern Aquatic Minimalism
 * Menampilkan informasi tentang Seruni Swimming School
 * Design: Asymmetric layout dengan image dan text
 */

export default function AboutSection() {
  const values = [
    {
      icon: <Award size={32} />,
      title: 'Profesional',
      description: 'Pelatih bersertifikat internasional dengan pengalaman bertahun-tahun',
    },
    {
      icon: <Users size={32} />,
      title: 'Komunitas',
      description: 'Membangun komunitas renang yang solid dan saling mendukung',
    },
    {
      icon: <Target size={32} />,
      title: 'Fokus pada Hasil',
      description: 'Program terstruktur dengan target pembelajaran yang jelas',
    },
    {
      icon: <Heart size={32} />,
      title: 'Keselamatan',
      description: 'Prioritas utama adalah keselamatan dan kenyamanan siswa',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary bg-blue-50 px-4 py-2 rounded-full inline-block mb-4">
            Tentang Kami
          </span>
          <h2 className="display-2 text-primary mb-4">
            Mengapa Memilih Seruni?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Seruni Swimming School adalah pilihan terpercaya untuk pembelajaran renang berkualitas dengan standar internasional.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-blue-100 rounded-2xl overflow-hidden h-96">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663469394974/VkGPRQxtHH4MgjsoPUiVdv/hero-family-eALSJY2ZzViof8MebsQV59.webp"
                alt="Seruni Swimming School"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-6 max-w-xs">
              <p className="text-sm text-muted-foreground mb-2">Dipercaya oleh</p>
              <p className="heading-2 text-primary">500+ Siswa</p>
              <p className="text-xs text-muted-foreground mt-2">Aktif di Seruni Swimming School</p>
            </div>
          </div>

          {/* Right - Text Content */}
          <div>
            <h3 className="heading-1 text-primary mb-6">
              Sekolah Renang Terpercaya Sejak 2015
            </h3>

            <p className="text-foreground/80 mb-6 leading-relaxed">
              Seruni Swimming School didirikan dengan visi untuk memberikan pendidikan renang berkualitas tinggi kepada semua kalangan. Kami percaya bahwa setiap orang berhak belajar berenang dengan aman dan menyenangkan.
            </p>

            <p className="text-foreground/80 mb-8 leading-relaxed">
              Dengan tim pelatih profesional bersertifikat internasional, fasilitas modern, dan program pembelajaran yang terstruktur, kami berkomitmen untuk mengembangkan kemampuan renang siswa dari pemula hingga tingkat advanced.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="heading-2 text-primary">10+</p>
                <p className="text-xs text-muted-foreground mt-1">Tahun Pengalaman</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="heading-2 text-primary">15+</p>
                <p className="text-xs text-muted-foreground mt-1">Pelatih Profesional</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="heading-2 text-primary">2</p>
                <p className="text-xs text-muted-foreground mt-1">Lokasi Strategis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 text-center"
            >
              <div className="text-primary mb-4 flex justify-center">{value.icon}</div>
              <h4 className="font-bold text-primary mb-2">{value.title}</h4>
              <p className="text-sm text-foreground/70">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 bg-gradient-to-r from-primary to-blue-800 rounded-2xl p-12 text-white text-center">
          <p className="text-lg italic mb-6 max-w-2xl mx-auto leading-relaxed">
            "Seruni Swimming School telah mengubah cara anak saya memandang olahraga air. Pelatihnya sangat profesional dan sabar. Kami sangat puas dengan kemajuan yang telah dicapai!"
          </p>
          <p className="font-semibold">- Ibu Siti, Orang Tua Siswa</p>
        </div>
      </div>
    </section>
  );
}
