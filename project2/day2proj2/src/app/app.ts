import { Component, signal } from '@angular/core';
import { RouterOutlet, NavigationStart, NavigationEnd, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    CommonModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    ProgressSpinnerModule,
    TooltipModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Portfolio');
  isLoading = false;
  currentPageName = '';
  
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentPageName = this.getPageName(event.url);
        this.isLoading = true;
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }
  
  private getPageName(url: string): string {
    const route = url.split('/')[1] || 'home';
    const pageNames: { [key: string]: string } = {
      'home': 'Home Page',
      'about': 'About Page',
      'projects': 'Projects Page',
      'skills': 'Skills Page',
      'experience': 'Experience Page',
      'certificates': 'Certificates Page',
      'contact': 'Contact Page'
    };
    return pageNames[route] || 'Page';
  }
}