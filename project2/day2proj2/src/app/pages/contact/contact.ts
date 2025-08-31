import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, InputTextModule, TextareaModule, ButtonModule, CardModule, ToastModule, FloatLabelModule, TagModule, DividerModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  sendEmail() {
    window.location.href = 'mailto:lokesh13102003@gmail.com';
  }

  callPhone() {
    window.location.href = 'tel:+917708286926';
  }

  openLinkedIn() {
    window.open('https://www.linkedin.com/in/lokeshwaran-m-83260b258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
  }

  openGitHub() {
    window.open('https://github.com/lokeshwaran1310', '_blank');
  }


}
