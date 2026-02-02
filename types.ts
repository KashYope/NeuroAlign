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

export interface Translation {
  title: string;
  subtitle: string;
  introTitle: string;
  introDesc: string;
  disclaimerTitle: string;
  disclaimerText: string;
  disclaimerCheck: string;
  disclaimerBtn: string;
  domainsTitle: string;
  startBtn: string;
  continueBtn: string;
  startNewBtn: string;
  saveAndExit: string;
  saveNotice: string;
  back: string;
  localSave: string;
  footer: string;
  reportTitle: string;
  reportDesc: string;
  keyFindings: string;
  nextSteps: string;
  clinicalPath: string;
  clinicalDesc: string;
  selfCare: string;
  selfCareDesc: string;
  downloadPdf: string;
  retake: string;
  functionalImpactTitle: string;
  wellbeingTitle: string;
  preliminaryResults: string;
  coreProfiles: string;
  specializedProfiles: string;
  reportFooter: string;
  faqTitle: string;

  insights: Record<string, {
    whatItMeans: string;
    strengths: string[];
    tips: string[];
    tools: string[];
    guides: string[];
  }>;

  reportLabels: {
    livedExperience: string;
    neuroStrengths: string;
    strategies: string;
    practicalSupport: string;
    quickActions: string;
    tools: string;
    guides: string;
    subscaleBreakdown: string;
    insightPrompt: string;
    spikyProfile: string;
  };

  methodology: {
    title: string;
    description: string;
    learnBtn: string;
    sourcesTitle: string;
    spikyProfileTitle: string;
    spikyProfileDesc: string;
    modules: Record<string, {
      title: string;
      source: string;
      desc: string;
    }>;
  };

  methodsPage: {
    title: string;
    subtitle: string;
    backBtn: string;
    startBtn: string;
    intro: { title: string; text: string };
    spikyProfile: { title: string; text: string };
    modulesTitle: string;
    modules: Record<string, {
      title: string;
      subtitle: string;
      tool: string;
      description: string;
      citations: { text: string; url: string }[];
    }>;
    scoring: { title: string; text: string };
    assessmentBreakdown: {
      title: string;
      text: string;
      questions: string;
      subscales: string;
    };
    whatToExpect: {
      title: string;
      text: string;
      items: {
        spikyProfile: string;
        insights: string;
        medical: string;
        impact: string;
      };
    };
  };

  faq: { q: string; a: string }[];

  searchTerms: {
    specialist: string;
    psychologist: string;
    psychiatrist: string;
    assessment: string;
  };

  barrierLevels: {
    significant: string;
    moderate: string;
    typical: string;
  };

  domainIntros: Record<string, string>;

  interpretations: Record<string, string>;

  subscales: Record<string, string>;

  impactLabels: Record<string, string>;

  mentalHealthMarkers: Record<string, string>;

  urgentFlag: string;
  urgentDesc: string;
  coOccurrence: string;
  maskingFlag: string;
  headInjuryFlag: string;
  depressionFlag: string;
  specialistFlag: string;
  SensoryOverload: string;
  AnxietyMasking: string;
  MathAnxiety: string;

  likert: {
    stronglyDisagree: string;
    disagree: string;
    somewhatDisagree: string;
    neutral: string;
    somewhatAgree: string;
    agree: string;
    stronglyAgree: string;
    yes: string;
    no: string;
    frequency: {
      never: string;
      rarely: string;
      sometimes: string;
      often: string;
      veryOften: string;
      always: string;
    };
  };

  phases: Record<string, string>;

  chart: {
    intensity: string;
    barrierLevel: string;
    domain: string;
    score: string;
    interpretation: string;
    functionalArea: string;
    impact: string;
    fullLog: string;
    item: string;
  };

  errors: {
    scoring: string;
    pdf: string;
  };
}
