import { UserAnswer } from '../types';
import { QUESTIONS } from '../questions';

// Simple hash function to verify question set integrity
// We only hash the IDs to ensure the order and set matches
const getQuestionHash = (): string => {
  const ids = QUESTIONS.map(q => q.id).join('|');
  let hash = 0;
  for (let i = 0; i < ids.length; i++) {
    const char = ids.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

const CURRENT_HASH = getQuestionHash();

interface SharedData {
  v: number; // Version of the encoding schema
  h: string; // Hash of the question set
  d: number[]; // Array of scores
}

/**
 * Encodes user answers into a minimal JSON string for QR codes.
 * Relies on the static order of QUESTIONS array.
 */
export const encodeAnswers = (answers: UserAnswer[]): string => {
  // Create a map for fast lookup
  const answerMap = new Map(answers.map(a => [a.questionId, a.score]));

  // Map scores in the exact order of QUESTIONS
  // Use -1 for missing answers (though fully completed reports shouldn't have any)
  const scores = QUESTIONS.map(q => answerMap.get(q.id) ?? -1);

  const data: SharedData = {
    v: 1,
    h: CURRENT_HASH,
    d: scores
  };

  return JSON.stringify(data);
};

/**
 * Decodes the shared string back into UserAnswer[].
 * Throws an error if the question set hash does not match.
 */
export const decodeAnswers = (jsonString: string): UserAnswer[] => {
  try {
    const data: SharedData = JSON.parse(jsonString);

    if (data.v !== 1) {
      throw new Error("Unsupported data version");
    }

    if (data.h !== CURRENT_HASH) {
      throw new Error("Data was generated with a different version of the assessment (Question set mismatch).");
    }

    if (!Array.isArray(data.d) || data.d.length !== QUESTIONS.length) {
      throw new Error("Data length mismatch.");
    }

    const reconstructedAnswers: UserAnswer[] = [];

    data.d.forEach((score, index) => {
      if (score !== -1) {
        reconstructedAnswers.push({
          questionId: QUESTIONS[index].id,
          score: score
        });
      }
    });

    return reconstructedAnswers;
  } catch (err) {
    console.error("Failed to decode answers:", err);
    throw err;
  }
};
