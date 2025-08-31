import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BugService } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bugs.html',
  styleUrl: './bugs.css'
})
export class BugsComponent implements OnInit{
  bugs: any[] = [];
  error: string = '';
  username: string | null = null;
  
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
    
    this.bugService.getBugs().subscribe({
      next:(data) => (this.bugs = data),
      error:(err) => (this.error = err.message)
    });
  }
  
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
