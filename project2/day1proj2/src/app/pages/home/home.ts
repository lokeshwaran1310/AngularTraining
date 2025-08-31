import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  viewMyWork() {
    this.router.navigate(['/projects']);
  }

  getInTouch() {
    this.router.navigate(['/contact']);
  }
}
