import React from 'react';
import { Zap, Smile, BookOpen, Move, Calculator, LayoutGrid } from 'lucide-react';

interface ModuleIconProps {
  name: string;
  className?: string;
}

const ModuleIcon: React.FC<ModuleIconProps> = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case 'adhd': return <Zap className={className} />;
    case 'autism':
    case 'autismspectrum': return <Smile className={className} />;
    case 'dyslexia': return <BookOpen className={className} />;
    case 'dyspraxia': return <Move className={className} />;
    case 'dyscalculia': return <Calculator className={className} />;
    case 'functionalimpact':
    case 'wellbeing':
    case 'impact': return <LayoutGrid className={className} />;
    default: return null;
  }
};

export default ModuleIcon;
