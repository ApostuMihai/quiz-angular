import { CommonModule} from '@angular/common';
import { Component, inject } from '@angular/core';
import { QuizService } from '../quiz.service';
import { QuizApiResponse, QuizQuestion } from '../quiz-question';
import { FormsModule } from '@angular/forms'; // Import FormsModule
@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="game-container">
    <button class="start-btn" *ngIf="!gameStarted" type="button" (click)="startGame()">Start the game!</button>
  <select [disabled]="gameStarted" [(ngModel)]="selectedCategory">
          <option *ngFor="let category of categories" [value]="category.value">{{ category.name }}</option>
        </select>
  <div *ngIf="gameStarted">
    <div class="question-container" *ngFor="let question of quizQuestions; let i = index">
      <h3>{{ question.question }}</h3>
      <ul class="answers-list">
        <li class="answers-option" *ngFor="let answer of getAllAnswers(question); let j = index"
            [class.selected]="selectedAnswers[i] === answer && !showResults"
            [class.correct]="showResults && answer === question.correct_answer"
            [class.incorrect]="showResults && selectedAnswers[i] === answer && answer !== question.correct_answer"
            (click)="selectAnswer(i, answer)">
          {{ answer }}
        </li>
      </ul>
    </div>
    <div class="buttons-container">
    <button class="submit-button" type="submit" (click)="checkAnswers()">Check</button>
    <button class="next-button" type="button" [disabled]="!isChecked" (click)="getQuestions()">Next question</button>
    </div>
  </div>
  </div>
`,
  styleUrl: './quiz-questions.component.css'
})
export class QuizQuestionsComponent {
  quizQuestions: any[] = [];
  selectedAnswers: string[] = [];
  gameStarted: boolean = false;
  showResults: boolean = false;
  isChecked: boolean = false;
  selectedCategory: number = 9; 
  categories: any[] = []
  quizService: QuizService = inject(QuizService);

  
  constructor() {}
  ngOnInit(): void {
    this.categories = this.quizService.getCategories();
  }
  async startGame(): Promise<void> {
    this.gameStarted = true;
    await this.getQuestions();
  }

  async getQuestions(): Promise<void> {
    try {
      const data: QuizApiResponse = await this.quizService.getQuizQuestions(this.selectedCategory);
      this.quizQuestions = data.results.map((question: QuizQuestion) => {
        return {
          ...question,
          question: this.decodeHtml(question.question),
          correct_answer: this.decodeHtml(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map(answer => this.decodeHtml(answer))
        };
      });
      this.selectedAnswers = new Array(this.quizQuestions.length).fill(null);
      this.showResults = false; 
      this.isChecked = false;
    } catch (error) {
      console.error('Error loading quiz questions', error);
    }
  }

  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  getAllAnswers(question: QuizQuestion): string[] {
    return [...question.incorrect_answers, question.correct_answer].sort();
  }

  selectAnswer(questionIndex: number, answer: string): void {
    if (!this.showResults) { 
      this.selectedAnswers[questionIndex] = answer;
    }
  }

  checkAnswers(): void {
    this.showResults = true;
    this.isChecked = true;
  }
}
