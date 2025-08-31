import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  public students$ = this.studentsSubject.asObservable();
  private nextId = 1;

  constructor() {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      try {
        this.students = JSON.parse(savedStudents);
        this.nextId = this.students.reduce((max, s) => Math.max(max, s.id), 0) + 1;
        this.studentsSubject.next(this.students);
      } catch (error) {
        console.error('Failed to parse saved students data');
        localStorage.removeItem('students');
      }
    }
  }

  addStudent(studentData: Omit<Student, 'id'>) {
    const student: Student = {
      id: this.nextId++,
      ...studentData
    };
    this.students.push(student);
    this.saveToStorage();
    this.studentsSubject.next(this.students);
  }

  updateStudent(id: number, studentData: Omit<Student, 'id'>) {
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.students[index] = { id, ...studentData };
      this.saveToStorage();
      this.studentsSubject.next(this.students);
    }
  }

  getStudents(): Student[] {
    return [...this.students];
  }

  getStudent(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  deleteStudent(id: number) {
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      this.saveToStorage();
      this.studentsSubject.next(this.students);
    }
  }

  private saveToStorage() {
    localStorage.setItem('students', JSON.stringify(this.students));
  }
}