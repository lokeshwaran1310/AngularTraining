import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {

    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      age: ['', [Validators.required, Validators.min(17), Validators.max(24)]],
      department: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      try {
        this.studentService.addStudent(this.studentForm.value);
        alert('Student registered successfully!');
        this.studentForm.reset();
      } catch (error) {
        console.error('Failed to register student');
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.studentForm.controls).forEach(key => {
      this.studentForm.get(key)?.markAsTouched();
    });
  }

  resetForm() {
    this.studentForm.reset();
  }
}
