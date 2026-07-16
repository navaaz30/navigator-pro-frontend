import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks implements OnInit {

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  // ==========================================
  // Search & Filters
  // ==========================================

  searchText = '';

  selectedStatus = '';

  selectedPriority = '';

  loading = false;

  validationError = '';

  // ==========================================
  // Popup Controls
  // ==========================================

  showForm = false;

  showViewModal = false;

  showDeleteModal = false;

  isEditMode = false;

  selectedTask: any = null;

  taskToDelete: any = null;

  // ==========================================
  // Data
  // ==========================================

  tasks: any[] = [];

  employees: any[] = [];

  // ==========================================
  // Form Model
  // ==========================================

  newTask: any = {

    _id: '',

    assignedTo: '',

    title: '',

    description: '',

    priority: 'MEDIUM',

    status: 'PENDING',

    dueDate: '',

    remarks: ''

  };

  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.loadEmployees();

    this.loadTasks();

  }

  // ==========================================
  // Load Employees
  // ==========================================

  loadEmployees(): void {

    this.userService.getUsers().subscribe({

      next: (response: any) => {

        const users = response.data || [];

        this.employees = users.filter(

          (user: any) => user.role === 'EMPLOYEE'

        );

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // ==========================================
  // Load Tasks
  // ==========================================

  loadTasks(): void {

    this.loading = true;

    this.taskService.getTasks().subscribe({

      next: (response: any) => {

        this.tasks = response.data || [];

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  // ==========================================
  // Search Filter
  // ==========================================

  get filteredTasks(): any[] {

    return this.tasks.filter((task: any) => {

      const employee =

        task.assignedTo?.fullName || '';

      const keyword =

        this.searchText.toLowerCase();

      const matchesSearch =

        task.title?.toLowerCase().includes(keyword) ||

        employee.toLowerCase().includes(keyword);

      const matchesStatus =

        !this.selectedStatus ||

        task.status === this.selectedStatus;

      const matchesPriority =

        !this.selectedPriority ||

        task.priority === this.selectedPriority;

      return (

        matchesSearch &&

        matchesStatus &&

        matchesPriority

      );

    });

  }

  // ==========================================
  // Open Add Task
  // ==========================================

  openAddForm(): void {

    this.validationError = '';

    this.isEditMode = false;

    this.newTask = {

      _id: '',

      assignedTo: '',

      title: '',

      description: '',

      priority: 'MEDIUM',

      status: 'PENDING',

      dueDate: '',

      remarks: ''

    };

    this.showForm = true;

  }

    // ==========================================
  // Save Task
  // ==========================================

  saveTask(): void {

    this.validationError = '';

    if (
      !this.newTask.assignedTo ||
      !this.newTask.title ||
      !this.newTask.description ||
      !this.newTask.priority ||
      !this.newTask.dueDate
    ) {

      this.validationError = 'Please fill all required fields.';

      return;

    }

    let payload: any;

if (this.isEditMode) {

    payload = {

        assignedTo: this.newTask.assignedTo,

        title: this.newTask.title,

        description: this.newTask.description,

        priority: this.newTask.priority,

        status: this.newTask.status,

        dueDate: this.newTask.dueDate,

        remarks: this.newTask.remarks

    };

} else {

    payload = {

        assignedTo: this.newTask.assignedTo,

        title: this.newTask.title,

        description: this.newTask.description,

        priority: this.newTask.priority,

        dueDate: this.newTask.dueDate

    };

}

    // ==========================
    // Update Task
    // ==========================

    if (this.isEditMode) {

      this.taskService.updateTask(

        this.newTask._id,

        payload

      ).subscribe({

        next: () => {

          this.closeForm();

          this.loadTasks();

        },

        error: (error) => {

          console.error(error);

        }

      });

      return;

    }

    // ==========================
    // Create Task
    // ==========================

    this.taskService.createTask(

      payload

    ).subscribe({

      next: () => {

        this.closeForm();

        this.loadTasks();

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // ==========================================
  // View Task
  // ==========================================

  viewTask(task: any): void {

    this.selectedTask = task;

    this.showViewModal = true;

  }

  closeView(): void {

    this.showViewModal = false;

    this.selectedTask = null;

  }

  // ==========================================
  // Edit Task
  // ==========================================

  editTask(task: any): void {

    this.validationError = '';

    this.isEditMode = true;

    this.newTask = {

      _id: task._id,

      assignedTo:

        task.assignedTo?._id ||

        task.assignedTo,

      title: task.title,

      description: task.description,

      priority: task.priority,

      status: task.status,

      dueDate: task.dueDate
        ? new Date(task.dueDate)
            .toISOString()
            .substring(0, 10)
        : '',

      remarks: task.remarks || ''

    };

    this.showForm = true;

  }

    // ==========================================
  // Delete Task
  // ==========================================

  deleteTask(task: any): void {

    this.taskToDelete = task;

    this.showDeleteModal = true;

  }

  // ==========================================
  // Confirm Delete
  // ==========================================

  confirmDelete(): void {

    if (!this.taskToDelete) {

      return;

    }

    this.taskService.deleteTask(

      this.taskToDelete._id

    ).subscribe({

      next: () => {

        this.cancelDelete();

        this.loadTasks();

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // ==========================================
  // Cancel Delete
  // ==========================================

  cancelDelete(): void {

    this.showDeleteModal = false;

    this.taskToDelete = null;

  }

  // ==========================================
  // Close Form
  // ==========================================

  closeForm(): void {

    this.showForm = false;

    this.validationError = '';

    this.isEditMode = false;

    this.selectedTask = null;

    this.newTask = {

      _id: '',

      assignedTo: '',

      title: '',

      description: '',

      priority: 'MEDIUM',

      status: 'PENDING',

      dueDate: '',

      remarks: ''

    };

  }

  // ==========================================
  // Statistics
  // ==========================================

  totalTasks(): number {

    return this.tasks.length;

  }

  pendingTasks(): number {

    return this.tasks.filter(

      (task: any) => task.status === 'PENDING'

    ).length;

  }

  ongoingTasks(): number {

    return this.tasks.filter(

      (task: any) => task.status === 'IN_PROGRESS'

    ).length;

  }

  completedTasks(): number {

    return this.tasks.filter(

      (task: any) => task.status === 'COMPLETED'

    ).length;

  }

  cancelledTasks(): number {

    return this.tasks.filter(

      (task: any) => task.status === 'CANCELLED'

    ).length;

  }

  // ==========================================
  // Helpers
  // ==========================================

  getEmployeeName(task: any): string {

    if (!task.assignedTo) {

      return '-';

    }

    if (typeof task.assignedTo === 'object') {

      return task.assignedTo.fullName || '-';

    }

    return '-';

  }

  getStatusClass(status: string): string {

    switch (status) {

      case 'PENDING':
        return 'pending';

      case 'IN_PROGRESS':
        return 'ongoing';

      case 'COMPLETED':
        return 'completed';

      case 'CANCELLED':
        return 'cancelled';

      default:
        return '';

    }

  }

  getPriorityClass(priority: string): string {

    switch (priority) {

      case 'LOW':
        return 'low';

      case 'MEDIUM':
        return 'medium';

      case 'HIGH':
        return 'high';

      case 'URGENT':
        return 'urgent';

      default:
        return '';

    }

  }

}