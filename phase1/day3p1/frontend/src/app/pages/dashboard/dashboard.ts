import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.username = this.authService.getUsername();
    
    // Update time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToBugs() {
    this.router.navigate(['/bugs']);
  }
}
