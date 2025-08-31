import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project',
  imports: [CardModule, ButtonModule, TagModule, CarouselModule, ImageModule, ToastModule],
  templateUrl: './project.html',
  styleUrl: './project.css',
  providers: [MessageService]
})
export class ProjectComponent {
  constructor(private router: Router, private messageService: MessageService) {}

  viewCode() {
    this.router.navigate(['/contact']);
  }

  liveDemo() {
    this.router.navigate(['/contact']);
  }

  showComingSoon() {
    this.messageService.add({
      severity: 'info',
      summary: 'Coming Soon',
      detail: 'This project will be available soon!'
    });
  }
}
