import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
export const routes: Routes = [
   
    {
        path:"",
        component: HomeComponent,
        title: "Quiz App"
    },
    {
        path:"quiz/questions",
        component: QuizQuestionsComponent,
        title: 'Quiz Game'
    }
];
