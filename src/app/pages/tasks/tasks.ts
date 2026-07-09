import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

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
export class Tasks {

  searchText = '';
  selectedStatus = '';
  selectedPriority = '';
  validationError = '';

  showForm = false;
  isEditMode = false;
  showViewModal = false;

  selectedTask: Task | null = null;

  showDeleteModal = false;

  taskToDelete: Task | null = null;

  newTask: Task = {
    id: '',
    technician: '',
    client: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: ''
  };

  tasks: Task[] = [
    {
      id: 'T-101',
      technician: 'Abhishek Singh',
      client: 'Reliance Industries',
      status: 'Pending',
      priority: 'High',
      dueDate: '29 Jun 2026'
    },
    {
      id: 'T-102',
      technician: 'Rohit Sharma',
      client: 'Tata Power',
      status: 'Ongoing',
      priority: 'Medium',
      dueDate: '30 Jun 2026'
    },
    {
      id: 'T-103',
      technician: 'Sanjeev Kumar',
      client: 'Adani Green',
      status: 'Completed',
      priority: 'Low',
      dueDate: '27 Jun 2026'
    },
    {
      id: 'T-104',
      technician: 'Pankaj Mehta',
      client: 'Airtel',
      status: 'Overdue',
      priority: 'High',
      dueDate: '25 Jun 2026'
    }
  ];

  get filteredTasks(): Task[] {

    return this.tasks.filter(task => {

      const matchesSearch =
        task.id.toLowerCase().includes(this.searchText.toLowerCase()) ||
        task.technician.toLowerCase().includes(this.searchText.toLowerCase()) ||
        task.client.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.selectedStatus === '' ||
        task.status === this.selectedStatus;

      const matchesPriority =
        this.selectedPriority === '' ||
        task.priority === this.selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;

    });

  }

  openAssignForm(): void {

    this.isEditMode = false;

    this.newTask = {
      id: '',
      technician: '',
      client: '',
      status: 'Pending',
      priority: 'Medium',
      dueDate: ''
    };
    
    this.validationError = '';
    this.showForm = true;

  }

  saveTask(): void {

   if (
  !this.newTask.technician.trim() ||
  !this.newTask.client.trim() ||
  !this.newTask.dueDate
) {

  this.validationError = 'Please fill all required fields.';
  return;

}

this.validationError = '';

    if (this.isEditMode) {

      const index = this.tasks.findIndex(
        task => task.id === this.newTask.id
      );

      if (index !== -1) {
        this.tasks[index] = { ...this.newTask };
      }

    } else {

      const nextId =
        this.tasks.length + 101;

      const formattedDate = new Date(this.newTask.dueDate)
  .toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

this.tasks.push({
  ...this.newTask,
  dueDate: formattedDate,


        id: `T-${nextId}`

      });

    }

    this.closeForm();

  }
    closeForm(): void {

    this.showForm = false;

    this.isEditMode = false;

    this.newTask = {
      id: '',
      technician: '',
      client: '',
      status: 'Pending',
      priority: 'Medium',
      dueDate: ''
    };

  }

  viewTask(task: Task): void {

    this.selectedTask = { ...task };

    this.showViewModal = true;

  }

  closeView(): void {

    this.showViewModal = false;

    this.selectedTask = null;

  }

  editTask(task: Task): void {

    this.isEditMode = true;

    this.newTask = { ...task };

    this.showForm = true;

  }

  deleteTask(task: Task): void {

  this.taskToDelete = task;

  this.showDeleteModal = true;

}

  assignTask(): void {

    this.openAssignForm();

  }

  resetFilters(): void {

    this.searchText = '';
    this.selectedStatus = '';
    this.selectedPriority = '';

  }

  totalTasks(): number {

    return this.tasks.length;

  }

  pendingTasks(): number {

    return this.tasks.filter(
      task => task.status === 'Pending'
    ).length;

  }

  ongoingTasks(): number {

    return this.tasks.filter(
      task => task.status === 'Ongoing'
    ).length;

  }

  completedTasks(): number {

    return this.tasks.filter(
      task => task.status === 'Completed'
    ).length;

  }

  overdueTasks(): number {

    return this.tasks.filter(
      task => task.status === 'Overdue'
    ).length;

  }

  confirmDelete(): void {

  if (!this.taskToDelete) return;

  this.tasks = this.tasks.filter(
    t => t.id !== this.taskToDelete!.id
  );

  this.showDeleteModal = false;

  this.taskToDelete = null;

}

cancelDelete(): void {

  this.showDeleteModal = false;

  this.taskToDelete = null;

}

}