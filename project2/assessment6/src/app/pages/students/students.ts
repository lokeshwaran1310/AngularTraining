import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService, Student } from '../../services/student.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TableModule, DialogModule, ButtonModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class StudentsComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  displayDialog = false;
  editForm!: FormGroup;
  selectedStudent!: Student;
  private subscription = new Subscription();

  get totalStudents(): number {
    return this.students.length;
  }

  get averageAge(): number {
    if (this.students.length === 0) return 0;
    const sum = this.students.reduce((acc, student) => acc + student.age, 0);
    return Math.round(sum / this.students.length);
  }

  get departmentCounts(): { [key: string]: number } {
    return this.students.reduce((acc, student) => {
      acc[student.department] = (acc[student.department] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  get mostPopularDepartment(): string {
    const counts = this.departmentCounts;
    const maxCount = Math.max(...Object.values(counts));
    return Object.keys(counts).find(dept => counts[dept] === maxCount) || 'None';
  }

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initEditForm();
    this.loadStudents();
  }

  loadStudents() {
    this.students = this.studentService.getStudents();
    this.filteredStudents = [...this.students];
    this.subscription.add(
      this.studentService.students$.subscribe(students => {
        this.students = students;
        this.filterStudents();
      })
    );
  }

  initEditForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      age: ['', [Validators.required, Validators.min(17), Validators.max(24)]],
      department: ['', Validators.required]
    });
  }

  onRowSelect(event: any) {
    if (event?.data) {
      this.selectedStudent = event.data;
      this.editForm.patchValue({
        name: this.selectedStudent.name,
        email: this.selectedStudent.email,
        age: this.selectedStudent.age,
        department: this.selectedStudent.department
      });
      this.displayDialog = true;
    }
  }

  saveStudent() {
    if (this.editForm.valid && this.selectedStudent) {
      this.studentService.updateStudent(this.selectedStudent.id, this.editForm.value);
      this.hideDialog();
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.editForm.controls).forEach(key => {
      this.editForm.get(key)?.markAsTouched();
    });
  }

  hideDialog() {
    this.displayDialog = false;
    this.editForm.reset();
  }

  filterStudents() {
    if (!this.searchTerm) {
      this.filteredStudents = [...this.students];
    } else {
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onSearch() {
    this.filterStudents();
  }

  deleteStudent(student: Student) {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      this.studentService.deleteStudent(student.id);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
