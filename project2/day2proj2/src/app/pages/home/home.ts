import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardModule, ButtonModule, AvatarModule, ChipModule, RouterModule, DrawerModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  sidebarVisible = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }

  viewMyWork() {
    this.router.navigate(['/projects']);
  }

  getInTouch() {
    this.router.navigate(['/contact']);
  }
}
