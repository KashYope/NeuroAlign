
export enum Phase {
  INTAKE = 'Intake',
  AUTISM = 'Autism Spectrum',
  ADHD = 'ADHD',
  DYSLEXIA = 'Dyslexia',
  DYSCALCULIA = 'Dyscalculia',
  DYSPRAXIA = 'Dyspraxia',
  LANGUAGE = 'Language Disorder',
  IMPACT = 'Functional Impact',
  // Added COMORBIDITIES to fix the compilation error in Report.tsx
  COMORBIDITIES = 'Comorbidities'
}

export type Locale = 'en' | 'fr';

export interface LocalizedString {
  en: string;
  fr: string;
}

export interface Question {
  id: string;
  phase: Phase;
  subscale: string;
  text: LocalizedString;
  isReverse?: boolean;
}

export interface UserAnswer {
  questionId: string;
  score: number; // 1-5 Likert
}

export interface DomainScore {
  name: Phase;
  score: number; // 0-100 normalized
  interpretation: 'low' | 'possible' | 'moderate' | 'high';
  subscales: Record<string, number>;
  childhoodFlag?: boolean; // True if childhood onset scores are low
}

export interface ScreeningReport {
  domainScores: DomainScore[];
  flags: string[]; 
  functionalImpact: Record<string, number>;
  mentalHealthMarkers: Record<string, number>;
  isClinicalUrgent: boolean;
}
