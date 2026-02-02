import { Locale } from './types';

export const translations = {
  en: {
    title: "NeuroAlign",
    subtitle: "Unified Adult Neurodiversity Assessment",
    introTitle: "NeuroAlign",
    introDesc: "A comprehensive, auto-scoring protocol for adult neurodiversity. integrating ADHD, Autism, Dyslexia, Dyspraxia, and Dyscalculia profiles into a single 'spiky profile' heatmap.",
    disclaimerTitle: "Medical Disclaimer",
    disclaimerText: "NeuroAlign is a screening tool designed to map cognitive traits and probabilities based on clinical frameworks (ASRS, CAT-Q, Vinegrad, ADC, Chinn). IT IS NOT A DIAGNOSIS. Only a qualified healthcare professional can provide a formal medical diagnosis. If you are experiencing a mental health crisis, please contact your local emergency services.",
    disclaimerCheck: "I acknowledge that this is a screening tool and not a clinical diagnosis.",
    disclaimerBtn: "Acknowledge & Proceed",
    domainsTitle: "What we screen for",
    startBtn: "Start Assessment",
    continueBtn: "Resume Assessment",
    startNewBtn: "Start a New Assessment",
    saveAndExit: "Save and Exit",
    saveNotice: "Progress is encrypted and saved locally. No data leaves your device.",
    back: "Back",
    localSave: "Your response is saved locally",
    footer: "NeuroAlign MethodeII v2.0 • Privacy Conscious • No External Data Shared • Done is better than perfect.",
    reportTitle: "Your Neurodiversity Profile",
    reportDesc: "This report maps your unique cognitive profile based on your answers. It visualizes how your brain processes the world, highlighting both your challenges and your strengths.",
    keyFindings: "Clinical Indicators & Flags",
    nextSteps: "Personalized Guidance",
    clinicalPath: "Clinical Path",
    clinicalDesc: "Consider sharing this report with a clinical psychologist or GP. In adults, diagnosis often requires structured interviews and developmental history.",
    selfCare: "Neuro-Affirming Support",
    selfCareDesc: "Focus on strategies that work with your brain: sensory adjustments, external memory aids for executive function, and connecting with the neurodivergent community.",
    downloadPdf: "Download Report",
    retake: "Retake Assessment",
    functionalImpactTitle: "Daily Living & Support Profile",
    wellbeingTitle: "Detailed Subscale Analysis",
    preliminaryResults: "Preliminary Screening Results",
    coreProfiles: "Core Neuro-Profiles",
    specializedProfiles: "Specialized Cognitive Profiles",
    reportFooter: "NeuroAlign Summary Report • Diagnostic context required",
    faqTitle: "Frequently Asked Questions",
    breakMoments: {
      title: "Break Moment",
      congrats: "Well done for taking this time for yourself!",
      continue: "Continue Assessment",
      messages: [
        "Take a sip of water 💧",
        "Stretch your arms and legs 🧘",
        "Take a deep breath... and let it out 🌬️",
        "How about a quick 2-minute walk? 🚶",
        "Rest your eyes for a moment 👁️",
        "You're doing great, one step at a time! ✨"
      ]
    },
    insights: {
      adhd: {
        whatItMeans: "Your results suggest a processing style characterized by a regulation-based nervous system. It is not a deficit of attention, but an inconsistency of engagement based on interest, novelty, and urgency.",
        strengths: ["Hyperfocus on passions", "Creative problem solving", "Resilience in crisis", "Generative thinking"],
        tips: ["Use 'Body Doubling' (working alongside others) for boring tasks.", "Consult your 'Menu' of engaging activities when you feel stuck.", "Externalize time (visible clocks/timers) to combat time blindness."],
        tools: ["Goblin.tools (AI task breaker)", "Focusmate (Virtual Body Doubling)", "Time Timers (Visual clocks)", "Active Noise Cancelling Headphones", "Fidget Toys / Sensory Stones"],
        guides: ["Dopamine Menu: Create a menu of stimulating activities (Appetizers, Entrees, Sides) to boost initiation.", "Gamification: Turn tasks into 'Boss Battles' or quests with XP rewards to hack your reward system.", "The '5-Minute' Launch: Commit to just 5 minutes of a task to overcome the wall of initiation."]
      },
      autism: {
        whatItMeans: "This profile suggests a unique neurotype focused on deep information processing, pattern recognition, and a distinct sensory experience. High masking scores suggest you work hard to fit in.",
        strengths: ["Deep expertise/Special interests", "Pattern recognition", "Logical honesty", "Sensory joy"],
        tips: ["Schedule regular 'sensory breaks' throughout your day before you feel overwhelmed.", "Communicate your need for 'recovery time' to close friends or family.", "Use clear, direct communication boundaries."],
        tools: ["Noise-canceling headphones (ANC)", "Weighted blankets (Deep Pressure Therapy)", "Sunglasses / Tinted glasses (TheraSpecs)", "Communication Cards / Pins"],
        guides: ["Sensory Diet: Curate a daily intake of sensory inputs (calming vs alerting) to manage regulation.", "Energy Accounting: Treat energy like a bank account. Balance withdrawals (socializing, masking) with deposits (solitude, special interests).", "Safe Spaces: Designate physical areas where 'masking' is dropped completely to prevent burnout."]
      },
      dyslexia: {
        whatItMeans: "Dyslexia is a difference in how the brain processes language (phonology) and sequences. It often co-occurs with strong visual-spatial reasoning.",
        strengths: ["3D/Visual thinking", "Narrative reasoning", "Interconnected reasoning", "Big-picture strategy"],
        tips: ["Leverage Text-to-Speech and Dictation tools.", "Use sans-serif fonts (like OpenDyslexic or Atkinson).", "Lean into 'big picture' thinking rather than getting lost in details."],
        tools: ["Text-to-Speech (Speechify, NaturalReader)", "Dyslexia-friendly fonts (OpenDyslexic)", "Voice Typing / Dictation (Dragon)", "Colored Overlays / Reading Rulers"],
        guides: ["Mind Mapping: Use visual structures (Miro, Obsidian) instead of linear notes to match your thinking style.", "The 'No Ambiguity' Rule: Request written, concrete instructions to reduce processing load.", "Multi-sensory Learning: Engage auditory and visual channels simultaneously to boost retention."]
      },
      dyspraxia: {
        whatItMeans: "Dyspraxia (DCD) affects the planning of movements and the organization of thoughts. It is often described as a disconnect between 'idea' and 'action'.",
        strengths: ["High verbal ability", "Empathy and determination", "Detailed long-term memory", "Strategic compensation"],
        tips: ["Focus on one single movement at a time rather than the whole sequence.", "Use digital tools for organization to bypass motor load.", "Allow extra time for processing new motor skills."],
        tools: ["Digital Project Managers (Trello, Asana)", "Ergonomic Keyboards/Mouse", "Voice Control / Smart Home devices", "Digital Calendars with multiple reminders"],
        guides: ["Micro-tasking: Break physical tasks into tiny steps to overcome motor planning fatigue.", "Visual Process Maps: Use diagrams to sequence actions instead of holding them in working memory.", "Physical 'Quiet Cars': Create distraction-free zones to reduce the cognitive load of movement."]
      },
      dyscalculia: {
        whatItMeans: "This profile indicates a difference in 'Number Sense'—the intuitive grasp of quantities. It is distinct from general intelligence or logic.",
        strengths: ["Verbal logic", "Intuitive estimation", "Creative writing/arts", "Strategic concepts"],
        tips: ["Draw out problems or use physical counters to make abstract numbers real.", "Politely decline requests for quick mental calculations in public.", "Link numbers to physical objects or spatial concepts."],
        tools: ["Visual Calculators", "Graph Paper (for alignment)", "Manipulatives (Physical objects)", "Spreadsheets (Excel/Sheets) for auto-calc"],
        guides: ["Visualizing Math: Use diagrams and spatial representations instead of abstract symbols.", "The Calculator Rule: Use tools unapologetically; it's a valid accommodation, not cheating.", "Real-world Anchoring: Link abstract numbers to physical objects or personal contexts."]
      }
    },
    reportLabels: {
      livedExperience: "Lived Experience",
      neuroStrengths: "Neuro-Strengths",
      strategies: "Strategies & Tips",
      practicalSupport: "Practical Support",
      quickActions: "Quick Actions",
      tools: "Recommended Tools",
      guides: "Deep Dive Guides",
      subscaleBreakdown: "Subscale Breakdown",
      insightPrompt: "Review the insights below for detailed interpretation tailored to this profile.",
      spikyProfile: "Spiky Profile Visualization"
    },
    methodology: {
      title: "Science & Methodology",
      description: "NeuroAlign (MethodeII) takes a holistic approach. Unlike traditional diagnostics that look for deficits, we map your cognitive traits onto a 'Spiky Profile'—highlighting both your challenges and your strengths.",
      learnBtn: "Learn about the methods",
      sourcesTitle: "Clinical Instruments Adapted",
      spikyProfileTitle: "The Spiky Profile",
      spikyProfileDesc: "Neurodivergent individuals often have significant disparities between widely varying skills (e.g., high verbal ability but low processing speed). We visualize this variance.",
      modules: {
        adhd: { title: "ADHD Module", source: "Adapted from ASRS v1.1", desc: "Focuses on executive function, regulation, and attention." },
        autism: { title: "Autism Module", source: "Adapted from CAT-Q", desc: "Prioritizes internal experience, masking, and social compensation." },
        dyslexia: { title: "Dyslexia Module", source: "Vinegrad Adult Checklist", desc: "Assesses phonological processing and visual-spatial memory." },
        dyspraxia: { title: "Dyspraxia Module", source: "Adult DCD Checklist", desc: "Evaluates fine/gross motor coordination and planning usage." },
        dyscalculia: { title: "Dyscalculia Module", source: "Steve Chinn Checklist", desc: "Maps number sense, subitizing, and arithmetic anxiety." }
      }
    },
    faq: [
      {
        q: "What is Neurodiversity?",
        a: "Neurodiversity is the idea that differences in the human brain (like ADHD, Autism, Dyslexia) are natural variations, not deficits. It views these conditions as valid ways of thinking and processing information."
      },
      {
        q: "Is this a formal medical diagnosis?",
        a: "No. NeuroAlign is a screening tool designed to map potential traits and functional barriers. A formal diagnosis can only be provided by a qualified healthcare professional through a clinical interview."
      },
      {
        q: "How is this different from other online tests?",
        a: "Most tests look for 'deficits' based on external behavior. NeuroAlign uses a Biopsychosocial model, prioritizing your internal lived experience, the functional cost of masking, and the specific context of your struggles."
      },
      {
        q: "What is the 'Spiky Profile'?",
        a: "Neurodivergent individuals often have 'spiky' skill profiles—excelling in some areas while struggling significantly in others. We visualize this contrast instead of averaging everything into a single 'functioning' label."
      },
      {
        q: "How is the assessment scored?",
        a: "We use a frequency-based algorithm (Never to Very Often). Responses are weighted and normalized to produce a percentage intensity for each trait. Scores above 70% suggest a strong clinical alignment."
      },
      {
        q: "What scientific methods are used?",
        a: "We integrate established protocols: ASRS v1.1 for ADHD, CAT-Q for Autism/Masking, Vinegrad for Dyslexia, ADC for Dyspraxia, and Steve Chinn's work for Dyscalculia."
      },
      {
        q: "Is my data private?",
        a: "Yes. Your data never leaves your browser. All processing happens locally on your device. We do not use tracking cookies or store personal information on any server."
      },
      {
        q: "Can I have traits from multiple conditions?",
        a: "Absolutely. Co-occurrence (comorbidity) is the rule, not the exception. It is very common to have traits of both ADHD and Autism (AuDHD), or Dyslexia and Dyspraxia."
      },
      {
        q: "Is this assessment suitable for children?",
        a: "This tool is validated for adults. While traits are lifelong, the questions focus on adult manifestations, coping mechanisms, and retrospective childhood analysis suitable for adult recall."
      },
      {
        q: "What do I do with these results?",
        a: "Use this report to advocate for yourself. You can share it with a therapist, use the strategies to adjust your daily routine, or simply use it to understand why your brain works the way it does."
      }
    ],
    searchTerms: {
      specialist: "specialist",
      psychologist: "psychologist",
      psychiatrist: "\"psychiatrist\"",
      assessment: "assessment"
    },
    barrierLevels: {
      significant: "Significant Barriers",
      moderate: "Moderate Barriers",
      typical: "Typical Function"
    },
    domainIntros: {
      autism: "Social masking, compensation, and assimilation strategies.",
      adhd: "Executive function, attention regulation, and impulse control.",
      dyslexia: "Phonological processing, visual-spatial sequencing, and memory.",
      dyscalculia: "Number sense, subitizing, and arithmetic logic.",
      dyspraxia: "Motor coordination, planning, and sensory integration.",
      wellbeing: "Impact on daily life."
    },
    interpretations: {
      low: "Low Probability",
      possible: "Possible Traits / Sub-clinical",
      moderate: "Moderate Probability",
      high: "High Probability / Clinical Range"
    },
    subscales: {
      // ADHD
      Executive: "Executive Function",
      Sequencing: "Sequencing & Order",
      AdhdMemory: "Working Memory (ADHD)",
      Initiation: "Task Initiation",
      MotorAgitation: "Motor Agitation",
      Restlessness: "Internal Restlessness",
      Attention: "Sustained Attention",
      AuditoryProc: "Auditory Processing",
      Distraction: "Distractibility",
      Inhibition: "Inhibition Control",
      Regulation: "Emotional Regulation",
      Verbal: "Verbal Hyperactivity",
      Impulsivity: "Impulsivity",
      Timing: "Timing & Waiting",

      // Autism (CAT-Q)
      Compensation: "Social Compensation",
      Masking: "Masking Strategies",
      Assimilation: "Social Assimilation",
      Sensory: "Sensory Sensitivity",
      Predictability: "Predictability Needs",
      Energy: "Social Energy Cost",

      // Dyslexia
      Laterality: "Left/Right Laterality",
      Visuospatial: "Visuospatial Processing",
      Phonological: "Phonological Processing",
      VisualProc: "Visual Processing speed",
      DysMemory: "Verbal & Sequential Memory",
      Effort: "Reading Effort",
      Spelling: "Orthographic Coding",
      Graphomotor: "Graphomotor Skills",
      Organization: "Temporal Organization",
      Accuracy: "Clerical Accuracy",
      WrittenLoad: "Written Load Sensitivity",
      AdminFriction: "Administrative Friction",
      VerbalPref: "Verbal Preference",

      // Dyspraxia
      child_FineMotor: "Childhood Fine Motor",
      child_GrossMotor: "Childhood Gross Motor",
      child_Main: "Childhood Coordination",
      adult_GrossMotor: "Adult Gross Motor",
      adult_Planning: "Motor Planning (Praxis)",
      adult_FineMotor: "Adult Fine Motor",
      ExecutionGap: "Idea-Action Gap",
      PhysicalFatigue: "Physical Fatigue",

      // Dyscalculia
      NumberSense: "Core Number Sense",
      Subitizing: "Subitizing Ability",
      WorkingMemory: "Working Memory (Math)",
      Estimation: "Estimation",
      Retrieval: "Fact Retrieval",
      Arithmetic: "Arithmetic Operations",
      Symbols: "Symbol Recognition",
      Functional: "Functional Numeracy",
      Anxiety: "Math Anxiety",
      MentalMath: "Mental Math",
      MathMemory: "Numerical Memory",
      TimeMoney: "Time & Money Abstraction",
      Financial: "Financial Load"
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
    urgentDesc: "Your responses indicate significant acute distress. Please prioritize reaching out to a healthcare professional or emergency services for immediate support.",
    coOccurrence: "AuDHD Pattern: Overlap of Autism and ADHD traits.",
    maskingFlag: "High Masking (CAT-Q > 120): Results may be suppressed by coping strategies.",
    headInjuryFlag: "Head Injury Noted.",
    depressionFlag: "Depression Alert.",
    specialistFlag: "Neurological consultation recommended due to medical history.",
    SensoryOverload: "Significant Sensory Overload Risk",
    AnxietyMasking: "Potential Anxiety Masking Effect",
    MathAnxiety: "Math Anxiety (vs Dyscalculia)",
    dyslexiaDyspraxiaOverlap: "Dyslexia & Dyspraxia Co-Occurrence",
    likert: {
      stronglyDisagree: "Strongly Disagree",
      disagree: "Disagree",
      somewhatDisagree: "Somewhat Disagree",
      neutral: "Neutral",
      somewhatAgree: "Somewhat Agree",
      agree: "Agree",
      stronglyAgree: "Strongly Agree",
      yes: "Yes",
      no: "No",
      frequency: {
        never: "Never",
        rarely: "Rarely",
        sometimes: "Sometimes",
        often: "Often",
        veryOften: "Very Often",
        always: "Always"
      }
    },
    phases: {
      Intake: "Intake",
      "Autism Spectrum": "Autism (Masking)",
      ADHD: "ADHD (Executive)",
      Dyslexia: "Dyslexia",
      Dyscalculia: "Dyscalculia",
      Dyspraxia: "Dyspraxia (DCD)",
      "Language Disorder": "Language (Legacy)",
      Comorbidities: "Co-occurring Patterns",
      "Functional Impact": "Functional Impact"
    },
    chart: {
      intensity: "Intensity",
      barrierLevel: "Barrier Level",
      domain: "Domain",
      score: "Score",
      interpretation: "Interpretation",
      functionalArea: "Functional Area",
      impact: "Impact",
      fullLog: "Full Item Response Log",
      item: "Item"
    },
    methodsPage: {
      title: "Scientific Methodology",
      subtitle: "Unified Adult Neurodiversity Assessment Framework",
      backBtn: "Back to Home",
      startBtn: "Start Assessment",
      intro: {
        title: "The Paradigm Shift",
        text: "The clinical approach to neurodevelopmental conditions has traditionally operated within a pathological model, categorizing individuals into discrete silos (ADHD, Autism, etc.). This often fails to capture the complex, overlapping reality of adult neurodivergence. NeuroAlign moves towards a Biopsychosocial and Symptom-Based Approach, prioritizing your lived experience and functional cost over external behavioral observation."
      },
      spikyProfile: {
        title: "The 'Spiky Profile'",
        text: "Unlike binary diagnostic tools, we do not produce a singular 'neurodiversity score'. Instead, we generate a 'Neurodivergent Heatmap' or 'Spiky Profile'. This visualization maps your cognitive peaks and dips, identifying specific signatures like the 'AuDHD' profile where high structure-seeking traits (Autism) may mask impulsivity (ADHD)."
      },
      modulesTitle: "Assessment Modules",
      modules: {
        adhd: {
          title: "Module I: ADHD",
          subtitle: "Executive Function & Regulation",
          tool: "Adapted from ASRS v1.1 (WHO)",
          description: "Adult ADHD is rarely defined by the overt hyperactivity seen in children; instead, it manifests as deficits in Executive Function—specifically in working memory, emotional regulation, and internal restlessness.",
          citations: [
            { text: "ASRS v1.1 Information", url: "https://add.org/wp-content/uploads/2015/03/adhd-questionnaire-ASRS111.pdf" },
            { text: "WHO ADHD Screeners", url: "https://www.hcp.med.harvard.edu/ncs/asrs.php" }
          ]
        },
        autism: {
          title: "Module II: Autism",
          subtitle: "The Camouflaging Paradigm",
          tool: "Adapted from CAT-Q",
          description: "Traditional tools often miss adults (especially women) who have developed sophisticated compensatory mechanisms. We use the Camouflaging Autistic Traits Questionnaire (CAT-Q) to measure the strategy and effort of social coping (Masking, Assimilation).",
          citations: [
            { text: "CAT-Q Research", url: "https://docs.autismresearchcentre.com/papers/2018_Hull_etal_CAT-Q.pdf" },
            { text: "Camouflaging in Autism", url: "https://molecularautism.biomedcentral.com/articles/10.1186/s13229-019-0274-6" }
          ]
        },
        dyslexia: {
          title: "Module III: Dyslexia",
          subtitle: "Processing & Literacy",
          tool: "Vinegrad Adult Checklist",
          description: "Dyslexia in adults is not merely a reading difficulty; it is a fundamental difference in information processing. We assess persistent 'soft signs' like directional confusion, rapid naming, and auditory working memory.",
          citations: [
            { text: "Vinegrad Checklist", url: "https://cdn.bdadyslexia.org.uk/uploads/documents/Dyslexia/Adult-Checklist-2022.pdf?v=1661250672" },
            { text: "Adult Dyslexia Signs", url: "https://www.bdadyslexia.org.uk/dyslexia/how-is-dyslexia-diagnosed/dyslexia-checklists" }
          ]
        },
        dyspraxia: {
          title: "Module IV: Dyspraxia (DCD)",
          subtitle: "Motor Planning & Praxis",
          tool: "Adult DCD Checklist (ADC)",
          description: "Dyspraxia involves deficits in motor planning (praxis) and proprioception. Our module evaluates both current functional impairment and retrospective childhood history, as required by diagnostic criteria.",
          citations: [
            { text: "ADC Checklist Study", url: "https://www.dyspraxiafoundation.org.uk/" },
            { text: "DCD in Adults", url: "https://canchild.ca/en/diagnoses/developmental-coordination-disorder" }
          ]
        },
        dyscalculia: {
          title: "Module V: Dyscalculia",
          subtitle: "Number Sense & Anxiety",
          tool: "Steve Chinn Checklist",
          description: "We distinguish between true Dyscalculia (a core deficit in the Approximate Number System) and Maths Anxiety. The assessment probes your intuitive grasp of quantity and subitizing ability.",
          citations: [
            { text: "Steve Chinn's Research", url: "https://www.stevechinn.co.uk/dyscalculia/checklist" },
            { text: "The Approximate Number System", url: "https://www.Dyscalculia.org/" }
          ]
        }
      },
      scoring: {
        title: "Scoring Mechanism",
        text: "All items use a frequency-based Likert scale (Never to Very Often) or binary checks. The algorithm normalizes these raw scores into a percentage intensity for each domain. Scores > 70% indicate a high clinical probability ('Red Zone'), while scores 30-70% suggest sub-clinical traits."
      }
    },
    errors: {
      scoring: "Scoring error.",
      pdf: "Could not generate PDF."
    }
  },
  fr: {
    title: "NeuroAlign",
    subtitle: "Évaluation unifiée de la neurodiversité adulte",
    introTitle: "NeuroAlign",
    introDesc: "Un protocole complet d'auto-évaluation pour la neurodiversité adulte, intégrant les profils TDAH, Autisme, Dyslexie, Dyspraxie et Dyscalculie dans une carte thermique 'spiky profile'.",
    disclaimerTitle: "Avis Médical",
    disclaimerText: "NeuroAlign est un outil de dépistage conçu pour cartographier les traits cognitifs sur la base de cadres cliniques (ASRS, CAT-Q, Vinegrad, ADC, Chinn). CE N'EST PAS UN DIAGNOSTIC. Seul un professionnel de santé qualifié peut fournir un diagnostic médical formel. Si vous traversez une crise de santé mentale, veuillez contacter les services d'urgence locaux.",
    disclaimerCheck: "Je reconnais qu'il s'agit d'un outil de dépistage et non d'un diagnostic clinique.",
    disclaimerBtn: "Reconnaître et Continuer",
    domainsTitle: "Domaines de dépistage",
    startBtn: "Commencer l'évaluation",
    continueBtn: "Reprendre l'évaluation",
    startNewBtn: "Commencer une nouvelle évaluation",
    saveAndExit: "Enregistrer et Quitter",
    saveNotice: "La progression est cryptée et sauvegardée localement. Aucune donnée ne quitte votre appareil.",
    back: "Retour",
    localSave: "Votre réponse est sauvegardée localement",
    footer: "Protocole NeuroAlign MethodeII v2.0 • Respect de la vie privée • Mieux vaut fait que parfait.",
    reportTitle: "Votre Profil de Neurodiversité",
    reportDesc: "Ce rapport cartographie votre profil cognitif unique à partir de vos réponses. Il visualise comment votre cerveau traite le monde, en mettant en lumière à la fois vos défis et vos forces.",
    keyFindings: "Indicateurs Cliniques & Alertes",
    nextSteps: "Conseils Personnalisés",
    clinicalPath: "Parcours Clinique",
    clinicalDesc: "Envisagez de partager ce rapport avec un professionnel de santé, particulièrement un neuropsychologue.",
    selfCare: "Soutien Neuro-Affirmatif",
    selfCareDesc: "Privilégiez les stratégies adaptées à votre fonctionnement : ajustements sensoriels, aides externes pour la mémoire et connexion avec la communauté.",
    downloadPdf: "Télécharger le Rapport",
    retake: "Recommencer l'évaluation",
    functionalImpactTitle: "Profil de Vie Quotidienne",
    wellbeingTitle: "Analyse Détaillée des Sous-échelles",
    preliminaryResults: "Résultats Préliminaires",
    coreProfiles: "Profils Neuro-Fondamentaux",
    specializedProfiles: "Profils Cognitifs Spécialisés",
    reportFooter: "Rapport de Synthèse NeuroAlign • Contexte diagnostique requis",
    reportLabels: {
      livedExperience: "Expérience Vécue",
      neuroStrengths: "Neuro-Forces",
      strategies: "Stratégies & Conseils",
      practicalSupport: "Soutien Pratique",
      quickActions: "Actions Rapides",
      tools: "Outils Recommandés",
      guides: "Guides Approfondis",
      subscaleBreakdown: "Analyse des Sous-échelles",
      insightPrompt: "Consultez les informations ci-dessous pour une interprétation détaillée adaptée à ce profil.",
      spikyProfile: "Visualisation du Profil Hétérogène"
    },
    faqTitle: "Questions Fréquemment Posées",
    breakMoments: {
      title: "Pause Bien-être",
      congrats: "Bravo de prendre ce temps pour vous !",
      continue: "Reprendre l'évaluation",
      messages: [
        "Prenez une petite gorgée d'eau 💧",
        "Étirez vos bras et vos jambes 🧘",
        "Prenez une grande inspiration... et soufflez 🌬️",
        "Et si vous faisiez quelques pas ? 🚶",
        "Reposez vos yeux un instant 👁️",
        "Vous avancez bien, une étape à la fois ! ✨"
      ]
    },
    insights: {
      adhd: {
        whatItMeans: "Vos résultats suggèrent un système nerveux basé sur l'intérêt. Ce n'est pas un déficit d'attention, mais une régulation inconstante basée sur la nouveauté et l'urgence.",
        strengths: ["Hyperfocalisation", "Résolution créative", "Résilience en crise", "Pensée générative"],
        tips: ["Utilisez le 'Body Doubling' (travailler avec quelqu'un) pour les tâches ennuyeuses.", "Consultez votre 'Menu' d'activités stimulantes quand vous êtes bloqué.", "Externalisez le temps (minuteurs visuels) pour combattre la cécité temporelle."],
        tools: ["Goblin.tools (Découpage de tâches IA)", "Focusmate (Body Doubling Virtuel)", "Time Timers (Minuteurs visuels)", "Casque à réduction de bruit active", "Fidgets / Pierres sensorielles"],
        guides: ["Menu Dopamine : Créez un menu d'activités stimulantes (Entrées, Plats, Desserts) pour booster l'initiation.", "Gamification : Transformez les tâches en 'Quêtes' ou 'Boss' avec des récompenses d'XP pour pirater votre système de récompense.", "Le Lancement '5-Minutes' : Engagez-vous à faire seulement 5 minutes d'une tâche pour surmonter le mur de l'initiation."]
      },
      autism: {
        whatItMeans: "Ce profil suggère un neurotype axé sur le traitement profond de l'information, la reconnaissance de modèles et une expérience sensorielle distincte.",
        strengths: ["Expertise profonde", "Reconnaissance de motifs", "Honnêteté logique", "Joie sensorielle"],
        tips: ["Programmez des 'pauses sensorielles' régulières avant de vous sentir submergé.", "Communiquez votre besoin de 'temps de récupération' à vos proches.", "Utilisez une communication directe et claire."],
        tools: ["Casque à réduction de bruit (ANC)", "Couvertures pondérées (Thérapie par pression)", "Lunettes teintées (TheraSpecs)", "Cartes / Badge de communication"],
        guides: ["Régime Sensoriel : Élaborez un apport quotidien d'intrants sensoriels (apaisants vs alertants) pour gérer la régulation.", "Comptabilité Énergétique : Traitez l'énergie comme un compte en banque. Équilibrez les retraits (social, masquage) avec les dépôts (solitude, intérêts spécifiques).", "Espaces Sûrs : Désignez des zones physiques où le 'masque' est totalement tombé pour prévenir le burnout."]
      },
      dyslexia: {
        whatItMeans: "La dyslexie est une différence dans le traitement du langage (phonologie) et des séquences. Elle coexiste souvent avec un fort raisonnement visuo-spatial.",
        strengths: ["Pensée 3D/Visuelle", "Raisonnement narratif", "Pensée interconnectée", "Stratégie globale"],
        tips: ["Utilisez la synthèse vocale et la dictée.", "Privilégiez les polices sans-serif (comme OpenDyslexic).", "Appuyez-vous sur votre pensée globale plutôt que de vous perdre dans les détails."],
        tools: ["Synthèse vocale (Speechify, NaturalReader)", "Polices pour dyslexie (OpenDyslexic)", "Dictée Vocale (Dragon)", "Règles de lecture / Filtres colorés"],
        guides: ["Mind Mapping : Utilisez des structures visuelles (Miro, Obsidian) plutôt que des notes linéaires pour correspondre à votre pensée.", "La Règle 'Zéro Ambiguïté' : Demandez des instructions écrites et concrètes pour réduire la charge de traitement.", "Apprentissage Multi-sensoriel : Engagez les canaux auditifs et visuels simultanément pour booster la rétention."]
      },
      dyspraxia: {
        whatItMeans: "La dyspraxie (TDC) affecte la planification des mouvements et l'organisation des pensées. C'est le décalage entre 'l'idée' et 'l'action'.",
        strengths: ["Forte capacité verbale", "Empathie et détermination", "Mémoire à long terme", "Stratégie"],
        tips: ["Concentrez-vous sur un seul mouvement à la fois plutôt que sur toute la séquence.", "Utilisez le numérique pour contourner la charge motrice.", "Accordez-vous plus de temps pour les nouvelles habiletés."],
        tools: ["Gestionnaires de projet (Trello, Asana)", "Claviers/Souris ergonomiques", "Contrôle Vocal / Domotique", "Calendriers numériques avec rappels multiples"],
        guides: ["Micro-tâches : Décomposez les tâches physiques en étapes minuscules pour surmonter la fatigue de planification.", "Cartes de Processus Visuels : Utilisez des diagrammes pour séquencer les actions au lieu de les garder en mémoire de travail.", "Zones de Calme Physique : Créez des espaces sans distraction pour réduire la charge cognitive du mouvement."]
      },
      dyscalculia: {
        whatItMeans: "Ce profil indique une différence dans le 'Sens du Nombre'. C'est une distinction purement cognitive, sans lien avec l'intelligence générale.",
        strengths: ["Logique verbale", "Estimation intuitive", "Créativité littéraire", "Concepts stratégiques"],
        tips: ["Dessinez les problèmes ou utilisez des objets physiques pour rendre les chiffres réels.", "Refusez poliment le calcul mental rapide en public.", "Liez les chiffres à des objets physiques ou des concepts spatiaux."],
        tools: ["Calculatrices Visuelles", "Papier quadrillé (pour l'alignement)", "Objets de manipulation (Physiques)", "Tableurs (Excel/Sheets) pour le calcul auto"],
        guides: ["Visualisation des Maths : Utilisez des diagrammes et des représentations spatiales au lieu de symboles abstraits.", "La Règle de la Calculatrice : Utilisez les outils sans honte ; c'est un aménagement valide, pas de la triche.", "Ancrage Réel : Liez les nombres abstraits à des objets physiques ou des contextes personnels."]
      }
    },
    methodology: {
      title: "Science & Méthodologie",
      description: "NeuroAlign (MethodeII) adopte une approche globale. Contrairement aux approches basées sur les déficits, nous cartographions vos traits sur un 'Profil Hétérogène' — mettant en lumière à la fois vos défis et vos forces.",
      learnBtn: "Découvrir la méthodologie",
      sourcesTitle: "Instruments Cliniques Adaptés",
      spikyProfileTitle: "Le Profil Hétérogène",
      spikyProfileDesc: "Les personnes neurodivergentes présentent souvent des écarts significatifs entre des compétences très variées (ex: forte capacité verbale mais faible vitesse de traitement). Nous visualisons cette variance.",
      modules: {
        adhd: { title: "Module TDAH", source: "Adapté de l'ASRS v1.1", desc: "Focalisé sur les fonctions exécutives, la régulation et l'attention." },
        autism: { title: "Module Autisme", source: "Adapté du CAT-Q", desc: "Priorise l'expérience interne, le masquage et la compensation sociale." },
        dyslexia: { title: "Module Dyslexie", source: "Liste Vinegrad Adulte", desc: "Évalue le traitement phonologique et la mémoire visuo-spatiale." },
        dyspraxia: { title: "Module Dyspraxie", source: "Liste TDC Adulte", desc: "Évalue la coordination motrice fine/globale et la planification." },
        dyscalculia: { title: "Module Dyscalculie", source: "Liste Steve Chinn", desc: "Cartographie le sens du nombre et l'anxiété mathématique." }
      }
    },
    faq: [
      {
        q: "Qu'est-ce que la Neurodiversité ?",
        a: "La neurodiversité est l'idée que les différences neurologiques (TDAH, Autisme, etc.) sont des variations naturelles du cerveau humain, et non des déficits."
      },
      {
        q: "Est-ce un diagnostic médical formel ?",
        a: "Non. NeuroAlign est un outil de dépistage. Il identifie des probabilités et des traits. Seul un professionnel de santé qualifié peut poser un diagnostic officiel après un bilan complet."
      },
      {
        q: "En quoi est-ce différent des autres tests ?",
        a: "Contrairement aux tests basés sur l'observation, NeuroAlign utilise un modèle Bio-psycho-social. Nous privilégions votre ressenti interne, le coût du 'masquage' et l'impact fonctionnel réel."
      },
      {
        q: "Qu'est-ce que le 'Profil en Pics' ?",
        a: "Les personnes neuroatypiques ont souvent des compétences inégales : excellentes dans certains domaines, mais en difficulté dans d'autres. Nous visualisons ces écarts plutôt que de faire une moyenne."
      },
      {
        q: "Comment fonctionne le système de notation ?",
        a: "Nous utilisons une échelle de fréquence (Jamais à Très Souvent). L'algorithme pondère les réponses pour donner un pourcentage d'intensité. Un score > 70% indique une forte probabilité clinique."
      },
      {
        q: "Quelles méthodes scientifiques sont utilisées ?",
        a: "Nous intégrons des protocoles reconnus : ASRS v1.1 (TDAH), CAT-Q (Autisme/Camouflage), Vinegrad (Dyslexie), ADC (Dyspraxie) et les travaux de Steve Chinn (Dyscalculie)."
      },
      {
        q: "Mes données sont-elles privées ?",
        a: "Oui. Tout se passe localement dans votre navigateur. Aucune donnée personnelle n'est envoyée sur un serveur ni stockée via des cookies de traçage."
      },
      {
        q: "Puis-je avoir des traits de conditions multiples ?",
        a: "Oui, c'est très fréquent. La co-occurrence est la norme. Par exemple, l'association TDAH et Autisme (AuDHD) ou Dyslexie et Dyspraxie est courante."
      },
      {
        q: "Que faire de ces résultats ?",
        a: "Utilisez ce rapport pour défendre vos besoins. Partagez-le avec un thérapeute, adoptez les stratégies proposées ou utilisez-le simplement pour mieux comprendre votre fonctionnement."
      },
      {
        q: "Cet outil est-il adapté aux enfants ?",
        a: "Non, il est conçu pour les adultes. Les questions portent sur le vécu adulte et la rétrospective de l'enfance avec un recul d'adulte."
      }
    ],
    searchTerms: {
      specialist: "spécialiste",
      psychologist: "psychologue",
      psychiatrist: "\"psychiatre\"",
      assessment: "bilan"
    },
    barrierLevels: {
      significant: "Obstacles Significatifs",
      moderate: "Obstacles Modérés",
      typical: "Fonctionnement Typique"
    },
    domainIntros: {
      autism: "Masquage social, compensation et assimilation.",
      adhd: "Fonctions exécutives, attention et impulsivité.",
      dyslexia: "Traitement phonologique et mémoire visuo-spatiale.",
      dyscalculia: "Sens du nombre et logique arithmétique.",
      dyspraxia: "Coordination motrice et planification.",
      wellbeing: "Impact sur la vie quotidienne."
    },
    interpretations: {
      low: "Faible Probabilité",
      possible: "Traits Possibles / Sub-clinique",
      moderate: "Probabilité Modérée",
      high: "Forte Probabilité / Portée Clinique"
    },
    subscales: {
      // ADHD
      Executive: "Fonctions Exécutives",
      Sequencing: "Séquençage & Ordre",
      AdhdMemory: "Mémoire de Travail (TDAH)",
      Initiation: "Initiation de Tâche",
      MotorAgitation: "Agitation Motrice",
      Restlessness: "Agitation Interne",
      Attention: "Attention Soutenue",
      AuditoryProc: "Traitement Auditif",
      Distraction: "Distractibilité",
      Inhibition: "Contrôle de l'Inhibition",
      Regulation: "Régulation Émotionnelle",
      Verbal: "Hyperactivité Verbale",
      Impulsivity: "Impulsivité",
      Timing: "Timing & Attente",

      // Autism (CAT-Q)
      Compensation: "Compensation Sociale",
      Masking: "Stratégies de Masquage",
      Assimilation: "Assimilation Sociale",
      Sensory: "Hypersensibilité Sensorielle",
      Predictability: "Besoin de Prédictibilité",
      Energy: "Coût Énergétique Social",

      // Dyslexia
      Laterality: "Latéralité Gauche/Droite",
      Visuospatial: "Traitement Visuospatial",
      Phonological: "Traitement Phonologique",
      VisualProc: "Vitesse de Traitement Visuel",
      DysMemory: "Mémoire Verbale & Séquentielle",
      Effort: "Effort de Lecture",
      Spelling: "Codage Orthographique",
      Graphomotor: "Graphomotricité (Écriture)",
      Organization: "Organisation Temporelle",
      Accuracy: "Précision Administrative",
      WrittenLoad: "Sensibilité à la Charge Écrite",
      AdminFriction: "Friction Administrative",
      VerbalPref: "Préférence Verbale",

      // Dyspraxia
      child_FineMotor: "Motricité Fine (Enfance)",
      child_GrossMotor: "Motricité Globale (Enfance)",
      child_Main: "Coordination (Enfance)",
      adult_GrossMotor: "Motricité Globale (Adulte)",
      adult_Planning: "Planification Motrice",
      adult_FineMotor: "Motricité Fine (Adulte)",
      ExecutionGap: "Décalage Idée-Action",
      PhysicalFatigue: "Fatigue Physique",

      // Dyscalculia
      NumberSense: "Sens du Nombre",
      Subitizing: "Capacité de Subitisation",
      WorkingMemory: "Mémoire de Travail (Maths)",
      Estimation: "Estimation",
      Retrieval: "Récupération des Faits",
      Arithmetic: "Opérations Arithmétiques",
      Symbols: "Reconnaissance des Symboles",
      Functional: "Calcul Fonctionnel",
      Anxiety: "Anxiété Mathématique",
      MentalMath: "Calcul Mental",
      MathMemory: "Mémoire Numérique",
      TimeMoney: "Abstraction Temps & Argent",
      Financial: "Charge Cognitive Financière"
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
    urgentFlag: "URGENT : Soutien immédiat conseillé.",
    urgentDesc: "Vos réponses indiquent une détresse aiguë importante. Veuillez contacter en priorité les services d'urgence ou un professionnel de santé.",
    coOccurrence: "Profil AuDHD : Chevauchement Autisme / TDAH.",
    maskingFlag: "Masquage Élevé (CAT-Q > 120) : Résultats potentiellement supprimés.",
    headInjuryFlag: "Traumatisme crânien noté.",
    depressionFlag: "Alerte Dépression.",
    specialistFlag: "Consultation neurologique recommandée en raison des antécédents médicaux.",
    SensoryOverload: "Risque de Surcharge Sensorielle Significatif",
    AnxietyMasking: "Effet de Masquage par l'Anxiété Potentiel",
    MathAnxiety: "Anxiété Mathématique (vs Dyscalculie)",
    dyslexiaDyspraxiaOverlap: "Co-occurrence Dyslexie & Dyspraxie",
    likert: {
      stronglyDisagree: "Pas du tout d'accord",
      disagree: "Pas d'accord",
      somewhatDisagree: "Plutôt pas d'accord",
      neutral: "Neutre",
      somewhatAgree: "Plutôt d'accord",
      agree: "D'accord",
      stronglyAgree: "Tout à fait d'accord",
      yes: "Oui",
      no: "Non",
      frequency: {
        never: "Jamais",
        rarely: "Rarement",
        sometimes: "Parfois",
        often: "Souvent",
        veryOften: "Très Souvent",
        always: "Toujours"
      }
    },
    phases: {
      Intake: "Admission",
      "Autism Spectrum": "Autisme (Masquage)",
      ADHD: "TDAH (Exécutif)",
      Dyslexia: "Dyslexie",
      Dyscalculia: "Dyscalculie",
      Dyspraxia: "Dyspraxie (DCD)",
      "Language Disorder": "Trouble du Langage",
      Comorbidities: "Co-occurrences",
      "Functional Impact": "Impact Fonctionnel"
    },
    chart: {
      intensity: "Intensité",
      barrierLevel: "Niveau d'obstacle",
      domain: "Domaine",
      score: "Score",
      interpretation: "Interprétation",
      functionalArea: "Domaine Fonctionnel",
      impact: "Impact",
      fullLog: "Journal des réponses complet",
      item: "Item"
    },
    methodsPage: {
      title: "Méthodologie Scientifique",
      subtitle: "Cadre Unifié d'Évaluation de la Neurodiversité Adulte",
      backBtn: "Retour à l'accueil",
      startBtn: "Commencer l'évaluation",
      intro: {
        title: "Le Changement de Paradigme",
        text: "L'approche clinique traditionnelle classe les individus dans des cases distinctes (TDAH, Autisme, etc.), échouant souvent à saisir la réalité complexe de la neurodivergence adulte. NeuroAlign adopte une approche Biopsychosociale, priorisant votre expérience vécue et le coût fonctionnel plutôt que la simple observation comportementale externe."
      },
      spikyProfile: {
        title: "Le 'Profil Hétérogène'",
        text: "Contrairement aux outils binaires, nous ne produisons pas un score unique. Nous générons une 'Carte Thermique' ou 'Profil Hétérogène'. Cette visualisation cartographie vos pics et vos creux cognitifs, identifiant des signatures spécifiques comme le profil 'AuDHD' où le besoin de structure (Autisme) peut masquer l'impulsivité (TDAH)."
      },
      modulesTitle: "Modules d'Évaluation",
      modules: {
        adhd: {
          title: "Module I: TDAH",
          subtitle: "Fonctions Exécutives & Régulation",
          tool: "Adapté de l'ASRS v1.1 (OMS)",
          description: "Le TDAH adulte est rarement défini par l'hyperactivité visible de l'enfance; il se manifeste plutôt par des déficits des Fonctions Exécutives — mémoire de travail, régulation émotionnelle et agitation interne.",
          citations: [
            { text: "ASRS v1.1 Info", url: "https://add.org/wp-content/uploads/2015/03/adhd-questionnaire-ASRS111.pdf" },
            { text: "Screeners OMS", url: "https://www.hcp.med.harvard.edu/ncs/asrs.php" }
          ]
        },
        autism: {
          title: "Module II: Autisme",
          subtitle: "Le Paradigme du Masquage",
          tool: "Adapté du CAT-Q",
          description: "Les outils classiques manquent souvent les adultes (surtout les femmes) ayant développé des mécanismes de compensation. Nous utilisons le CAT-Q pour mesurer l'effort de 'Masquage' et d'accommodation sociale.",
          citations: [
            { text: "Recherche CAT-Q", url: "https://docs.autismresearchcentre.com/papers/2018_Hull_etal_CAT-Q.pdf" },
            { text: "Masquage dans l'Autisme", url: "https://molecularautism.biomedcentral.com/articles/10.1186/s13229-019-0274-6" }
          ]
        },
        dyslexia: {
          title: "Module III: Dyslexie",
          subtitle: "Traitement & Lecto-écriture",
          tool: "Liste Vinegrad Adulte",
          description: "La dyslexie adulte n'est pas juste une difficulté de lecture; c'est une différence fondamentale de traitement. Nous évaluons les 'signes discrets' comme la confusion droite/gauche, la mémoire de travail et la dénomination rapide.",
          citations: [
            { text: "Checklist Vinegrad", url: "https://cdn.bdadyslexia.org.uk/uploads/documents/Dyslexia/Adult-Checklist-2022.pdf?v=1661250672" },
            { text: "Signes Dyslexie Adulte", url: "https://www.bdadyslexia.org.uk/dyslexia/how-is-dyslexia-diagnosed/dyslexia-checklists" }
          ]
        },
        dyspraxia: {
          title: "Module IV: Dyspraxie (TDC)",
          subtitle: "Planification Motrice & Praxie",
          tool: "Liste TDC Adulte (ADC)",
          description: "La dyspraxie implique des déficits de planification motrice. Notre module évalue à la fois la gêne fonctionnelle actuelle et l'histoire rétrospective, comme requis par les critères diagnostiques.",
          citations: [
            { text: "Étude ADC", url: "https://www.dyspraxiafoundation.org.uk/" },
            { text: "TDC chez l'Adulte", url: "https://canchild.ca/en/diagnoses/developmental-coordination-disorder" }
          ]
        },
        dyscalculia: {
          title: "Module V: Dyscalculie",
          subtitle: "Sens du Nombre & Anxiété",
          tool: "Liste Steve Chinn",
          description: "Nous distinguons la vraie Dyscalculie (un déficit du Système Numérique Approximatif) de l'Anxiété Mathématique. L'évaluation sonde votre compréhension intuitive de la quantité.",
          citations: [
            { text: "Recherche Steve Chinn", url: "https://www.stevechinn.co.uk/dyscalculia/checklist" },
            { text: "Système Numérique Approximatif", url: "https://www.Dyscalculia.org/" }
          ]
        }
      },
      scoring: {
        title: "Mécanisme de Notation",
        text: "Tous les items utilisent une échelle de fréquence (Jamais à Très Souvent). L'algorithme normalise ces scores en pourcentage d'intensité. > 70% indique une forte probabilité clinique, tandis que 30-70% suggère des traits sub-cliniques."
      }
    },
    errors: {
      scoring: "Erreur de calcul.",
      pdf: "Impossible de générer le PDF."
    }
  }
};