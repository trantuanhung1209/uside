import { careerPaths, quizQuestionsByCareer } from '../data';
import type { CareerPath, Question } from '../data';

/**
 * Career Service - handles all career-related data operations
 * This service layer abstracts data access and can be easily modified 
 * to work with a database or API in the future
 */
export class CareerService {
  /**
   * Get all available career paths
   */
  static async getAllCareers(): Promise<CareerPath[]> {
    // TODO: Replace with database call
    // return await db.careers.findAll();
    return Promise.resolve(careerPaths);
  }

  /**
   * Get a specific career by ID
   */
  static async getCareerById(id: string): Promise<CareerPath | null> {
    // TODO: Replace with database call
    // return await db.careers.findById(id);
    const career = careerPaths.find(career => career.id === id);
    return Promise.resolve(career || null);
  }

  /**
   * Get quiz questions for a specific career
   */
  static async getQuizQuestionsByCareer(careerId: string): Promise<Question[]> {
    // TODO: Replace with database call
    // return await db.quizQuestions.findByCareer(careerId);
    const questions = quizQuestionsByCareer[careerId] || [];
    return Promise.resolve(questions);
  }

  /**
   * Get all career IDs
   */
  static async getAllCareerIds(): Promise<string[]> {
    const careers = await this.getAllCareers();
    return careers.map(career => career.id);
  }

  /**
   * Search careers by skills
   */
  static async searchCareersBySkill(skill: string): Promise<CareerPath[]> {
    const careers = await this.getAllCareers();
    return careers.filter(career => 
      career.skills.some(s => 
        s.toLowerCase().includes(skill.toLowerCase())
      )
    );
  }

  /**
   * Get careers by gradient color theme
   */
  static async getCareersByGradient(gradient: string): Promise<CareerPath[]> {
    const careers = await this.getAllCareers();
    return careers.filter(career => career.gradient === gradient);
  }

  /**
   * Get total questions count across all careers
   */
  static async getTotalQuestionsCount(): Promise<number> {
    // TODO: Replace with database call
    // return await db.quizQuestions.count();
    const totalCount = Object.values(quizQuestionsByCareer).reduce(
      (total, questions) => total + questions.length, 
      0
    );
    return Promise.resolve(totalCount);
  }

  /**
   * Add a new career (for future database integration)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async addCareer(_career: Omit<CareerPath, 'id'>): Promise<CareerPath> {
    // TODO: Implement database insertion
    // return await db.careers.create(career);
    throw new Error('Add career functionality not implemented yet');
  }

  /**
   * Update an existing career (for future database integration)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async updateCareer(_id: string, _updates: Partial<CareerPath>): Promise<CareerPath | null> {
    // TODO: Implement database update
    // return await db.careers.update(id, updates);
    throw new Error('Update career functionality not implemented yet');
  }

  /**
   * Delete a career (for future database integration)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async deleteCareer(_id: string): Promise<boolean> {
    // TODO: Implement database deletion
    // return await db.careers.delete(id);
    throw new Error('Delete career functionality not implemented yet');
  }
}

/**
 * Quiz Service - handles all quiz-related data operations
 */
export class QuizService {
  /**
   * Submit quiz answer and get feedback
   */
  static async submitAnswer(
    careerId: string, 
    questionId: number, 
    answerId: string
  ): Promise<{
    isCorrect: boolean;
    explanation: string;
    statistics: { optionId: string; percentage: number }[];
  }> {
    const questions = await CareerService.getQuizQuestionsByCareer(careerId);
    const question = questions.find(q => q.id === questionId);
    
    if (!question) {
      throw new Error('Question not found');
    }

    const selectedOption = question.options.find(opt => opt.id === answerId);
    if (!selectedOption) {
      throw new Error('Invalid answer option');
    }

    return {
      isCorrect: selectedOption.isCorrect,
      explanation: question.explanation,
      statistics: question.options.map(opt => ({
        optionId: opt.id,
        percentage: opt.percentage
      }))
    };
  }

  /**
   * Get quiz progress for a user (placeholder for future implementation)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async getQuizProgress(_userId: string, _careerId: string): Promise<{
    completedQuestions: number;
    totalQuestions: number;
    score: number;
  }> {
    // TODO: Implement with user tracking
    throw new Error('Quiz progress tracking not implemented yet');
  }

  /**
   * Save quiz results (placeholder for future implementation)
   */
  static async saveQuizResults(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _userId: string, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _careerId: string, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _results: { questionId: number; answerId: string; isCorrect: boolean }[]
  ): Promise<void> {
    // TODO: Implement database storage
    throw new Error('Quiz results saving not implemented yet');
  }
}
