// Export career paths data
export { careerPaths, type CareerPath } from './careerPaths';

// Export quiz questions data
export { quizQuestionsByCareer, type Question, type QuizOption } from './quizQuestions';

// Export news data
export { newsData, type NewsItem } from './newsData';

// Import for utility functions
import { careerPaths } from './careerPaths';
import { quizQuestionsByCareer } from './quizQuestions';
import type { Question } from './quizQuestions';

// Utility functions to work with the data
export const getCareerById = (id: string) => {
  return careerPaths.find((career) => career.id === id);
};

export const getQuizQuestionsByCareerData = (careerId: string) => {
  return quizQuestionsByCareer[careerId] || [];
};

export const getAllCareerIds = () => {
  return careerPaths.map((career) => career.id);
};

export const getTotalQuestionsCount = () => {
  return Object.values(quizQuestionsByCareer).reduce(
    (total, questions: Question[]) => total + questions.length, 
    0
  );
};
