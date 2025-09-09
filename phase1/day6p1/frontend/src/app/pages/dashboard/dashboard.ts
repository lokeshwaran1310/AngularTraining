import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class DashboardComponent implements OnInit, OnDestroy {
  username: string | null = null;
  userRole: string | null = null;
  currentTime = new Date();
  totalBugs = 0;
  bugStats = { open: 0, inProgress: 0, resolved: 0, closed: 0 };
  projectStats: any[] = [];
  recentBugs: any[] = [];
  private timeInterval: any;

  constructor(private authService: AuthService, private router: Router, private bugService: BugService) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.username = this.authService.getUsername();
    this.userRole = this.authService.getUserRole();
    
    // Load bug statistics
    this.loadBugStats();
    
    // Update time every second
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  loadBugStats() {
    this.bugService.getBugs().subscribe({
      next: (bugs) => {
        this.totalBugs = bugs.length;
        
        // Single pass calculation for efficiency
        const stats = bugs.reduce((acc: any, bug) => {
          // Count by status
          switch(bug.status) {
            case 'Open': acc.open++; break;
            case 'In Progress': acc.inProgress++; break;
            case 'Resolved': acc.resolved++; break;
            case 'Closed': acc.closed++; break;
          }
          // Count by project
          acc.projects[bug.project] = (acc.projects[bug.project] || 0) + 1;
          return acc;
        }, { open: 0, inProgress: 0, resolved: 0, closed: 0, projects: {} });
        
        this.bugStats = { open: stats.open, inProgress: stats.inProgress, resolved: stats.resolved, closed: stats.closed };
        this.projectStats = Object.entries(stats.projects).map(([project, count]) => ({ name: project, count }));
        this.recentBugs = bugs.slice(-3).reverse();
      },
      error: (err) => {}
    });
  }

  navigateToBugs() {
    this.router.navigate(['/bugs']);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
}
