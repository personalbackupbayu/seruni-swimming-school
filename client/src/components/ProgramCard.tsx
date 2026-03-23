import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, Target } from 'lucide-react';

/**
 * Program Card Component - Modern Aquatic Minimalism
 * Card untuk menampilkan program renang dengan detail
 * Design: Clean card dengan hover effects yang subtle
 */

interface ProgramCardProps {
  title: string;
  level: string;
  description: string;
  ageGroup: string;
  duration: string;
  price: string;
  maxStudents: number;
  features: string[];
  icon?: React.ReactNode;
  onEnroll?: () => void;
}

export default function ProgramCard({
  title,
  level,
  description,
  ageGroup,
  duration,
  price,
  maxStudents,
  features,
  icon,
  onEnroll,
}: ProgramCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50 border-2 border-border">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-blue-100 p-6 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="heading-2 text-primary mb-1">{title}</h3>
            <Badge className="bg-primary/10 text-primary border-primary/20">{level}</Badge>
          </div>
          {icon && <div className="text-primary/30 text-4xl">{icon}</div>}
        </div>
        <p className="text-sm text-foreground/70">{description}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Usia</p>
              <p className="font-semibold text-foreground">{ageGroup}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Durasi</p>
              <p className="font-semibold text-foreground">{duration}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Target size={16} className="text-primary" />
            Fitur Program
          </p>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="text-sm text-foreground/70 flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-border"></div>

        {/* Footer with Price and Button */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Harga per bulan</p>
            <p className="heading-2 text-primary">{price}</p>
            <p className="text-xs text-muted-foreground mt-1">Maks {maxStudents} siswa/kelas</p>
          </div>
          <Button
            className="bg-primary hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
            onClick={onEnroll}
          >
            Daftar
          </Button>
        </div>
      </div>
    </Card>
  );
}
