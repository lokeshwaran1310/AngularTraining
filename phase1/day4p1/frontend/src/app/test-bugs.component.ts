import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-bugs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2>Test Bugs Component</h2>
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="error">Error: {{error}}</div>
      <div *ngIf="bugs">
        <h3>Bugs ({{bugs.length}}):</h3>
        <div *ngFor="let bug of bugs">
          <p>{{bug.id}} - {{bug.title}} - {{bug.assignee}}</p>
        </div>
      </div>
    </div>
  `
})
export class TestBugsComponent implements OnInit {
  bugs: any[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8082/bugs/all').subscribe({
      next: (data) => {
        this.bugs = data;
        this.loading = false;
        console.log('Bugs loaded:', data);
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        console.error('Error loading bugs:', err);
      }
    });
  }
}