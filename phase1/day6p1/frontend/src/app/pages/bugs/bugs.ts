import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './bugs.html',
  styleUrl: './bugs.css'
})
export class BugsComponent implements OnInit{
  bugs: any[] = [];
  allBugs: any[] = [];
  error: string = '';
  username: string | null = null;
  searchId: string = '';
  
  // Filter properties
  filterStatus: string = '';
  filterAssignee: string = '';
  filterProject: string = '';
  sortBy: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  
  // Create/Edit form properties
  showForm: boolean = false;
  isEditing: boolean = false;
  currentBug: any = {
    id: null,
    title: '',
    assignee: '',
    status: 'Open',
    project: ''
  };
  
  // Statistics
  bugSummary = {
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0
  };
  
  uniqueAssignees: string[] = [];
  uniqueProjects: string[] = [];
  
  // Role permissions
  userRole: string | null = null;
  canCreateEdit: boolean = false;
  canDelete: boolean = false;
  
  constructor(
    private bugService: BugService,
    private authService: AuthService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.username = this.authService.getUsername();
    this.userRole = this.authService.getUserRole();
    this.setPermissions();
    
    this.loadBugs();
  }
  
  loadBugs() {
    this.bugService.getBugs().subscribe({
      next: (data) => {
        this.bugs = data;
        this.allBugs = data;
        this.calculateSummary();
      },
      error: (err) => (this.error = err.error?.message || err.message || 'Failed to load bugs')
    });
  }
  
  calculateSummary() {
    this.bugSummary.total = this.allBugs.length;
    
    // Single pass through bugs array for efficiency
    const summary = this.allBugs.reduce((acc, bug) => {
      switch(bug.status) {
        case 'Open': acc.open++; break;
        case 'In Progress': acc.inProgress++; break;
        case 'Resolved': acc.resolved++; break;
        case 'Closed': acc.closed++; break;
      }
      acc.assignees.add(bug.assignee);
      acc.projects.add(bug.project);
      return acc;
    }, { open: 0, inProgress: 0, resolved: 0, closed: 0, assignees: new Set(), projects: new Set() });
    
    this.bugSummary.open = summary.open;
    this.bugSummary.inProgress = summary.inProgress;
    this.bugSummary.resolved = summary.resolved;
    this.bugSummary.closed = summary.closed;
    this.uniqueAssignees = Array.from(summary.assignees);
    this.uniqueProjects = Array.from(summary.projects);
  }

  searchBugs() {
    if (!this.searchId) {
      this.bugs = this.allBugs;
      return;
    }

    const id = parseInt(this.searchId);
    if (isNaN(id)) {
      this.error = 'Please enter a valid ID number';
      return;
    }

    const foundBug = this.allBugs.find(bug => bug.id === id);
    if (foundBug) {
      this.bugs = [foundBug];
      this.error = '';
    } else {
      this.bugs = [];
      this.error = 'Bug with ID ' + id + ' not found';
    }
  }

  clearSearch() {
    this.searchId = '';
    this.bugs = this.allBugs;
    this.error = '';
  }

  filterBugs() {
    let filteredBugs = [...this.allBugs];
    
    if (this.filterStatus) {
      filteredBugs = filteredBugs.filter(bug => bug.status?.toLowerCase().includes(this.filterStatus.toLowerCase()));
    }
    if (this.filterAssignee) {
      filteredBugs = filteredBugs.filter(bug => bug.assignee?.toLowerCase().includes(this.filterAssignee.toLowerCase()));
    }
    if (this.filterProject) {
      filteredBugs = filteredBugs.filter(bug => bug.project?.toLowerCase().includes(this.filterProject.toLowerCase()));
    }
    
    this.bugs = filteredBugs;
  }

  sortBugs() {
    if (!this.sortBy) return;
    
    this.bugs.sort((a, b) => {
      let valueA = a[this.sortBy];
      let valueB = b[this.sortBy];
      
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (this.sortOrder === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
  }

  resetFilters() {
    this.filterStatus = '';
    this.filterAssignee = '';
    this.filterProject = '';
    this.sortBy = '';
    this.sortOrder = 'asc';
    this.searchId = '';
    this.bugs = [...this.allBugs];
    this.error = '';
  }

  editBug(bug: any) {
    this.isEditing = true;
    this.currentBug = { ...bug };
    this.showForm = true;
  }

  createBug() {
    this.isEditing = false;
    this.currentBug = {
      id: null,
      title: '',
      assignee: '',
      status: 'Open',
      project: ''
    };
    this.showForm = true;
  }

  saveBug() {
    if (!this.currentBug.title || !this.currentBug.assignee || !this.currentBug.project) {
      this.error = 'Please fill all required fields';
      return;
    }
    
    if (this.isEditing) {
      this.bugService.updateBug(this.currentBug.id, this.currentBug).subscribe({
        next: (response) => {
          this.cancelForm();
          this.loadBugs();
        },
        error: (err) => {
          this.error = 'Failed to update bug: ' + (err.error?.message || err.message);
        }
      });
    } else {
      this.bugService.createBug(this.currentBug).subscribe({
        next: (response) => {
          this.cancelForm();
          this.loadBugs();
        },
        error: (err) => {
          this.error = 'Failed to create bug: ' + (err.error?.message || err.message);
        }
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.isEditing = false;
    this.currentBug = {
      id: null,
      title: '',
      assignee: '',
      status: 'Open',
      project: ''
    };
  }

  deleteBug(id: number) {
    if (confirm('Are you sure you want to delete this bug?')) {
      this.bugService.deleteBug(id).subscribe({
        next: (response) => {
          this.loadBugs();
        },
        error: (err) => {
          this.error = 'Failed to delete bug: ' + (err.error?.message || err.message);
        }
      });
    }
  }

  setPermissions() {
    // MANAGER: Full access - can create, edit, delete, assign bugs
    // DEVELOPER: Can edit bugs to update status and details
    // TESTER: View only (no edit/delete buttons)
    this.canCreateEdit = this.userRole === 'MANAGER' || this.userRole === 'DEVELOPER';
    this.canDelete = this.userRole === 'MANAGER';
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
