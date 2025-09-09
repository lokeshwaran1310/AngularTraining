import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  username = '';
  selectedRole = 'USER';
  message = '';
  isSuccess = false;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  updateRole() {
    if (!this.username.trim()) {
      this.showMessage('Please enter a username', false);
      return;
    }

    this.isLoading = true;
    this.authService.updateUserRole(this.username, this.selectedRole).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.showMessage(response.message, true);
          this.username = '';
        } else {
          this.showMessage(response.message, false);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.showMessage('Failed to update user role', false);
      }
    });
  }

  showMessage(msg: string, success: boolean) {
    this.message = msg;
    this.isSuccess = success;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}