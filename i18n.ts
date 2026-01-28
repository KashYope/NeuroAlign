
import { Locale } from './types';

export const translations = {
  en: {
    title: "NeuroAlign",
    subtitle: "Adult Neurodiversity Screening",
    introTitle: "NeuroAlign",
    introDesc: "A clinical-grade, neuro-affirming screening tool designed specifically for adults. Map your unique cognitive profile across multiple domains in a private, secure environment.",
    domainsTitle: "What we screen for",
    startBtn: "Start New Assessment",
    continueBtn: "Resume Assessment",
    saveAndExit: "Save and Exit",
    saveNotice: "Progress is encrypted and saved locally. No data leaves your device.",
    back: "Back",
    localSave: "Your response is saved locally",
    footer: "NeuroAlign Adult Screening Protocol v1.0 • Privacy Conscious • No External Data Shared",
    reportTitle: "Your Neurodiversity Profile",
    reportDesc: "This report provides a preliminary screening based on your responses. It is not a clinical diagnosis.",
    keyFindings: "Clinical Indicators & Flags",
    nextSteps: "Personalized Guidance",
    clinicalPath: "Clinical Path",
    clinicalDesc: "Consider sharing this report with a clinical psychologist or GP. In adults, diagnosis often requires structured interviews (ADOS-2, DIVA) and developmental history.",
    selfCare: "Neuro-Affirming Support",
    selfCareDesc: "Focus on strategies that work with your brain: sensory adjustments, external memory aids for executive function, and connecting with the neurodivergent community.",
    downloadPdf: "Download Report",
    retake: "Retake Assessment",
    functionalImpactTitle: "Daily Living & Support Profile",
    wellbeingTitle: "Wellbeing & Co-occurring Markers",
    preliminaryResults: "Preliminary Screening Results",
    coreProfiles: "Core Neuro-Profiles",
    specializedProfiles: "Specialized Cognitive Profiles",
    reportFooter: "NeuroAlign Summary Report • Diagnostic context required",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "Is this a formal medical diagnosis?",
        a: "No. NeuroAlign is a screening tool designed to map traits and probabilities. A formal diagnosis requires a clinical interview with a qualified professional (Psychologist or Psychiatrist) who can integrate developmental history and clinical observation."
      },
      {
        q: "Which clinical protocols are used?",
        a: "Our screening logic is based on the DSM-5-TR and ICD-11 frameworks. We utilize items and scoring methodologies derived from validated instruments including the RAADS-R (Autism), ASRS v1.1 (ADHD), and the WHO ICF framework for functional impact."
      },
      {
        q: "How is my data protected?",
        a: "Privacy is our core principle. Your responses are XOR-encrypted and stored only in your browser's local storage. We do not use cookies for tracking, and your data is never transmitted to our servers or any third-party AI models."
      },
      {
        q: "What do the percentage scores mean?",
        a: "The scores represent the density and intensity of traits reported in that specific domain. A high score (>60%) indicates a strong clinical alignment with that profile, suggesting that a professional diagnostic assessment may be beneficial."
      },
      {
        q: "Why does it ask about my childhood?",
        a: "Neurodevelopmental conditions like Autism and ADHD must be present from early development to meet clinical diagnostic criteria. We screen for childhood traits to help differentiate between lifelong neurodivergence and acquired conditions like burnout or stress."
      }
    ],
    barrierLevels: {
      significant: "Significant Barriers",
      moderate: "Moderate Barriers",
      typical: "Typical Function"
    },
    domainIntros: {
      autism: "Social communication, sensory processing, and focused interests.",
      adhd: "Attention regulation, executive function, and hyperactivity markers.",
      dyslexia: "Reading accuracy, phonological processing, and spelling patterns.",
      dyscalculia: "Mental arithmetic, number estimation, and mathematical logic.",
      dyspraxia: "Fine/gross motor coordination, spatial awareness, and planning.",
      language: "Verbal expression, comprehension, and pragmatic communication.",
      wellbeing: "Impact on daily life, mental health, and co-occurring traits."
    },
    interpretations: {
      low: "Low Probability",
      possible: "Possible Traits Detected",
      moderate: "Moderate Probability - Further Screening Suggested",
      high: "High Probability - Diagnostic Assessment Recommended"
    },
    subscales: {
      Context: "Assessment Context",
      Social: "Social Interaction",
      Interests: "Interests & Routine",
      Sensory: "Sensory Processing",
      Childhood: "Developmental History",
      Inattention: "Inattention",
      Hyperactivity: "Hyperactivity & Impulsivity",
      Impact: "Functional Impact",
      Reading: "Reading Accuracy",
      Processing: "Phonological Processing",
      Spelling: "Spelling & Writing",
      History: "Clinical History",
      Arithmetic: "Mental Arithmetic",
      Estimation: "Estimation & Time",
      Symbols: "Mathematical Symbols",
      Motor: "Fine & Gross Motor",
      Coordination: "Motor Coordination",
      Spatial: "Spatial Awareness",
      Planning: "Executive Planning",
      Expression: "Verbal Expression",
      Comprehension: "Verbal Comprehension",
      Pragmatic: "Pragmatic Language",
      Anxiety: "Anxiety Markers",
      Depression: "Mood Regulation",
      Sleep: "Sleep Quality",
      Emotion: "Emotional Regulation",
      Energy: "Energy & Burnout",
      Physical: "Physical Symptoms",
      Function: "Functional Impact",
      MentalHealth: "Mental Wellbeing",
      Identity: "Neuro-Identity"
    },
    impactLabels: {
      "7.1": "Work & Education",
      "7.2": "Self-Care & Daily Tasks",
      "7.3": "Social & Relationships",
      "7.4": "Life Satisfaction",
      "7.5": "Support Requirements"
    },
    mentalHealthLabels: {
      "7.6": "Depressive Markers",
      "7.7": "Anxiety Markers",
      "7.8": "Trauma/Stress Impact",
      "7.9": "Sleep Architecture",
      "7.10": "Crisis Risk Markers"
    },
    urgentFlag: "URGENT: Immediate mental health support advised.",
    coOccurrence: "AuDHD Pattern: Significant overlap of Autism and ADHD traits detected.",
    maskingFlag: "High Masking Intensity: Significant effort spent hiding traits, which may lead to burnout.",
    likert: {
      stronglyDisagree: "Strongly Disagree",
      disagree: "Disagree",
      neutral: "Neutral",
      agree: "Agree",
      stronglyAgree: "Strongly Agree"
    },
    phases: {
      Intake: "Admission",
      "Autism Spectrum": "Autism Spectrum",
      ADHD: "ADHD Profile",
      Dyslexia: "Dyslexia (Reading)",
      Dyscalculia: "Dyscalculia (Math)",
      Dyspraxia: "Dyspraxia (Motor)",
      "Language Disorder": "Language & Communication",
      Comorbidities: "Co-occurring Patterns",
      "Functional Impact": "Functional Impact"
    }
  },
  fr: {
    title: "NeuroAlign",
    subtitle: "Dépistage de la neurodiversité chez l'adulte",
    introTitle: "NeuroAlign",
    introDesc: "Un outil de dépistage clinique et respectueux de la neurodiversité conçu spécifiquement pour les adultes. Cartographiez votre profil cognitif unique dans un environnement privé et sécurisé.",
    domainsTitle: "Domaines de dépistage",
    startBtn: "Nouvelle évaluation",
    continueBtn: "Reprendre l'évaluation",
    saveAndExit: "Enregistrer et Quitter",
    saveNotice: "La progression est cryptée et sauvegardée localement. Aucune donnée ne quitte votre appareil.",
    back: "Retour",
    localSave: "Votre réponse est sauvegardée localement",
    footer: "Protocole NeuroAlign v1.0 • Respect de la vie privée • Aucune donnée externe partagée",
    reportTitle: "Votre Profil de Neurodiversité",
    reportDesc: "Ce rapport fournit un dépistage préliminaire basé sur vos réponses. Il ne s'agit pas d'un diagnostic clinique.",
    keyFindings: "Indicateurs Cliniques & Alertes",
    nextSteps: "Conseils Personnalisés",
    clinicalPath: "Parcours Clinique",
    clinicalDesc: "Envisagez de partager ce rapport avec un professionnel de santé. Le diagnostic chez l'adulte nécessite souvent des entretiens structurés et une analyse de l'histoire développementale.",
    selfCare: "Soutien Neuro-Affirmatif",
    selfCareDesc: "Privilégiez les stratégies adaptées à votre fonctionnement : aménagements sensoriels, aides à la mémoire externe et groupes de soutien communautaires.",
    downloadPdf: "Télécharger le Rapport",
    retake: "Recommencer l'évaluation",
    functionalImpactTitle: "Profil de Vie Quotidienne & Soutien",
    wellbeingTitle: "Bien-être & Indicateurs de Santé",
    preliminaryResults: "Résultats Préliminaires du Dépistage",
    coreProfiles: "Profils Neuro-Fondamentaux",
    specializedProfiles: "Profils Cognitifs Spécialisés",
    reportFooter: "Rapport de Synthèse NeuroAlign • Contexte diagnostique requis",
    faqTitle: "Questions Fréquemment Posées",
    faq: [
      {
        q: "Est-ce un diagnostic médical formel ?",
        a: "Non. NeuroAlign est un outil de dépistage conçu pour cartographier les traits et les probabilités. Un diagnostic formel nécessite un entretien clinique avec un professionnel qualifié (Psychologue ou Psychiatre)."
      },
      {
        q: "Quels protocoles cliniques sont utilisés ?",
        a: "Notre logique de dépistage est basée sur les cadres DSM-5-TR et CIM-11. Nous utilisons des éléments issus d'instruments validés tels que le RAADS-R (Autisme), l'ASRS v1.1 (TDAH) et le cadre de la CIF de l'OMS."
      },
      {
        q: "Comment mes données sont-elles protégées ?",
        a: "La confidentialité est notre principe de base. Vos réponses sont cryptées et stockées uniquement dans le stockage local de votre navigateur. Aucune donnée n'est transmise à nos serveurs."
      },
      {
        q: "Que signifient les scores en pourcentage ?",
        a: "Les scores représentent la densité et l'intensité des traits signalés. Un score élevé (>60%) indique un alignement clinique fort avec ce profil."
      },
      {
        q: "Pourquoi m'interroger sur mon enfance ?",
        a: "Les conditions neurodéveloppementales doivent être présentes dès le début du développement pour répondre aux critères diagnostiques. Cela aide à différencier la neurodiversité innée des conditions acquises comme l'épuisement."
      }
    ],
    barrierLevels: {
      significant: "Obstacles Significatifs",
      moderate: "Obstacles Modérés",
      typical: "Fonctionnement Typique"
    },
    domainIntros: {
      autism: "Communication sociale, traitement sensoriel et intérêts spécifiques.",
      adhd: "Régulation de l'attention, fonctions exécutives et hyperactivité.",
      dyslexia: "Précision de lecture, traitement phonologique et modèles d'orthographe.",
      dyscalculia: "Calcul mental, estimation des nombres et logique mathématique.",
      dyspraxia: "Coordination motrice fine/globale, perception spatiale et planification.",
      language: "Expression verbale, compréhension et communication pragmatique.",
      wellbeing: "Impact sur la vie quotidienne et santé mentale."
    },
    interpretations: {
      low: "Faible Probabilité",
      possible: "Traits Possibles Détectés",
      moderate: "Probabilité Modérée - Dépistage Complémentaire Suggéré",
      high: "Forte Probabilité - Évaluation Diagnostique Recommandée"
    },
    subscales: {
      Context: "Contexte de l'évaluation",
      Social: "Interaction Sociale",
      Interests: "Interests & Routine",
      Sensory: "Traitement Sensoriel",
      Childhood: "Histoire du Développement",
      Inattention: "Inattention",
      Hyperactivity: "Hyperactivité & Impulsivité",
      Impact: "Impact Fonctionnel",
      Reading: "Précision de Lecture",
      Processing: "Traitement Phonologique",
      Spelling: "Orthographe & Écriture",
      History: "Historique Clinique",
      Arithmetic: "Calcul Mental",
      Estimation: "Estimation & Temps",
      Symbols: "Symboles Mathématiques",
      Motor: "Motricité Fine & Globale",
      Coordination: "Coordination Motrice",
      Spatial: "Perception Spatiale",
      Planning: "Planification Exécutive",
      Expression: "Expression Verbale",
      Comprehension: "Compréhension Verbale",
      Pragmatic: "Langage Pragmatique",
      Anxiety: "Marqueurs d'Anxiété",
      Depression: "Régulation de l'Humeur",
      Sleep: "Qualité du Sommeil",
      Emotion: "Régulation Émotionnelle",
      Energy: "Énergie & Épuisement",
      Physical: "Symptômes Physiques",
      Function: "Impact Fonctionnel",
      MentalHealth: "Bien-être Mental",
      Identity: "Neuro-Identité"
    },
    impactLabels: {
      "7.1": "Travail & Études",
      "7.2": "Auto-soins & Tâches Quotidiennes",
      "7.3": "Social & Relations",
      "7.4": "Satisfaction de Vie",
      "7.5": "Besoins en Soutien"
    },
    mentalHealthLabels: {
      "7.6": "Marqueurs Dépressifs",
      "7.7": "Marqueurs d'Anxiété",
      "7.8": "Impact Trauma/Stress",
      "7.9": "Architecture du Sommeil",
      "7.10": "Marqueurs de Risque de Crise"
    },
    urgentFlag: "URGENT : Un soutien immédiat en santé mentale est conseillé.",
    coOccurrence: "Profil AuDHD : Chevauchement significatif des traits d'Autisme et de TDAH détecté.",
    maskingFlag: "Intensité de Camouflage Élevée : Effort important pour cacher ses traits, pouvant mener à l'épuisement.",
    likert: {
      stronglyDisagree: "Fortement en désaccord",
      disagree: "En désaccord",
      neutral: "Neutre",
      agree: "D'accord",
      stronglyAgree: "Fortement d'accord"
    },
    phases: {
      Intake: "Admission",
      "Autism Spectrum": "Spectre de l'Autisme",
      ADHD: "Profil TDAH",
      Dyslexia: "Dyslexie (Lecture)",
      Dyscalculia: "Dyscalculia (Maths)",
      Dyspraxia: "Dyspraxie (Moteur)",
      "Language Disorder": "Trouble du langage",
      Comorbidities: "Comorbidités & Co-occurrences",
      "Functional Impact": "Impact Fonctionnel"
    }
  }
};
