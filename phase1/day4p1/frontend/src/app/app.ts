import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,

    SidebarModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  protected readonly title = signal('BugTracker');
  sidebarVisible = false;
  appName = "BugTracker";
  menuItems: any[] = [];
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateMenuItems();
    // Listen for route changes to update menu
    this.router.events.subscribe(() => {
      this.updateMenuItems();
    });
  }

  updateMenuItems() {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    if (this.isLoggedIn) {
      this.menuItems = [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
        { label: 'Bugs', icon: 'pi pi-bug', routerLink: '/bugs' },
        { label: 'Logout', icon: 'pi pi-sign-out', action: 'logout' }
      ];
    } else {
      this.menuItems = [
        { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login' },
        { label: 'Register', icon: 'pi pi-user-plus', routerLink: '/register' }
      ];
    }
  }

  onMenuClick(item: any) {
    if (item.action === 'logout') {
      this.authService.logout();
      this.router.navigate(['/login']);
      this.updateMenuItems();
    }
    this.closeSidebar();
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }
}
