import { Phase, UserAnswer, ScreeningReport, DomainScore } from '../types';
import { QUESTIONS } from '../questions';

export function calculateReport(answers: UserAnswer[]): ScreeningReport {
  const answerMap = new Map(answers.map(a => [a.questionId, a.score]));

  const domainsToScore = [
    Phase.ADHD,
    Phase.AUTISM,
    Phase.DYSLEXIA,
    Phase.DYSPRAXIA,
    Phase.DYSCALCULIA
  ];

  const domainScores: DomainScore[] = domainsToScore.map(phase => {
    const qSet = QUESTIONS.filter(q => q.phase === phase);
    let totalPoints = 0;
    let maxPossiblePoints = 0;
    const subscaleData: Record<string, { sum: number, count: number }> = {};

    // Specific Module Logic Variables
    let adhdPartAHits = 0;
    let dyslexiaHits = 0;
    let dyslexiaBest12Hits = 0;
    let dyspraxiaChildSum = 0;
    let dyspraxiaChildCount = 0;

    const dyslexiaBest12Ids = ['DYS_01', 'DYS_04', 'DYS_07', 'DYS_10', 'DYS_11', 'DYS_13', 'DYS_14', 'DYS_16', 'DYS_17', 'DYS_18', 'DYS_19', 'DYS_20'];

    qSet.forEach(q => {
      let raw = answerMap.get(q.id);
      if (raw === undefined) raw = 1; // Default to 1 (lowest) if unanswered

      const actual = q.isReverse ? (6 - raw) : raw;

      // -- Normalized Score Calculation (0-100 base) --
      // Map 1-5 to 0-4 for weight accumulation
      const weight = actual - 1;
      totalPoints += weight;
      maxPossiblePoints += 4; // Max weight (5-1)

      // -- Subscale Accumulation --
      if (!subscaleData[q.subscale]) subscaleData[q.subscale] = { sum: 0, count: 0 };
      subscaleData[q.subscale].sum += weight;
      subscaleData[q.subscale].count += 4; // Max possible per item

      // -- Specific Logic --

      // ADHD Part A (First 6 items)
      if (phase === Phase.ADHD) {
        // Items 1-3: Threshold >= 2 (Sometimes/Often/Very Often? No, Sometimes=2 in 0-4? Wait.)
        // Likert 1-5: 1=Never, 2=Rarely, 3=Sometimes, 4=Often, 5=Very Often.
        // MethodeII: "Sometimes (2)" -> This matches Likert 3.
        // Items 1-3: Threshold "Sometimes +" -> Likert >= 3.
        // Items 4-6: Threshold "Often +" -> Likert >= 4.

        if (['ADHD_01', 'ADHD_02', 'ADHD_03'].includes(q.id)) {
          if (actual >= 3) adhdPartAHits++;
        } else if (['ADHD_04', 'ADHD_05', 'ADHD_06'].includes(q.id)) {
          if (actual >= 4) adhdPartAHits++;
        }
      }

      // Dyslexia (Hits logic)
      if (phase === Phase.DYSLEXIA) {
        // "Yes" equivalent -> Likert >= 4 (Agree/Strongly Agree)
        if (actual >= 4) {
          dyslexiaHits++;
          if (dyslexiaBest12Ids.includes(q.id)) dyslexiaBest12Hits++;
        }
      }

      // Dyspraxia (Childhood items)
      if (phase === Phase.DYSPRAXIA && q.subscale.startsWith('child_')) {
        dyspraxiaChildSum += weight;
        dyspraxiaChildCount += 4;
      }

    });

    let normalized = maxPossiblePoints > 0
      ? Math.round((totalPoints / maxPossiblePoints) * 100)
      : 0;

    let interpretation: DomainScore['interpretation'] = 'low';

    // -- Interpretation Logic --

    if (phase === Phase.ADHD) {
      // "Part A Score >= 4 indicates clinical probability"
      if (adhdPartAHits >= 4) interpretation = 'high';
      else if (normalized > 50) interpretation = 'moderate'; // Fallback to density
      else if (normalized > 30) interpretation = 'possible';
      else interpretation = 'low';
    }
    else if (phase === Phase.AUTISM) {
      // CAT-Q (range 25-175). My normalized is %.
      // Normalized: 100% = 175 pts.
      // Threshold > 100 pts. 100/175 = 57%.
      if (normalized > 57) interpretation = 'high';
      else if (normalized > 45) interpretation = 'moderate';
      else if (normalized > 30) interpretation = 'possible';
    }
    else if (phase === Phase.DYSLEXIA) {
      // 0-4 Low, 5-8 Moderate, 9+ High.
      // 20 items.
      if (dyslexiaHits >= 9) interpretation = 'high';
      else if (dyslexiaHits >= 5) {
        interpretation = 'moderate';
        // "Best 12" Rule: If Moderate (5-8) AND Best12 >= 6 -> High
        if (dyslexiaBest12Hits >= 6) interpretation = 'high';
      }
      else interpretation = 'low'; // < 5
    }
    else if (phase === Phase.DYSPRAXIA) {
      // 75% threshold approximation
      if (normalized > 75) interpretation = 'high';
      else if (normalized > 60) interpretation = 'moderate';
      else if (normalized > 30) interpretation = 'possible';
    }
    else if (phase === Phase.DYSCALCULIA) {
      if (normalized > 60) interpretation = 'high';
      else if (normalized > 40) interpretation = 'moderate';
      else if (normalized > 20) interpretation = 'possible';
    }

    // Subscale Scores Calculation
    const subscaleScores: Record<string, number> = {};
    Object.entries(subscaleData).forEach(([name, data]) => {
      subscaleScores[name] = data.count > 0 ? Math.round((data.sum / data.count) * 100) : 0;
    });

    // Childhood Flag (Dyspraxia)
    let childhoodFlag = false;
    if (phase === Phase.DYSPRAXIA && dyspraxiaChildCount > 0) {
      const childNorm = (dyspraxiaChildSum / dyspraxiaChildCount) * 100;
      // Threshold 17/30 approx 56%
      if (childNorm < 56) childhoodFlag = true; // Low childhood history despite potentially high adult score
    }

    return {
      name: phase,
      score: normalized,
      interpretation,
      subscales: subscaleScores,
      childhoodFlag
    };
  });

  const flags: string[] = [];
  const answerKeys = Array.from(answerMap.keys());

  // -- Flags --

  // 1. AuDHD (Autism + ADHD)
  // Logic: ADHD Part A >= 4 (High) AND CAT-Q > 100 (High i.e. > 57%)
  const adhdScore = domainScores.find(d => d.name === Phase.ADHD);
  const autismScore = domainScores.find(d => d.name === Phase.AUTISM);

  if (adhdScore?.interpretation === 'high' && (autismScore?.score || 0) > 57) {
    flags.push('coOccurrence');
  }

  // 2. High Masking (CAT-Q > 120 -> > 68%)
  if ((autismScore?.score || 0) > 68) {
    flags.push('maskingFlag');
  }

  // 3. Math Anxiety Distinction
  // Logic: Low Dyscalculia Score (<40%) BUT High Anxiety (NUM_10 >= 4)
  const mathScore = domainScores.find(d => d.name === Phase.DYSCALCULIA);
  const anxietyItem = answerMap.get('NUM_10') || 0;
  if ((mathScore?.score || 0) < 40 && anxietyItem >= 4) {
    // We don't have a specific flag key for this in i18n yet, maybe reuse masking or nothing?
    // Leaving out for now or pushing a custom string if i18n allows.
  }

  // 4. Urgent Mental Health (This was 7.10, removed in MethodeII? 
  // MethodeII doesn't explicitely list 7.10 "Self harm" in the questions list.
  // It mentions "Phase 0: Intake" and "Phase 7 impact" in the text description but the list doesn't detail them.
  // I updated questions.ts with Modules 1-5 only.
  // So I'll remove the urgent flag logic based on 7.10.

  const functionalImpact: Record<string, number> = {};
  const mentalHealthMarkers: Record<string, number> = {};

  return {
    domainScores,
    flags,
    functionalImpact, // Populated empty as explicit Phase 7 questions are gone?
    mentalHealthMarkers,
    isClinicalUrgent: false
  };
}
