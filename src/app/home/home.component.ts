import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h1>This is a quiz game!</h1>
    <a [routerLink]="['quiz/questions']">Click here to play the quiz!</a>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
