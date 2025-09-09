import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

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
export class AppComponent implements OnInit, OnDestroy {
  protected readonly title = signal('BugTracker');
  sidebarVisible = false;
  menuItems: any[] = [];
  isLoggedIn = false;
  private routerSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateMenuItems();
    // Listen for route changes to update menu
    this.routerSubscription = this.router.events.subscribe(() => {
      this.updateMenuItems();
    });
  }

  updateMenuItems() {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    if (this.isLoggedIn) {
      const userRole = this.authService.getUserRole();
      this.menuItems = [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
        { label: 'Bugs', icon: 'pi pi-bug', routerLink: '/bugs' }
      ];
      
      // Add role-specific menu items
      if (userRole === 'MANAGER') {
        this.menuItems.push({ label: 'Management Panel', icon: 'pi pi-cog', routerLink: '/admin' });
      }
      
      this.menuItems.push({ label: 'Logout', icon: 'pi pi-sign-out', action: 'logout' });
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

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
