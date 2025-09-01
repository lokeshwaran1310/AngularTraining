import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bugs.html',
  styleUrl: './bugs.css'
})
export class BugsComponent implements OnInit{
  bugs: any[] = [];
  allBugs: any[] = [];
  error: string = '';
  username: string | null = null;
  searchId: string = '';
  
  constructor(
    private bugService: BugService,
    private authService: AuthService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.username = this.authService.getUsername();
    
    this.loadBugs();
  }
  
  loadBugs() {
    this.bugService.getBugs().subscribe({
      next: (data) => {
        this.bugs = data;
        this.allBugs = data;
      },
      error: (err) => (this.error = err.message)
    });
  }

  searchBugs() {
    if (!this.searchId) {
      this.bugs = this.allBugs;
      return;
    }

    const id = parseInt(this.searchId);
    if (isNaN(id)) {
      this.error = 'Please enter a valid ID number';
      return;
    }

    const foundBug = this.allBugs.find(bug => bug.id === id);
    if (foundBug) {
      this.bugs = [foundBug];
      this.error = '';
    } else {
      this.bugs = [];
      this.error = 'Bug with ID ' + id + ' not found';
    }
  }

  clearSearch() {
    this.searchId = '';
    this.bugs = this.allBugs;
    this.error = '';
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
