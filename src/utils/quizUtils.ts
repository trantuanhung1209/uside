import type { QuizOption } from '../data/quizQuestions';

/**
 * Fisher-Yates shuffle algorithm to randomize array order
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Shuffle quiz options while preserving their original IDs
 * This ensures we can still track the correct answer and user selections
 */
export const shuffleQuizOptions = (options: QuizOption[]): QuizOption[] => {
  return shuffleArray(options);
};

/**
 * Generate a stable seed for shuffling based on question content
 * This ensures the same shuffle order for the same question during a session
 */
export const generateQuestionSeed = (questionId: number, questionText: string): number => {
  let hash = 0;
  const str = `${questionId}-${questionText}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

/**
 * Seeded random number generator for consistent shuffling
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

/**
 * Shuffle array with a seed for consistent results
 */
export const shuffleArrayWithSeed = <T>(array: T[], seed: number): T[] => {
  const shuffled = [...array];
  const rng = new SeededRandom(seed);
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Shuffle quiz options with a consistent seed per question
 * This ensures options stay in the same order during a quiz session
 * but are randomized between different quiz attempts
 */
export const shuffleQuizOptionsWithSeed = (
  options: QuizOption[], 
  questionId: number, 
  questionText: string,
  quizStartTime?: number
): QuizOption[] => {
  // Use quiz start time to ensure different shuffle each time quiz is restarted
  const baseSeed = generateQuestionSeed(questionId, questionText);
  const finalSeed = quizStartTime ? baseSeed + quizStartTime : baseSeed;
  
  return shuffleArrayWithSeed(options, finalSeed);
};
