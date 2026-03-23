import ProgramCard from './ProgramCard';
import { Baby, Zap, Award } from 'lucide-react';

/**
 * Programs Section Component - Modern Aquatic Minimalism
 * Menampilkan semua program renang dalam grid layout
 * Design: Organized dengan wave divider
 */

const programs = [
  {
    title: 'Kelas Bayi',
    level: 'Pemula',
    description: 'Pengenalan air untuk bayi dan balita',
    ageGroup: '6 bulan - 3 tahun',
    duration: '30 menit',
    price: 'Rp 300.000',
    maxStudents: 4,
    features: [
      'Pengenalan air yang aman',
      'Bonding dengan orang tua',
      'Gerakan dasar renang',
      'Sertifikat kelulusan',
    ],
    icon: <Baby />,
  },
  {
    title: 'Kelas Pemula',
    level: 'Dasar',
    description: 'Belajar teknik renang dasar untuk anak-anak',
    ageGroup: '4 - 7 tahun',
    duration: '45 menit',
    price: 'Rp 400.000',
    maxStudents: 6,
    features: [
      'Teknik gaya bebas dasar',
      'Keselamatan di air',
      'Kepercayaan diri di kolam',
      'Ujian dan sertifikat',
    ],
    icon: <Zap />,
  },
  {
    title: 'Kelas Menengah',
    level: 'Intermediate',
    description: 'Pengembangan teknik dan kecepatan renang',
    ageGroup: '8 - 12 tahun',
    duration: '60 menit',
    price: 'Rp 500.000',
    maxStudents: 8,
    features: [
      'Empat gaya renang',
      'Teknik advanced',
      'Persiapan kompetisi',
      'Stamina dan kecepatan',
    ],
    icon: <Award />,
  },
  {
    title: 'Kelas Remaja',
    level: 'Advanced',
    description: 'Program untuk remaja dan dewasa',
    ageGroup: '13+ tahun',
    duration: '60 menit',
    price: 'Rp 550.000',
    maxStudents: 10,
    features: [
      'Teknik profesional',
      'Persiapan olimpik',
      'Pelatihan intensif',
      'Coaching personal',
    ],
    icon: <Award />,
  },
  {
    title: 'Kelas Dewasa',
    level: 'Semua Level',
    description: 'Program renang untuk orang dewasa',
    ageGroup: '18+ tahun',
    duration: '60 menit',
    price: 'Rp 450.000',
    maxStudents: 8,
    features: [
      'Belajar dari nol',
      'Fitness dan kesehatan',
      'Teknik yang benar',
      'Fleksibel jadwal',
    ],
    icon: <Zap />,
  },
  {
    title: 'Kelas Privat',
    level: 'Personal',
    description: 'Pelatihan one-on-one dengan coach profesional',
    ageGroup: 'Semua usia',
    duration: '45 menit',
    price: 'Rp 750.000',
    maxStudents: 1,
    features: [
      'Coaching personal',
      'Program custom',
      'Jadwal fleksibel',
      'Hasil maksimal',
    ],
    icon: <Award />,
  },
];

export default function ProgramsSection() {
  const handleEnroll = (programTitle: string) => {
    console.log(`Enrolled in: ${programTitle}`);
    // Scroll to contact section
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="programs" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary bg-blue-50 px-4 py-2 rounded-full inline-block mb-4">
            Program Kami
          </span>
          <h2 className="display-2 text-primary mb-4">
            Pilih Program Renang Terbaik
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Kami menyediakan berbagai program renang untuk semua usia dan tingkat kemampuan, dengan pelatih profesional bersertifikat.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <ProgramCard
              key={idx}
              {...program}
              onEnroll={() => handleEnroll(program.title)}
            />
          ))}
        </div>

        {/* Wave Divider */}
        <div className="mt-20 pt-20 border-t border-border relative">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-50 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
