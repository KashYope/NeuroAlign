import { Phase, Question } from './types';

export const QUESTIONS: Question[] = [
  // ==================================================================================
  // PHASE 0: INTAKE & CONTEXT (SCREENING FOR CONFOUNDERS)
  // ==================================================================================
  {
    id: 'INT_01',
    phase: Phase.INTAKE,
    subscale: 'Mood',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you experience persistent low mood, lack of energy, or a feeling of 'emptiness' that affects your daily activities?",
      fr: "À quelle fréquence ressentez-vous une humeur basse persistante, un manque d'énergie ou un sentiment de 'vide' qui affecte vos activités ?"
    }
  },
  {
    id: 'INT_02',
    phase: Phase.INTAKE,
    subscale: 'Injury',
    scale: 'yes_no',
    text: {
      en: "Have you ever experienced a significant head injury, concussion, or loss of consciousness (e.g., from an accident or sports)?",
      fr: "Avez-vous déjà subi une blessure à la tête importante, une commotion cérébrale ou une perte de connaissance (ex: accident, sport) ?"
    }
  },
  {
    id: 'INT_03',
    phase: Phase.INTAKE,
    subscale: 'Neurology',
    scale: 'yes_no',
    text: {
      en: "Have you been diagnosed with or do you suspect a major neurological condition (such as epilepsy, Parkinson's, or MS)?",
      fr: "Avez-vous été diagnostiqué avec ou soupçonnez-vous une condition neurologique majeure (épilepsie, Parkinson, SEP, etc.) ?"
    }
  },
  {
    id: 'INT_04',
    phase: Phase.INTAKE,
    subscale: 'Crisis',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you experience 'dark thoughts' or suicidal ideation, or a feeling that you are in a state of crisis?",
      fr: "À quelle fréquence avez-vous des 'idées noires' ou des pensées suicidaires, ou le sentiment d'être en état de crise ?"
    }
  },

  // ==================================================================================
  // MODULE I: ADHD (ASRS v1.1 COMPATIBLE) - Scale 0-4
  // ==================================================================================

  // --- Part A: The Predictive Core ---
  {
    id: 'ADHD_01',
    phase: Phase.ADHD,
    subscale: 'Executive',
    scale: 'frequency_0_4',
    text: {
      en: "Once you have managed to complete the challenging, stimulating parts of a project, how often do you find yourself physically or mentally unable to wrap up the final, boring details?",
      fr: "Une fois que vous avez terminé les parties stimulantes d'un projet, à quelle fréquence vous trouvez-vous incapable de boucler les derniers détails ennuyeux ?"
    }
  },
  {
    id: 'ADHD_02',
    phase: Phase.ADHD,
    subscale: 'Sequencing',
    scale: 'frequency_0_4',
    text: {
      en: "When a task requires you to organize your thoughts or materials in a specific sequence, how often do you feel overwhelmed or unable to get things in order?",
      fr: "Quand une tâche nécessite d'organiser vos pensées ou votre matériel dans un ordre précis, à quelle fréquence vous sentez-vous dépassé(e) ?"
    }
  },
  {
    id: 'ADHD_03',
    phase: Phase.ADHD,
    subscale: 'AdhdMemory',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you find yourself forgetting appointments or obligations, even those that are important to you or that you genuinely wanted to attend?",
      fr: "À quelle fréquence oubliez-vous des rendez-vous ou des obligations, même ceux qui sont importants pour vous ?"
    }
  },
  {
    id: 'ADHD_04',
    phase: Phase.ADHD,
    subscale: 'Initiation',
    scale: 'frequency_0_4',
    text: {
      en: "When facing a task that requires a lot of thought, how often do you find yourself avoiding or delaying getting started (task paralysis)?",
      fr: "Face à une tâche demandant beaucoup de réflexion, à quelle fréquence évitez-vous ou retardez-vous le moment de vous y mettre ?"
    }
  },
  {
    id: 'ADHD_05',
    phase: Phase.ADHD,
    subscale: 'MotorAgitation',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you find yourself fidgeting, tapping your hands/feet, or squirming when you are required to sit still for a long time?",
      fr: "À quelle fréquence vous agitez-vous (taper des mains/pieds, bouger) lorsque vous devez rester assis longtemps ?"
    }
  },
  {
    id: 'ADHD_06',
    phase: Phase.ADHD,
    subscale: 'Restlessness',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you feel an internal sense of being overly active, or compelled to do things as if you were 'driven by a motor'?",
      fr: "À quelle fréquence ressentez-vous une activité interne excessive, comme si vous étiez 'mû(e) par un moteur' ?"
    }
  },

  // --- Part B: The Impairment Checklist ---
  {
    id: 'ADHD_07',
    phase: Phase.ADHD,
    subscale: 'Attention',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you make careless mistakes when you have to work on a boring or difficult project?",
      fr: "À quelle fréquence faites-vous des fautes d'étourderie lorsque vous travaillez sur un projet ennuyeux ou difficile ?"
    }
  },
  {
    id: 'ADHD_08',
    phase: Phase.ADHD,
    subscale: 'Attention',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you have difficulty keeping your attention focused when you are doing boring or repetitive work?",
      fr: "À quelle fréquence avez-vous du mal à garder votre attention sur un travail ennuyeux ou répétitif ?"
    }
  },
  {
    id: 'ADHD_09',
    phase: Phase.ADHD,
    subscale: 'AuditoryProc',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you find it difficult to concentrate on what people are saying to you, even when they are speaking to you directly?",
      fr: "À quelle fréquence avez-vous du mal à vous concentrer sur ce que l'on vous dit, même quand on s'adresse directement à vous ?"
    }
  },
  {
    id: 'ADHD_10',
    phase: Phase.ADHD,
    subscale: 'AdhdMemory',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you misplace or have difficulty finding things at home or at work (e.g., keys, phone, wallet)?",
      fr: "À quelle fréquence égarez-vous ou avez-vous du mal à retrouver vos affaires (clés, téléphone, portefeuille) ?"
    }
  },
  {
    id: 'ADHD_11',
    phase: Phase.ADHD,
    subscale: 'Distraction',
    scale: 'frequency_0_4',
    text: {
      en: "How often are you distracted by activity or noise around you?",
      fr: "À quelle fréquence êtes-vous distrait(e) par l'activité ou le bruit autour de vous ?"
    }
  },
  {
    id: 'ADHD_12',
    phase: Phase.ADHD,
    subscale: 'Inhibition',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?",
      fr: "À quelle fréquence quittez-vous votre siège lors de réunions ou situations où vous devriez rester assis(e) ?"
    }
  },
  {
    id: 'ADHD_13',
    phase: Phase.ADHD,
    subscale: 'Restlessness',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you feel restless or fidgety?",
      fr: "À quelle fréquence vous sentez-vous agité(e) ou nerveux(se) ?"
    }
  },
  {
    id: 'ADHD_14',
    phase: Phase.ADHD,
    subscale: 'Regulation',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you have difficulty unwinding and relaxing when you have time to yourself?",
      fr: "À quelle fréquence avez-vous du mal à décompresser et à vous détendre quand vous avez du temps pour vous ?"
    }
  },
  {
    id: 'ADHD_15',
    phase: Phase.ADHD,
    subscale: 'Verbal',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you find yourself talking too much when you are in social situations?",
      fr: "À quelle fréquence vous arrive-t-il de trop parler lors de situations sociales ?"
    }
  },
  {
    id: 'ADHD_16',
    phase: Phase.ADHD,
    subscale: 'Impulsivity',
    scale: 'frequency_0_4',
    text: {
      en: "When in a conversation, how often do you find yourself finishing other people's sentences before they can?",
      fr: "Dans une conversation, à quelle fréquence finissez-vous les phrases des autres avant eux ?"
    }
  },
  {
    id: 'ADHD_17',
    phase: Phase.ADHD,
    subscale: 'Timing',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you have difficulty waiting your turn in situations when turn taking is required?",
      fr: "À quelle fréquence avez-vous du mal à attendre votre tour ?"
    }
  },
  {
    id: 'ADHD_18',
    phase: Phase.ADHD,
    subscale: 'Impulsivity',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you interrupt others when they are busy?",
      fr: "À quelle fréquence interrompez-vous les autres quand ils sont occupés ?"
    }
  },

  // ==================================================================================
  // MODULE II: AUTISM (CAT-Q & MASKING FOCUS) - Scale 1-7
  // ==================================================================================

  // --- Factor 1: Compensation ---
  {
    id: 'CAT_01',
    phase: Phase.AUTISM,
    subscale: 'Compensation',
    scale: 'likert_7',
    text: {
      en: "When interacting with others, how often do you deliberately copy their body language or facial expressions to build rapport?",
      fr: "À quelle fréquence copiez-vous délibérément le langage corporel ou les expressions faciales de votre interlocuteur pour créer un lien ?"
    }
  },
  {
    id: 'CAT_04',
    phase: Phase.AUTISM,
    subscale: 'Compensation',
    scale: 'likert_7',
    text: {
      en: "How often do you rely on a prepared 'script' or set of phrases to get through social situations?",
      fr: "À quelle fréquence vous appuyez-vous sur un 'script' ou des phrases préparées pour gérer les situations sociales ?"
    }
  },
  {
    id: 'CAT_05',
    phase: Phase.AUTISM,
    subscale: 'Compensation',
    scale: 'likert_7',
    text: {
      en: "How often do you find yourself repeating phrases or distinct wording exactly as you first heard them?",
      fr: "À quelle fréquence vous surprenez-vous à répéter des phrases ou tournures exactement comme vous les avez entendues ?"
    }
  },
  {
    id: 'CAT_08',
    phase: Phase.AUTISM,
    subscale: 'Compensation',
    scale: 'likert_7',
    text: {
      en: "In social interactions, how often do you use specific behaviors that you have learned by watching others?",
      fr: "Dans les interactions sociales, à quelle fréquence utilisez-vous des comportements appris en observant les autres ?"
    }
  },
  {
    id: 'CAT_11',
    phase: Phase.AUTISM,
    subscale: 'Compensation',
    scale: 'likert_7',
    text: {
      en: "How often do you practice your facial expressions and body language in private to ensure they look natural?",
      fr: "À quelle fréquence exercez-vous vos expressions faciales en privé pour qu'elles paraissent naturelles ?"
    }
  },
  {
    id: 'CAT_14',
    phase: Phase.AUTISM,
    subscale: 'Compensation',
    scale: 'likert_7',
    text: {
      en: "How often do you explicitly research the rules of social interactions to improve your social skills?",
      fr: "À quelle fréquence faites-vous des recherches explicites sur les règles sociales pour vous améliorer ?"
    }
  },
  {
    id: 'CAT_17',
    phase: Phase.AUTISM,
    subscale: 'Compensation',
    scale: 'likert_7',
    text: {
      en: "How often do you learn how to speak or behave from media (TV, films, books) and apply it to your own interactions?",
      fr: "À quelle fréquence apprenez-vous à parler ou agir via les médias (TV, films, livres) pour l'appliquer ensuite ?"
    }
  },
  {
    id: 'CAT_20',
    phase: Phase.AUTISM,
    subscale: 'Compensation',
    scale: 'likert_7',
    text: {
      en: "How often do you think about the impression you make on others more than they likely think about you?",
      fr: "À quelle fréquence pensez-vous davantage à l'impression que vous donnez aux autres qu'eux ne pensent à vous ?"
    }
  },
  {
    id: 'CAT_23',
    phase: Phase.AUTISM,
    subscale: 'Compensation',
    scale: 'likert_7',
    text: {
      en: "How often do you pre-plan conversations in your head before they happen?",
      fr: "À quelle fréquence planifiez-vous les conversations dans votre tête avant qu'elles n'aient lieu ?"
    }
  },

  // --- Factor 2: Masking ---
  {
    id: 'CAT_02',
    phase: Phase.AUTISM,
    subscale: 'Masking',
    scale: 'likert_7',
    text: {
      en: "How often do you monitor your body language or facial expressions to ensure you appear relaxed?",
      fr: "À quelle fréquence surveillez-vous votre langage corporel pour avoir l'air détendu(e) ?"
    }
  },
  {
    id: 'CAT_06',
    phase: Phase.AUTISM,
    subscale: 'Masking',
    scale: 'likert_7',
    text: {
      en: "How often do you adjust your body language or face to appear interested, even if you are not?",
      fr: "À quelle fréquence ajustez-vous votre visage ou corps pour paraître intéressé(e), même si vous ne l'êtes pas ?"
    }
  },
  {
    id: 'CAT_09',
    phase: Phase.AUTISM,
    subscale: 'Masking',
    scale: 'likert_7',
    text: {
      en: "How often do you feel like you are 'acting' or playing a role rather than being yourself in social situations?",
      fr: "À quelle fréquence avez-vous l'impression de jouer un rôle plutôt que d'être vous-même en société ?"
    }
  },
  {
    id: 'CAT_12',
    phase: Phase.AUTISM,
    subscale: 'Masking',
    scale: 'likert_7',
    text: {
      en: "How often do you feel the need to put on an act to get through a social situation?",
      fr: "À quelle fréquence ressentez-vous le besoin de jouer la comédie pour traverser une situation sociale ?"
    }
  },
  {
    id: 'CAT_15',
    phase: Phase.AUTISM,
    subscale: 'Masking',
    scale: 'likert_7',
    text: {
      en: "How often do you consciously monitor your face and body to ensure you look interested in the person you are interacting with?",
      fr: "À quelle fréquence surveillez-vous consciemment votre visage pour avoir l'air intéressé(e) ?"
    }
  },
  {
    id: 'CAT_18',
    phase: Phase.AUTISM,
    subscale: 'Masking',
    isReverse: true,
    scale: 'likert_7',
    text: {
      en: "How often do you feel free to be your authentic self in social situations?",
      fr: "À quelle fréquence vous sentez-vous libre d'être authentiquement vous-même dans les situations sociales ?"
    }
  },
  {
    id: 'CAT_21',
    phase: Phase.AUTISM,
    subscale: 'Masking',
    scale: 'likert_7',
    text: {
      en: "How often are you acutely aware of the impression you are making on others?",
      fr: "À quelle fréquence êtes-vous extrêmement conscient(e) de l'impression que vous faites sur les autres ?"
    }
  },
  {
    id: 'CAT_24',
    phase: Phase.AUTISM,
    subscale: 'Masking',
    scale: 'likert_7',
    text: {
      en: "How often do you have to force yourself to make eye contact with others?",
      fr: "À quelle fréquence devez-vous vous forcer pour établir un contact visuel avec les autres ?"
    }
  },

  // --- Factor 3: Assimilation ---
  {
    id: 'CAT_03',
    phase: Phase.AUTISM,
    subscale: 'Assimilation',
    scale: 'likert_7',
    text: {
      en: "How often do you feel the need to put on an act in order to get through a social situation?",
      fr: "À quelle fréquence ressentez-vous le besoin de jouer un rôle pour gérer une situation sociale ?"
    }
  },
  {
    id: 'CAT_07',
    phase: Phase.AUTISM,
    subscale: 'Assimilation',
    scale: 'likert_7',
    text: {
      en: "In social situations, how often do you feel like you are 'performing' rather than being yourself?",
      fr: "En société, à quelle fréquence avez-vous l'impression de jouer un rôle plutôt que d'être vous-même ?"
    }
  },
  {
    id: 'CAT_10',
    phase: Phase.AUTISM,
    subscale: 'Assimilation',
    scale: 'likert_7',
    text: {
      en: "How often do you have to force yourself to interact with people when you are in social situations?",
      fr: "À quelle fréquence devez-vous vous forcer à interagir avec les gens dans les situations sociales ?"
    }
  },
  {
    id: 'CAT_13',
    phase: Phase.AUTISM,
    subscale: 'Assimilation',
    scale: 'likert_7',
    text: {
      en: "How often do you spend a lot of time thinking about what you are going to say before you say it?",
      fr: "À quelle fréquence passez-vous beaucoup de temps à penser à ce que vous allez dire avant de le dire ?"
    }
  },
  {
    id: 'CAT_16',
    phase: Phase.AUTISM,
    subscale: 'Assimilation',
    scale: 'likert_7',
    text: {
      en: "How often do you avoid interacting with people unless you absolutely have to?",
      fr: "À quelle fréquence évitez-vous d'interagir avec les gens à moins que ce ne soit absolument nécessaire ?"
    }
  },
  {
    id: 'CAT_19',
    phase: Phase.AUTISM,
    subscale: 'Assimilation',
    scale: 'likert_7',
    text: {
      en: "How often do you find it difficult to interact with people you don't know well?",
      fr: "À quelle fréquence trouvez-vous difficile d'interagir avec des gens que vous ne connaissez pas bien ?"
    }
  },
  {
    id: 'CAT_22',
    phase: Phase.AUTISM,
    subscale: 'Assimilation',
    scale: 'likert_7',
    text: {
      en: "How important is appearing 'normal' or 'socially competent' to you? (Frequency of concern)",
      fr: "À quel point est-ce important pour vous de paraître 'normal' ou socialement compétent ? (Fréquence de la préoccupation)"
    }
  },
  {
    id: 'CAT_25',
    phase: Phase.AUTISM,
    subscale: 'Assimilation',
    scale: 'likert_7',
    text: {
      en: "How often do you avoid social situations where you might have to interact with others?",
      fr: "À quelle fréquence évitez-vous les situations sociales où vous pourriez avoir à interagir avec d'autres ?"
    }
  },

  // ==================================================================================
  // AUTISM EXPANSION: SENSORY, COGNITIVE, ENERGY - Scale 0-4 (Frequency)
  // ==================================================================================
  {
    id: 'AUT_SENS_01',
    phase: Phase.AUTISM,
    subscale: 'Sensory',
    scale: 'frequency_0_4',
    text: {
      en: "How often do background noises (typing, conversations, traffic) make it hard for you to focus or think clearly?",
      fr: "À quelle fréquence les bruits de fond (clavier, conversations, circulation) vous empêchent-ils de vous concentrer ou de penser clairement ?"
    }
  },
  {
    id: 'AUT_SENS_02',
    phase: Phase.AUTISM,
    subscale: 'Sensory',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you feel physically uncomfortable because of lighting (brightness, flickering, neon lights)?",
      fr: "À quelle fréquence vous sentez-vous physiquement mal à l'aise à cause de l'éclairage (luminosité, scintillement, néons) ?"
    }
  },
  {
    id: 'AUT_SENS_03',
    phase: Phase.AUTISM,
    subscale: 'Sensory',
    scale: 'frequency_0_4',
    text: {
      en: "How often do certain sounds feel physically painful or overwhelming?",
      fr: "À quelle fréquence certains sons sont-ils physiquement douloureux ou accablants ?"
    }
  },
  {
    id: 'AUT_SENS_04',
    phase: Phase.AUTISM,
    subscale: 'Sensory',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you feel drained after spending time in noisy or crowded environments?",
      fr: "À quelle fréquence vous sentez-vous vidé(e) après avoir passé du temps dans des environnements bruyants ou bondés ?"
    }
  },
  {
    id: 'AUT_SENS_05',
    phase: Phase.AUTISM,
    subscale: 'Sensory',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you avoid places or situations mainly because of sensory discomfort?",
      fr: "À quelle fréquence évitez-vous des lieux ou situations principalement à cause d'un inconfort sensoriel ?"
    }
  },
  {
    id: 'AUT_SENS_06',
    phase: Phase.AUTISM,
    subscale: 'Sensory',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you need silence or darkness to recover after a stimulating day?",
      fr: "À quelle fréquence avez-vous besoin de silence ou d'obscurité pour récupérer après une journée stimulante ?"
    }
  },
  {
    id: 'AUT_SENS_07',
    phase: Phase.AUTISM,
    subscale: 'Sensory',
    scale: 'frequency_0_4',
    text: {
      en: "How often do clothing textures, temperatures, or smells distract or irritate you?",
      fr: "À quelle fréquence les textures de vêtements, températures ou odeurs vous distraient-elles ou vous irritent-elles ?"
    }
  },
  {
    id: 'AUT_SENS_08',
    phase: Phase.AUTISM,
    subscale: 'Sensory',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you feel overloaded when multiple sensory inputs happen at the same time?",
      fr: "À quelle fréquence vous sentez-vous surchargé(e) lorsque plusieurs stimuli sensoriels surviennent en même temps ?"
    }
  },
  {
    id: 'AUT_PRED_01',
    phase: Phase.AUTISM,
    subscale: 'Predictability',
    scale: 'frequency_0_4',
    text: {
      en: "How often do unexpected changes disrupt your ability to function or think clearly?",
      fr: "À quelle fréquence les changements imprévus perturbent-ils votre capacité à fonctionner ou penser clairement ?"
    }
  },
  {
    id: 'AUT_PRED_02',
    phase: Phase.AUTISM,
    subscale: 'Predictability',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you need clear structure or advance notice to feel comfortable starting a task?",
      fr: "À quelle fréquence avez-vous besoin d'une structure claire ou d'un préavis pour vous sentir à l'aise de commencer une tâche ?"
    }
  },
  {
    id: 'AUT_PRED_03',
    phase: Phase.AUTISM,
    subscale: 'Predictability',
    scale: 'frequency_0_4',
    text: {
      en: "How often do vague instructions leave you feeling anxious or blocked?",
      fr: "À quelle fréquence des instructions vagues vous laissent-elles anxieux(se) ou bloqué(e) ?"
    }
  },
  {
    id: 'AUT_PRED_04',
    phase: Phase.AUTISM,
    subscale: 'Predictability',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you prefer clear rules over implicit expectations?",
      fr: "À quelle fréquence préférez-vous des règles claires aux attentes implicites ?"
    }
  },
  {
    id: 'AUT_PRED_05',
    phase: Phase.AUTISM,
    subscale: 'Predictability',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you replay conversations or events to understand what went wrong?",
      fr: "À quelle fréquence rejouez-vous des conversations ou événements pour comprendre ce qui n'a pas été ?"
    }
  },
  {
    id: 'AUT_PRED_06',
    phase: Phase.AUTISM,
    subscale: 'Predictability',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you feel stressed when priorities change without explanation?",
      fr: "À quelle fréquence vous sentez-vous stressé(e) quand les priorités changent sans explication ?"
    }
  },
  {
    id: 'AUT_PRED_07',
    phase: Phase.AUTISM,
    subscale: 'Predictability',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you need extra time to mentally prepare for transitions?",
      fr: "À quelle fréquence avez-vous besoin de temps supplémentaire pour vous préparer mentalement aux transitions ?"
    }
  },
  {
    id: 'AUT_NRG_01',
    phase: Phase.AUTISM,
    subscale: 'Energy',
    scale: 'frequency_0_4',
    text: {
      en: "How often do social interactions leave you mentally exhausted, even if they went well?",
      fr: "À quelle fréquence les interactions sociales vous laissent-elles mentalement épuisé(e), même si elles se sont bien passées ?"
    }
  },
  {
    id: 'AUT_NRG_02',
    phase: Phase.AUTISM,
    subscale: 'Energy',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you feel you need to recover alone after meetings or group work?",
      fr: "À quelle fréquence ressentez-vous le besoin de récupérer seul(e) après des réunions ou travaux de groupe ?"
    }
  },
  {
    id: 'AUT_NRG_03',
    phase: Phase.AUTISM,
    subscale: 'Energy',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you feel functional at work but completely depleted afterwards?",
      fr: "À quelle fréquence vous sentez-vous fonctionnel(le) au travail mais complètement vidé(e) après ?"
    }
  },
  {
    id: 'AUT_NRG_04',
    phase: Phase.AUTISM,
    subscale: 'Energy',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you suppress your natural reactions to fit expectations?",
      fr: "À quelle fréquence réprimez-vous vos réactions naturelles pour correspondre aux attentes ?"
    }
  },
  {
    id: 'AUT_NRG_05',
    phase: Phase.AUTISM,
    subscale: 'Energy',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you feel your productivity drops sharply after social exposure?",
      fr: "À quelle fréquence sentez-vous que votre productivité chute brutalement après une exposition sociale ?"
    }
  },
  {
    id: 'AUT_NRG_06',
    phase: Phase.AUTISM,
    subscale: 'Energy',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you need solitude to regain mental clarity?",
      fr: "À quelle fréquence avez-vous besoin de solitude pour retrouver votre clarté mentale ?"
    }
  },

  // ==================================================================================
  // MODULE III: DYSLEXIA (VINEGRAD ADULT CHECKLIST) - Scale Yes/No
  // ==================================================================================
  {
    id: 'DYS_01',
    phase: Phase.DYSLEXIA,
    subscale: 'Laterality',
    scale: 'yes_no',
    text: {
      en: "How often do you have difficulty in telling left from right instantly?",
      fr: "À quelle fréquence avez-vous des difficultés à distinguer instantanément la gauche de la droite ?"
    }
  },
  {
    id: 'DYS_02',
    phase: Phase.DYSLEXIA,
    subscale: 'Visuospatial',
    scale: 'yes_no',
    text: {
      en: "How often do you find map reading or finding your way in a strange place confusing?",
      fr: "À quelle fréquence trouvez-vous la lecture de carte ou l'orientation confuse ?"
    }
  },
  {
    id: 'DYS_03',
    phase: Phase.DYSLEXIA,
    subscale: 'Phonological',
    scale: 'yes_no',
    text: {
      en: "How often do you dislike reading aloud?",
      fr: "À quelle fréquence n'aimez-vous pas lire à haute voix ?"
    }
  },
  {
    id: 'DYS_04',
    phase: Phase.DYSLEXIA,
    subscale: 'VisualProc',
    scale: 'yes_no',
    text: {
      en: "How often do you take longer than expected to read a page of a book?",
      fr: "À quelle fréquence mettez-vous plus de temps que prévu pour lire une page d'un livre ?"
    }
  },
  {
    id: 'DYS_05',
    phase: Phase.DYSLEXIA,
    subscale: 'DysMemory',
    scale: 'yes_no',
    text: {
      en: "How often do you find it difficult to remember the sense (meaning) of what you have just read?",
      fr: "À quelle fréquence trouvez-vous difficile de retenir le sens de ce que vous venez de lire ?"
    }
  },
  {
    id: 'DYS_06',
    phase: Phase.DYSLEXIA,
    subscale: 'Effort',
    scale: 'yes_no',
    text: {
      en: "How often do you find reading long books tedious or difficult?",
      fr: "À quelle fréquence trouvez-vous la lecture de longs livres fastidieuse ou difficile ?"
    }
  },
  {
    id: 'DYS_07',
    phase: Phase.DYSLEXIA,
    subscale: 'Spelling',
    scale: 'yes_no',
    text: {
      en: "How often do you rely on spell-checkers because of spelling difficulties?",
      fr: "À quelle fréquence dépendez-vous des correcteurs orthographiques à cause de difficultés ?"
    }
  },
  {
    id: 'DYS_08',
    phase: Phase.DYSLEXIA,
    subscale: 'Graphomotor',
    scale: 'yes_no',
    text: {
      en: "How often is your handwriting difficult to read?",
      fr: "À quelle fréquence votre écriture manuelle est-elle difficile à lire ?"
    }
  },
  {
    id: 'DYS_09',
    phase: Phase.DYSLEXIA,
    subscale: 'Sequencing',
    scale: 'yes_no',
    text: {
      en: "How often do you get confused if you have to speak in public?",
      fr: "À quelle fréquence vous embrouillez-vous si vous devez parler en public ?"
    }
  },
  {
    id: 'DYS_10',
    phase: Phase.DYSLEXIA,
    subscale: 'DysMemory',
    scale: 'yes_no',
    text: {
      en: "How often do you find it difficult to take messages on the telephone and pass them on correctly?",
      fr: "À quelle fréquence trouvez-vous difficile de prendre des messages et de les transmettre ?"
    }
  },
  {
    id: 'DYS_11',
    phase: Phase.DYSLEXIA,
    subscale: 'Phonological',
    scale: 'yes_no',
    text: {
      en: "When saying a long word, how often do you find it difficult to get all the sounds in the right order?",
      fr: "En prononçant un mot long, à quelle fréquence avez-vous du mal à mettre les sons dans l'ordre ?"
    }
  },
  {
    id: 'DYS_12',
    phase: Phase.DYSLEXIA,
    subscale: 'DysMemory',
    scale: 'yes_no',
    text: {
      en: "How often do you find it difficult to do sums in your head without using your fingers or paper?",
      fr: "À quelle fréquence trouvez-vous difficile de faire des calculs de tête sans aide ?"
    }
  },
  {
    id: 'DYS_13',
    phase: Phase.DYSLEXIA,
    subscale: 'DysMemory',
    scale: 'yes_no',
    text: {
      en: "When using the telephone, how often do you get the numbers mixed up when you dial?",
      fr: "Au téléphone, à quelle fréquence mélangez-vous les chiffres en composant le numéro ?"
    }
  },
  {
    id: 'DYS_14',
    phase: Phase.DYSLEXIA,
    subscale: 'Sequencing',
    scale: 'yes_no',
    text: {
      en: "How often do you find it difficult to say the months of the year forwards in a fluent manner?",
      fr: "À quelle fréquence trouvez-vous difficile de dire les mois de l'année dans l'ordre ?"
    }
  },
  {
    id: 'DYS_15',
    phase: Phase.DYSLEXIA,
    subscale: 'Sequencing',
    scale: 'yes_no',
    text: {
      en: "How often do you find it difficult to say the months of the year backwards?",
      fr: "À quelle fréquence trouvez-vous difficile de dire les mois de l'année à l'envers ?"
    }
  },
  {
    id: 'DYS_16',
    phase: Phase.DYSLEXIA,
    subscale: 'Organization',
    scale: 'yes_no',
    text: {
      en: "How often do you mix up dates and times and miss appointments?",
      fr: "À quelle fréquence confondez-vous les dates et heures, manquant ainsi des rendez-vous ?"
    }
  },
  {
    id: 'DYS_17',
    phase: Phase.DYSLEXIA,
    subscale: 'Accuracy',
    scale: 'yes_no',
    text: {
      en: "When writing cheques or filling forms, how frequently do you find yourself making mistakes?",
      fr: "En remplissant des chèques ou formulaires, à quelle fréquence faites-vous des erreurs ?"
    }
  },
  {
    id: 'DYS_18',
    phase: Phase.DYSLEXIA,
    subscale: 'VisualProc',
    scale: 'yes_no',
    text: {
      en: "How often do you find forms difficult and confusing?",
      fr: "À quelle fréquence trouvez-vous les formulaires administratifs difficiles et confus ?"
    }
  },
  {
    id: 'DYS_19',
    phase: Phase.DYSLEXIA,
    subscale: 'Visuospatial',
    scale: 'yes_no',
    text: {
      en: "How often do you mix up bus numbers like 95 and 59?",
      fr: "À quelle fréquence confondez-vous des numéros inversés (ex: 95 et 59) ?"
    }
  },
  {
    id: 'DYS_20',
    phase: Phase.DYSLEXIA,
    subscale: 'DysMemory',
    scale: 'yes_no',
    text: {
      en: "How often did you find it difficult to learn your multiplication tables at school?",
      fr: "À quelle fréquence aviez-vous du mal à apprendre vos tables de multiplication à l'école ?"
    }
  },

  // ==================================================================================
  // DYSLEXIA EXPANSION: PRO & ADMIN - Scale 0-4
  // ==================================================================================
  {
    id: 'DYS_PRO_01',
    phase: Phase.DYSLEXIA,
    subscale: 'WrittenLoad',
    scale: 'frequency_0_4',
    text: {
      en: "How often do written instructions take much longer to process than spoken explanations?",
      fr: "À quelle fréquence les instructions écrites prennent-elles beaucoup plus de temps à traiter que les explications orales ?"
    }
  },
  {
    id: 'DYS_PRO_02',
    phase: Phase.DYSLEXIA,
    subscale: 'WrittenLoad',
    scale: 'frequency_0_4',
    text: {
      en: "How often do long emails or documents feel overwhelming?",
      fr: "À quelle fréquence les longs emails ou documents vous semblent-ils écrasants ?"
    }
  },
  {
    id: 'DYS_PRO_03',
    phase: Phase.DYSLEXIA,
    subscale: 'WrittenLoad',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you reread the same text multiple times without retaining it?",
      fr: "À quelle fréquence relisez-vous le même texte plusieurs fois sans le retenir ?"
    }
  },
  {
    id: 'DYS_PRO_04',
    phase: Phase.DYSLEXIA,
    subscale: 'AdminFriction',
    scale: 'frequency_0_4',
    text: {
      en: "How often do forms or administrative documents cause stress or avoidance?",
      fr: "À quelle fréquence les formulaires ou documents administratifs provoquent-ils stress ou évitement ?"
    }
  },
  {
    id: 'DYS_PRO_05',
    phase: Phase.DYSLEXIA,
    subscale: 'AdminFriction',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you avoid tasks mainly because they involve a lot of reading or writing?",
      fr: "À quelle fréquence évitez-vous des tâches principalement car elles impliquent beaucoup de lecture ou d'écriture ?"
    }
  },
  {
    id: 'DYS_PRO_06',
    phase: Phase.DYSLEXIA,
    subscale: 'WrittenLoad',
    scale: 'frequency_0_4',
    text: {
      en: "How often do spelling or wording issues make you doubt your competence?",
      fr: "À quelle fréquence les problèmes d'orthographe ou de formulation vous font-ils douter de votre compétence ?"
    }
  },
  {
    id: 'DYS_PRO_07',
    phase: Phase.DYSLEXIA,
    subscale: 'VerbalPref',
    scale: 'frequency_0_4',
    text: {
      en: "How often do you feel more capable explaining ideas verbally than in writing?",
      fr: "À quelle fréquence vous sentez-vous plus capable d'expliquer des idées verbalement que par écrit ?"
    }
  },

  // ==================================================================================
  // MODULE IV: DYSPRAXIA (ADC CHECKLIST) - Scale 0-3
  // ==================================================================================

  // --- Section A: Childhood History ---
  {
    id: 'DCD_C01',
    phase: Phase.DYSPRAXIA,
    subscale: 'child_FineMotor',
    scale: 'frequency_0_3',
    text: {
      en: "As a child, how often did you have difficulties with self-care tasks such as tying shoelaces, fastening buttons, or zips?",
      fr: "Enfant, à quelle fréquence aviez-vous du mal à faire vos lacets, boutonner ou utiliser des fermetures éclair ?"
    }
  },
  {
    id: 'DCD_C02',
    phase: Phase.DYSPRAXIA,
    subscale: 'child_FineMotor',
    scale: 'frequency_0_3',
    text: {
      en: "As a child, how often did you have difficulty eating without getting dirty or spilling things?",
      fr: "Enfant, à quelle fréquence aviez-vous du mal à manger sans vous salir ou renverser des choses ?"
    }
  },
  {
    id: 'DCD_C03',
    phase: Phase.DYSPRAXIA,
    subscale: 'child_GrossMotor',
    scale: 'frequency_0_3',
    text: {
      en: "How much did you struggle to learn to ride a bike compared to your peers?",
      fr: "À quel point avez-vous eu plus de mal que les autres à apprendre à faire du vélo ?"
    }
  },
  {
    id: 'DCD_C04',
    phase: Phase.DYSPRAXIA,
    subscale: 'child_Main',
    scale: 'frequency_0_3',
    text: {
      en: "How often did you have difficulties playing team games (e.g., catching a ball, football)?",
      fr: "À quelle fréquence aviez-vous des difficultés dans les jeux d'équipe (attraper une balle, football) ?"
    }
  },
  {
    id: 'DCD_C05',
    phase: Phase.DYSPRAXIA,
    subscale: 'child_FineMotor',
    scale: 'frequency_0_3',
    text: {
      en: "How often was your handwriting untidy, illegible, or painful to produce?",
      fr: "À quelle fréquence votre écriture était-elle désordonnée, illisible ou douloureuse à produire ?"
    }
  },
  {
    id: 'DCD_C06',
    phase: Phase.DYSPRAXIA,
    subscale: 'child_GrossMotor',
    scale: 'frequency_0_3',
    text: {
      en: "How often were you considered clumsy, or did you bump into objects/people?",
      fr: "À quelle fréquence étiez-vous considéré(e) comme maladroit(e), ou vous cogniez-vous ?"
    }
  },
  {
    id: 'DCD_C07',
    phase: Phase.DYSPRAXIA,
    subscale: 'child_Main',
    scale: 'frequency_0_3',
    text: {
      en: "How often did you actively avoid sports or physical activities?",
      fr: "À quelle fréquence évitiez-vous activement le sport ou les activités physiques ?"
    }
  },
  {
    id: 'DCD_C08',
    phase: Phase.DYSPRAXIA,
    subscale: 'child_FineMotor',
    scale: 'frequency_0_3',
    text: {
      en: "How often did you have trouble using scissors or other tools?",
      fr: "À quelle fréquence aviez-vous du mal à utiliser des ciseaux ou d'autres outils ?"
    }
  },
  {
    id: 'DCD_C09',
    phase: Phase.DYSPRAXIA,
    subscale: 'child_Main',
    scale: 'frequency_0_3',
    text: {
      en: "How often did you take longer to learn new motor skills than others?",
      fr: "À quelle fréquence mettiez-vous plus de temps à apprendre de nouvelles habiletés motrices que les autres ?"
    }
  },
  {
    id: 'DCD_C10',
    phase: Phase.DYSPRAXIA,
    subscale: 'child_Main',
    scale: 'frequency_0_3',
    text: {
      en: "How often did you feel different from your peers due to coordination issues?",
      fr: "À quelle fréquence vous sentiez-vous différent(e) des autres à cause de problèmes de coordination ?"
    }
  },

  // --- Section B: Current Adult Functioning ---
  {
    id: 'DCD_A01',
    phase: Phase.DYSPRAXIA,
    subscale: 'adult_GrossMotor',
    scale: 'frequency_0_3',
    text: {
      en: "How often do you tend to drop objects (e.g., keys, phone, dishes)?",
      fr: "À quelle fréquence avez-vous tendance à faire tomber des objets (clés, téléphone, vaisselle) ?"
    }
  },
  {
    id: 'DCD_A02',
    phase: Phase.DYSPRAXIA,
    subscale: 'adult_GrossMotor',
    scale: 'frequency_0_3',
    text: {
      en: "How often do you bump into door frames, furniture, or other people?",
      fr: "À quelle fréquence vous cognez-vous dans les cadres de porte, les meubles ou les gens ?"
    }
  },
  {
    id: 'DCD_A03',
    phase: Phase.DYSPRAXIA,
    subscale: 'adult_Planning',
    scale: 'frequency_0_3',
    text: {
      en: "How often do you find it difficult to organize your workspace or pack a suitcase efficiently?",
      fr: "À quelle fréquence trouvez-vous difficile d'organiser votre espace de travail ou de faire une valise efficacement ?"
    }
  },
  {
    id: 'DCD_A04',
    phase: Phase.DYSPRAXIA,
    subscale: 'adult_Planning',
    scale: 'frequency_0_3',
    text: {
      en: "How often do you avoid driving, or find parking and judging distances difficult?",
      fr: "À quelle fréquence évitez-vous de conduire, ou trouvez-vous difficile de vous garer et de juger les distances ?"
    }
  },
  {
    id: 'DCD_A05',
    phase: Phase.DYSPRAXIA,
    subscale: 'adult_FineMotor',
    scale: 'frequency_0_3',
    text: {
      en: "How often is your handwriting difficult to read or painful to produce for long periods?",
      fr: "À quelle fréquence votre écriture est-elle difficile à lire ou douloureuse sur de longues périodes ?"
    }
  },
  {
    id: 'DCD_A06',
    phase: Phase.DYSPRAXIA,
    subscale: 'adult_FineMotor',
    scale: 'frequency_0_3',
    text: {
      en: "How often do you find tasks requiring precision (e.g., shaving, makeup, DIY) difficult?",
      fr: "À quelle fréquence trouvez-vous les tâches de précision (rasage, maquillage, bricolage) difficiles ?"
    }
  },
  {
    id: 'DCD_A07',
    phase: Phase.DYSPRAXIA,
    subscale: 'adult_FineMotor',
    scale: 'frequency_0_3',
    text: {
      en: "How often do you spill drinks or food when eating?",
      fr: "À quelle fréquence renversez-vous des boissons ou de la nourriture en mangeant ?"
    }
  },
  {
    id: 'DCD_A08',
    phase: Phase.DYSPRAXIA,
    subscale: 'adult_GrossMotor',
    scale: 'frequency_0_3',
    text: {
      en: "How often do you feel you lack energy or fatigue easily due to the effort of physical tasks?",
      fr: "À quelle fréquence ressentez-vous un manque d'énergie ou une fatigue rapide due à l'effort physique ?"
    }
  },
  {
    id: 'DCD_A09',
    phase: Phase.DYSPRAXIA,
    subscale: 'adult_Planning',
    scale: 'frequency_0_3',
    text: {
      en: "How often do you have trouble planning the sequence of steps needed to complete a practical task?",
      fr: "À quelle fréquence avez-vous du mal à planifier les étapes pour une tâche pratique (ex: cuisiner) ?"
    }
  },
  {
    id: 'DCD_A10',
    phase: Phase.DYSPRAXIA,
    subscale: 'adult_Planning',
    scale: 'frequency_0_3',
    text: {
      en: "How often do you choose hobbies or jobs that require little physical coordination?",
      fr: "À quelle fréquence choisissez-vous des loisirs ou emplois demandant peu de coordination physique ?"
    }
  },
  // --- DCD Additional ---
  {
    id: 'DCD_COG_01',
    phase: Phase.DYSPRAXIA,
    subscale: 'ExecutionGap',
    scale: 'frequency_0_3',
    text: {
      en: "How often do tasks feel clear in your head but fall apart when you try to execute them physically?",
      fr: "À quelle fréquence les tâches semblent-elles claires dans votre tête mais s'effondrent quand vous essayez de les exécuter physiquement ?"
    }
  },
  {
    id: 'DCD_COG_02',
    phase: Phase.DYSPRAXIA,
    subscale: 'PhysicalFatigue',
    scale: 'frequency_0_3',
    text: {
      en: "How often does physical effort drain your mental energy faster than expected?",
      fr: "À quelle fréquence l'effort physique draine-t-il votre énergie mentale plus vite que prévu ?"
    }
  },

  // ==================================================================================
  // MODULE V: DYSCALCULIA (STEVE CHINN CHECKLIST) - Scale 1-5
  // ==================================================================================

  // --- Domain A: Core Number Sense ---
  {
    id: 'NUM_01',
    phase: Phase.DYSCALCULIA,
    subscale: 'NumberSense',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you have difficulty counting objects accurately (e.g., losing track)?",
      fr: "À quelle fréquence avez-vous du mal à compter des objets avec précision (perdre le fil) ?"
    }
  },
  {
    id: 'NUM_02',
    phase: Phase.DYSCALCULIA,
    subscale: 'Subitizing',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you have to count items one-by-one rather than just 'seeing' how many there are?",
      fr: "À quelle fréquence devez-vous compter les objets un par un plutôt que de voir instantanément le nombre ?"
    }
  },
  {
    id: 'NUM_03',
    phase: Phase.DYSCALCULIA,
    subscale: 'WorkingMemory',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you find it much harder to count backwards than forwards?",
      fr: "À quelle fréquence trouvez-vous beaucoup plus dur de compter à rebours qu'à l'endroit ?"
    }
  },
  {
    id: 'NUM_04',
    phase: Phase.DYSCALCULIA,
    subscale: 'Estimation',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you find it difficult to estimate costs (e.g., shopping total)?",
      fr: "À quelle fréquence trouvez-vous difficile d'estimer des coûts (ex: paner de courses) ?"
    }
  },

  // --- Domain B: Arithmetic & Operations ---
  {
    id: 'NUM_05',
    phase: Phase.DYSCALCULIA,
    subscale: 'Retrieval',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you have difficulty remembering basic math facts (e.g., tables)?",
      fr: "À quelle fréquence avez-vous du mal à retenir les faits mathématiques de base ?"
    }
  },
  {
    id: 'NUM_06',
    phase: Phase.DYSCALCULIA,
    subscale: 'Arithmetic',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you rely on your fingers to do simple calculations?",
      fr: "À quelle fréquence comptez-vous sur vos doigts pour faire des calculs simples ?"
    }
  },
  {
    id: 'NUM_07',
    phase: Phase.DYSCALCULIA,
    subscale: 'Symbols',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you confuse mathematical symbols (e.g., + and x)?",
      fr: "À quelle fréquence confondez-vous les symboles mathématiques (ex: + et x) ?"
    }
  },
  {
    id: 'NUM_08',
    phase: Phase.DYSCALCULIA,
    subscale: 'Arithmetic',
    scale: 'frequency_1_5',
    text: {
      en: "When adding, how often do you count 1, 2, 3... rather than counting on from the larger number?",
      fr: "Pour additionner, à quelle fréquence comptez-vous unité par unité au lieu de partir du grand nombre ?"
    }
  },

  // --- Domain C: Functional Numeracy & Anxiety ---
  {
    id: 'NUM_09',
    phase: Phase.DYSCALCULIA,
    subscale: 'Functional',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you struggle to tell the time on an analog clock?",
      fr: "À quelle fréquence avez-vous du mal à lire l'heure sur une horloge analogique ?"
    }
  },
  {
    id: 'NUM_10',
    phase: Phase.DYSCALCULIA,
    subscale: 'Anxiety',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you get anxiety immediately when asked to do a math problem?",
      fr: "À quelle fréquence ressentez-vous de l'anxiété immédiate face à un problème de maths ?"
    }
  },
  {
    id: 'NUM_11',
    phase: Phase.DYSCALCULIA,
    subscale: 'Functional',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you misread numbers (e.g., reading 51 as 15)?",
      fr: "À quelle fréquence lisez-vous les nombres de travers (ex: 51 lu 15) ?"
    }
  },
  {
    id: 'NUM_12',
    phase: Phase.DYSCALCULIA,
    subscale: 'MentalMath',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you find mental math (e.g., calculating change) difficult or impossible?",
      fr: "À quelle fréquence trouvez-vous le calcul mental (ex: rendre la monnaie) difficile ?"
    }
  },
  {
    id: 'NUM_13',
    phase: Phase.DYSCALCULIA,
    subscale: 'MathMemory',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you forget PIN numbers or phone numbers?",
      fr: "À quelle fréquence oubliez-vous vos codes PIN ou numéros de téléphone ?"
    }
  },
  {
    id: 'NUM_14',
    phase: Phase.DYSCALCULIA,
    subscale: 'Estimation',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you drive too fast or slow because you misjudge speed/distance?",
      fr: "À quelle fréquence conduisez-vous mal (vitesse) car vous jugez mal la distance ?"
    }
  },
  {
    id: 'NUM_15',
    phase: Phase.DYSCALCULIA,
    subscale: 'Functional',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you find financial planning or budgeting impossible to understand?",
      fr: "À quelle fréquence trouvez-vous la planification financière impossible à comprendre ?"
    }
  },

  // ==================================================================================
  // DYSCALCULIA EXPANSION: TIME & MONEY - Scale 1-5
  // ==================================================================================
  {
    id: 'NUM_TM_01',
    phase: Phase.DYSCALCULIA,
    subscale: 'TimeMoney',
    scale: 'frequency_1_5',
    text: {
      en: "How often do deadlines or time estimates feel abstract or confusing?",
      fr: "À quelle fréquence les délais ou estimations de temps vous semblent-ils abstraits ou confus ?"
    }
  },
  {
    id: 'NUM_TM_02',
    phase: Phase.DYSCALCULIA,
    subscale: 'TimeMoney',
    scale: 'frequency_1_5',
    text: {
      en: "How often do schedules or timelines fail to make intuitive sense to you?",
      fr: "À quelle fréquence les plannings ou chronologies manquent-ils de sens intuitif pour vous ?"
    }
  },
  {
    id: 'NUM_TM_03',
    phase: Phase.DYSCALCULIA,
    subscale: 'TimeMoney',
    scale: 'frequency_1_5',
    text: {
      en: "How often do numbers lose meaning unless they are visualized?",
      fr: "À quelle fréquence les chiffres perdent-ils leur sens à moins d'être visualisés ?"
    }
  },
  {
    id: 'NUM_TM_04',
    phase: Phase.DYSCALCULIA,
    subscale: 'Financial',
    scale: 'frequency_1_5',
    text: {
      en: "How often does budgeting or financial planning feel impossible to grasp?",
      fr: "À quelle fréquence la budgétisation ou la planification financière vous semblent-elles impossibles à saisir ?"
    }
  },
  {
    id: 'NUM_TM_05',
    phase: Phase.DYSCALCULIA,
    subscale: 'TimeMoney',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you avoid tasks involving numbers, even simple ones?",
      fr: "À quelle fréquence évitez-vous les tâches impliquant des chiffres, même simples ?"
    }
  },
  {
    id: 'NUM_TM_06',
    phase: Phase.DYSCALCULIA,
    subscale: 'Financial',
    scale: 'frequency_1_5',
    text: {
      en: "How often do you feel anxious when dealing with quantities, prices, or time pressure?",
      fr: "À quelle fréquence vous sentez-vous anxieux(se) face à des quantités, prix ou pression temporelle ?"
    }
  }
];
