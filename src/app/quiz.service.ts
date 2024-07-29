import { Injectable } from '@angular/core';
import { QuizApiResponse } from './quiz-question';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php?amount=1&category=9';

  async getQuizQuestions(): Promise<QuizApiResponse> {
    try {
      const data = await fetch(this.apiUrl);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      const response: QuizApiResponse = await data.json();
      return response;
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      return { response_code: 1, results: [] };
    }
  }

  } 

