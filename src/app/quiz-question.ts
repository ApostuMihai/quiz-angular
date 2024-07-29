export interface QuizQuestion {
    type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizApiResponse {
    response_code: number;
    results: QuizQuestion[];
}
