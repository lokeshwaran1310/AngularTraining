import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('BugTracker');
  sidebarVisible = false;
  appName = "BugTracker";
  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
    { label: 'Login', icon: 'pi pi-user', routerLink: '/login' },
    { label: 'Bugs', icon: 'pi pi-cog', routerLink: '/bugs' }
  ];
}
