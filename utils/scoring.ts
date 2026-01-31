import { Phase, UserAnswer, ScreeningReport, DomainScore, Question } from '../types';
import { QUESTIONS } from '../questions';

// Helper to get scale limits
function getScaleMinMax(scale: string = 'likert_5'): { min: number, max: number } {
  switch (scale) {
    case 'likert_7': return { min: 1, max: 7 };
    case 'yes_no': return { min: 0, max: 1 };
    case 'frequency_0_4': return { min: 0, max: 4 };
    case 'frequency_0_3': return { min: 0, max: 3 };
    case 'frequency_1_5': return { min: 1, max: 5 };
    case 'likert_5':
    default: return { min: 1, max: 5 };
  }
}

function getNormalizedItemScore(q: Question, rawAnswer: number): { score: number, max: number } {
  const { min, max } = getScaleMinMax(q.scale);
  // Handle missing answer (default to min)
  const val = rawAnswer !== undefined ? rawAnswer : min;

  // Reverse logic
  const actual = q.isReverse ? (max + min - val) : val;

  // Normalize to 0-based relative value
  // e.g. 1-7 (val 4) -> (4-1)=3. Max (7-1)=6.
  return {
    score: actual - min,
    max: max - min
  };
}

// Helper to calculate percentage of a set of items
function calculateSectionScore(items: Question[], answerMap: Map<string, number>): number {
  let totalScore = 0;
  let totalMax = 0;

  items.forEach(q => {
    const raw = answerMap.get(q.id);
    // If undefined, treat as min (0 contribution to normalized score numerator)
    const { score, max } = getNormalizedItemScore(q, raw !== undefined ? raw : getScaleMinMax(q.scale).min);
    totalScore += score;
    totalMax += max;
  });

  return totalMax > 0 ? (totalScore / totalMax) * 100 : 0;
}

export function calculateReport(answers: UserAnswer[]): ScreeningReport {
  const answerMap = new Map(answers.map(a => [a.questionId, a.score]));
  const flags: string[] = [];

  const domainsToScore = [
    Phase.ADHD,
    Phase.AUTISM,
    Phase.DYSLEXIA,
    Phase.DYSPRAXIA,
    Phase.DYSCALCULIA
  ];

  const domainScores: DomainScore[] = domainsToScore.map(phase => {
    const phaseQuestions = QUESTIONS.filter(q => q.phase === phase);

    // -- Subscale Calculation --
    const subscaleMap: Record<string, { sum: number, max: number }> = {};

    phaseQuestions.forEach(q => {
      const raw = answerMap.get(q.id);
      const { score, max } = getNormalizedItemScore(q, raw !== undefined ? raw : getScaleMinMax(q.scale).min);

      if (!subscaleMap[q.subscale]) subscaleMap[q.subscale] = { sum: 0, max: 0 };
      subscaleMap[q.subscale].sum += score;
      subscaleMap[q.subscale].max += max;
    });

    const subscales: Record<string, number> = {};
    Object.entries(subscaleMap).forEach(([key, val]) => {
      subscales[key] = val.max > 0 ? Math.round((val.sum / val.max) * 100) : 0;
    });

    // -- Domain Specific Scoring Logic --
    let finalScore = 0;
    let interpretation: DomainScore['interpretation'] = 'low';
    let childhoodFlag = false;

    if (phase === Phase.ADHD) {
      // ASRS Logic
      let partAHits = 0;
      const partAIds = ['ADHD_01', 'ADHD_02', 'ADHD_03', 'ADHD_04', 'ADHD_05', 'ADHD_06'];

      partAIds.forEach((id, idx) => {
        const val = answerMap.get(id) || 0;
        if (idx < 3) { // 0, 1, 2
          if (val >= 2) partAHits++;
        } else { // 3, 4, 5
          if (val >= 3) partAHits++;
        }
      });

      finalScore = calculateSectionScore(phaseQuestions, answerMap);

      if (partAHits >= 4) interpretation = 'high';
      else if (finalScore > 50) interpretation = 'moderate';
      else if (finalScore > 30) interpretation = 'possible';
    }

    else if (phase === Phase.AUTISM) {
      // Weighted Formula: 60% CAT-Q + 15% Sensory + 15% Predict + 10% Energy
      const catQuestions = phaseQuestions.filter(q => ['Compensation', 'Masking', 'Assimilation'].includes(q.subscale));
      const sensoryQuestions = phaseQuestions.filter(q => q.subscale === 'Sensory');
      const predictQuestions = phaseQuestions.filter(q => q.subscale === 'Predictability');
      const energyQuestions = phaseQuestions.filter(q => q.subscale === 'Energy');

      const catScore = calculateSectionScore(catQuestions, answerMap);
      const sensoryScore = calculateSectionScore(sensoryQuestions, answerMap);
      const predictScore = calculateSectionScore(predictQuestions, answerMap);
      const energyScore = calculateSectionScore(energyQuestions, answerMap);

      finalScore = Math.round(
        (0.60 * catScore) +
        (0.15 * sensoryScore) +
        (0.15 * predictScore) +
        (0.10 * energyScore)
      );

      if (finalScore > 57) interpretation = 'high';
      else if (finalScore > 45) interpretation = 'moderate';
      else if (finalScore > 30) interpretation = 'possible';

      // Masking Flag (CAT-Q Raw > 120 approx > 68%)
      if (catScore > 68) flags.push('maskingFlag');
    }

    else if (phase === Phase.DYSLEXIA) {
      const vinegradQuestions = phaseQuestions.filter(q => !q.id.startsWith('DYS_PRO'));
      const proQuestions = phaseQuestions.filter(q => q.id.startsWith('DYS_PRO'));

      const vinegradScore = calculateSectionScore(vinegradQuestions, answerMap);
      const proScore = calculateSectionScore(proQuestions, answerMap);

      finalScore = Math.round((0.70 * vinegradScore) + (0.30 * proScore));

      // Vinegrad Interpretation Logic (Count Yes)
      let vineHits = 0;
      const best12Ids = ['DYS_01', 'DYS_04', 'DYS_07', 'DYS_10', 'DYS_11', 'DYS_13', 'DYS_14', 'DYS_16', 'DYS_17', 'DYS_18', 'DYS_19', 'DYS_20'];
      let best12Hits = 0;

      vinegradQuestions.forEach(q => {
        const val = answerMap.get(q.id) || 0;
        if (val === 1) { // Yes
          vineHits++;
          if (best12Ids.includes(q.id)) best12Hits++;
        }
      });

      if (vineHits >= 9) interpretation = 'high';
      else if (vineHits >= 5) {
        interpretation = 'moderate';
        if (best12Hits >= 6) interpretation = 'high';
      }
    }

    else if (phase === Phase.DYSPRAXIA) {
      finalScore = calculateSectionScore(phaseQuestions, answerMap);

      if (finalScore > 75) interpretation = 'high';
      else if (finalScore > 60) interpretation = 'moderate';
      else if (finalScore > 30) interpretation = 'possible';

      // Childhood Flag (Low childhood score despite high adult?)
      const childQuestions = phaseQuestions.filter(q => q.subscale.startsWith('child_'));
      const childScore = calculateSectionScore(childQuestions, answerMap);
      // Threshold 17/30 approx 56%
      if (childQuestions.length > 0 && childScore < 56) childhoodFlag = true;
    }

    else if (phase === Phase.DYSCALCULIA) {
      const chinnQuestions = phaseQuestions.filter(q => !q.id.startsWith('NUM_TM'));
      const tmQuestions = phaseQuestions.filter(q => q.id.startsWith('NUM_TM'));

      const chinnScore = calculateSectionScore(chinnQuestions, answerMap);
      const tmScore = calculateSectionScore(tmQuestions, answerMap);

      finalScore = Math.round((0.75 * chinnScore) + (0.25 * tmScore));

      if (finalScore > 60) interpretation = 'high';
      else if (finalScore > 40) interpretation = 'moderate';
      else if (finalScore > 20) interpretation = 'possible';
    }

    return {
      name: phase,
      score: Math.round(finalScore),
      interpretation,
      subscales,
      childhoodFlag
    };
  });

  // -- Cross-Module Flags --

  const adhd = domainScores.find(d => d.name === Phase.ADHD);
  const autism = domainScores.find(d => d.name === Phase.AUTISM);
  const dyscalculia = domainScores.find(d => d.name === Phase.DYSCALCULIA);

  // Re-calculate ADHD Part A Hits for cross-checking
  let adhdPartAHits = 0;
  const partAIds = ['ADHD_01', 'ADHD_02', 'ADHD_03', 'ADHD_04', 'ADHD_05', 'ADHD_06'];
  partAIds.forEach((id, idx) => {
    const val = answerMap.get(id) || 0;
    if (idx < 3) { if (val >= 2) adhdPartAHits++; }
    else { if (val >= 3) adhdPartAHits++; }
  });

  // Re-calculate CAT-Q Score (approx from subscales)
  // Comp(9), Mask(8), Assim(8). Total 25.
  const compScore = autism?.subscales['Compensation'] || 0;
  const maskScore = autism?.subscales['Masking'] || 0;
  const assimScore = autism?.subscales['Assimilation'] || 0;
  const catScoreApprox = (compScore * 9 + maskScore * 8 + assimScore * 8) / 25;

  // 1. AuDHD
  if (adhd?.interpretation === 'high' && autism?.interpretation === 'high') {
    flags.push('coOccurrence');
  }

  // 2. Sensory Overload
  // AUT_SENSORY >= 70 OR ADHD_AuditoryProc >= 70
  const sensoryScore = autism?.subscales['Sensory'] || 0;
  const auditoryScore = adhd?.subscales['AuditoryProc'] || 0;
  if (sensoryScore >= 70 || auditoryScore >= 70) {
    flags.push('SensoryOverload');
  }

  // 3. Anxiety Masking
  // CAT-Q > 120 (approx 68%) AND ADHD Part A == 3
  if (catScoreApprox > 68 && adhdPartAHits === 3) {
    flags.push('AnxietyMasking');
  }

  // 4. Math Anxiety
  // Dyscalculia Score < 40 AND NUM_10 >= 4 (Anxiety)
  // Note: frequency_1_5 (1-5). 4=Often.
  if ((dyscalculia?.score || 0) < 40 && (answerMap.get('NUM_10') || 0) >= 4) {
    flags.push('MathAnxiety');
  }

  // Intake Flags
  if ((answerMap.get('INT_01') || 0) >= 3) flags.push('depressionFlag');
  if ((answerMap.get('INT_02') || 0) === 1) flags.push('headInjuryFlag');
  if ((answerMap.get('INT_03') || 0) === 1) flags.push('specialistFlag');

  const isClinicalUrgent = (answerMap.get('INT_04') || 0) >= 3;

  return {
    domainScores,
    flags: Array.from(new Set(flags)),
    functionalImpact: {},
    mentalHealthMarkers: {},
    isClinicalUrgent
  };
}
