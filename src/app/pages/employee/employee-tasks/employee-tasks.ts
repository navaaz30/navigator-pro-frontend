import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';


import { EmployeeTaskService } from '../../../services/employee-task.service';

@Component({
  selector: 'app-employee-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './employee-tasks.html',
  styleUrl: './employee-tasks.scss'
})
export class EmployeeTasks implements OnInit {

  constructor(
    private taskService: EmployeeTaskService,
    private cdr: ChangeDetectorRef
  ) {}

  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;

  // ==========================================
  // Tasks
  // ==========================================

  tasks: any[] = [];

  filteredTasks: any[] = [];

  // ==========================================
  // Summary
  // ==========================================

  totalTasks = 0;

  pendingTasks = 0;

  inProgressTasks = 0;

  completedTasks = 0;

  // ==========================================
  // Filters
  // ==========================================

  searchText = '';

  selectedStatus = 'ALL';

  // ==========================================
  // View Modal
  // ==========================================

  showViewModal = false;

  selectedTask: any = null;

  // ==========================================
  // Update Status Modal
  // ==========================================

  showStatusModal = false;

  selectedTaskId = '';

  selectedTaskStatus = '';

  remarks = '';

  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.loadTasks();

    

  }

  // ==========================================
  // Load Tasks
  // ==========================================

  loadTasks(): void {

    this.isLoading = true;

    this.taskService.getMyTasks().subscribe({

      next: (response: any) => {


        this.tasks = response.data || [];

        this.calculateSummary();

        this.applyFilters();

        this.isLoading = false;

        this.cdr.detectChanges();

      },

      error: (error: any) => {

        console.error(error);


        this.isLoading = false;

      }

    });

  }

  // ==========================================
  // Summary
  // ==========================================

  calculateSummary(): void {

    this.totalTasks = this.tasks.length;

    this.pendingTasks = this.tasks.filter(
      task => task.status === 'PENDING'
    ).length;

    this.inProgressTasks = this.tasks.filter(
      task => task.status === 'IN_PROGRESS'
    ).length;

    this.completedTasks = this.tasks.filter(
      task => task.status === 'COMPLETED'
    ).length;

  }

  // ==========================================
  // Search + Filter
  // ==========================================

  applyFilters(): void {

    this.filteredTasks = this.tasks.filter(task => {

      const matchesSearch =

        task.title
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||

        task.description
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||

        task.assignedBy?.fullName
          ?.toLowerCase()
          .includes(this.searchText.toLowerCase());

      const matchesStatus =

        this.selectedStatus === 'ALL' ||

        task.status === this.selectedStatus;

      return matchesSearch && matchesStatus;

    });

  }

  // ==========================================
  // View
  // ==========================================

  openView(task: any): void {

    this.selectedTask = task;

    this.showViewModal = true;

  }

  closeView(): void {

    this.showViewModal = false;

    this.selectedTask = null;

  }

  // ==========================================
  // Update Status
  // ==========================================

  openStatusModal(task: any): void {

    this.selectedTaskId = task._id;

    this.selectedTaskStatus = task.status;

    this.remarks = task.remarks;

    this.showStatusModal = true;

  }

  closeStatusModal(): void {

    this.showStatusModal = false;

  }

  updateStatus(): void {

    this.taskService.updateTaskStatus(

      this.selectedTaskId,

      this.selectedTaskStatus,

      this.remarks

    ).subscribe({

      next: () => {

        this.closeStatusModal();

        this.loadTasks();

      },

      error: (error: any) => {

        console.error(error);

      }

    });

  }

  // ==========================================
  // Helpers
  // ==========================================

  formatDate(date: string): string {

    return new Date(date).toLocaleDateString();

  }

}