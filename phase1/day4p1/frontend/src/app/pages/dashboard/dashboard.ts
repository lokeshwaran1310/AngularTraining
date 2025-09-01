import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BugService } from '../../services/bug.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  username: string | null = null;
  currentTime = new Date();
  totalBugs = 0;
  bugStats = { open: 0, inProgress: 0, closed: 0 };

  constructor(private authService: AuthService, private router: Router, private bugService: BugService) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.username = this.authService.getUsername();
    
    // Load bug statistics
    this.loadBugStats();
    
    // Update time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  loadBugStats() {
    this.bugService.getBugs().subscribe({
      next: (bugs) => {
        this.totalBugs = bugs.length;
      },
      error: (err) => console.error('Error loading bug stats:', err)
    });
  }

  navigateToBugs() {
    this.router.navigate(['/bugs']);
  }
}
