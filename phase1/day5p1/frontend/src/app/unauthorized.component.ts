import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  standalone:true,
  imports:[CommonModule],
  template: '<h1>Unauthorized Access</h1><p>You do not have permission to view this page.</p>',
})
export class UnauthorizedComponent {
    

}