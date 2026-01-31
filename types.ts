export enum Phase {
  INTAKE = 'Intake',
  AUTISM = 'Autism Spectrum',
  ADHD = 'ADHD',
  DYSLEXIA = 'Dyslexia',
  DYSCALCULIA = 'Dyscalculia',
  DYSPRAXIA = 'Dyspraxia',
  LANGUAGE = 'Language Disorder',
  IMPACT = 'Functional Impact',
  COMORBIDITIES = 'Comorbidities'
}

export type Locale = 'en' | 'fr';

export type ScaleType =
  | 'likert_5'       // 1-5 Agreement (Strongly Disagree -> Strongly Agree)
  | 'likert_7'       // 1-7 Agreement (Strongly Disagree -> Strongly Agree)
  | 'frequency_0_4'  // 0-4 Frequency (Never -> Very Often)
  | 'frequency_1_5'  // 1-5 Frequency (Never -> Very Often)
  | 'frequency_0_3'  // 0-3 Frequency (Never -> Always)
  | 'yes_no';        // 0-1 (No -> Yes)

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
  scale?: ScaleType; // Defaults to 'likert_5' if undefined
}

export interface UserAnswer {
  questionId: string;
  score: number; // Value depends on scale (0-4, 1-7, 0-1, etc.)
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
