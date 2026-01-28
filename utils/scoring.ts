
import { Phase, UserAnswer, ScreeningReport, DomainScore } from '../types';
import { QUESTIONS } from '../questions';

export function calculateReport(answers: UserAnswer[]): ScreeningReport {
  const answerMap = new Map(answers.map(a => [a.questionId, a.score]));
  
  const domainsToScore = [
    Phase.AUTISM, Phase.ADHD, Phase.DYSLEXIA, 
    Phase.DYSCALCULIA, Phase.DYSPRAXIA, Phase.LANGUAGE
  ];

  const domainScores: DomainScore[] = domainsToScore.map(phase => {
    const qSet = QUESTIONS.filter(q => q.phase === phase);
    let total = 0;
    let childhoodSum = 0;
    let childhoodCount = 0;
    const subscaleData: Record<string, { sum: number, count: number }> = {};

    qSet.forEach(q => {
      const raw = answerMap.get(q.id) || 3;
      const actual = q.isReverse ? (6 - raw) : raw;
      
      total += actual;
      if (q.subscale === 'Childhood' || q.subscale === 'History') {
        childhoodSum += actual;
        childhoodCount++;
      }

      if (!subscaleData[q.subscale]) subscaleData[q.subscale] = { sum: 0, count: 0 };
      subscaleData[q.subscale].sum += actual;
      subscaleData[q.subscale].count++;
    });

    const normalized = qSet.length > 0 
      ? Math.round(((total - qSet.length) / (qSet.length * 4)) * 100)
      : 0;

    const childhoodAvg = childhoodCount > 0 ? (childhoodSum / childhoodCount) : 5;
    const childhoodFlag = childhoodAvg < 2.5; // Source recommendation

    let interpretation: DomainScore['interpretation'] = 'low';
    if (normalized > 60) interpretation = 'high';
    else if (normalized > 40) interpretation = 'moderate';
    else if (normalized > 20) interpretation = 'possible';

    const subscaleScores: Record<string, number> = {};
    Object.entries(subscaleData).forEach(([name, data]) => {
      subscaleScores[name] = Math.round(((data.sum - data.count) / (data.count * 4)) * 100);
    });

    return {
      name: phase,
      score: normalized,
      interpretation,
      subscales: subscaleScores,
      childhoodFlag
    };
  });

  const functionalImpact: Record<string, number> = {};
  const mentalHealthMarkers: Record<string, number> = {};
  QUESTIONS.filter(q => q.phase === Phase.IMPACT).forEach(q => {
    const score = answerMap.get(q.id) || 1;
    if (q.subscale === 'MentalHealth') mentalHealthMarkers[q.id] = score;
    else functionalImpact[q.id] = score;
  });

  const flags: string[] = [];
  if (answerMap.get('7.10') && (answerMap.get('7.10') || 0) >= 3) flags.push('urgentFlag');
  if (normalized(Phase.AUTISM) > 50 && normalized(Phase.ADHD) > 50) flags.push('coOccurrence');
  if ((answerMap.get('7.14') || 1) >= 4) flags.push('maskingFlag');

  function normalized(p: Phase) {
    return domainScores.find(d => d.name === p)?.score || 0;
  }

  return {
    domainScores,
    flags,
    functionalImpact,
    mentalHealthMarkers,
    isClinicalUrgent: flags.includes('urgentFlag')
  };
}
