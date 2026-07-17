import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { StatsCard } from '../../../shared/components/stats-card/stats-card';
import { TaskChart } from '../../../shared/components/task-chart/task-chart';

import { EmployeeDashboardService } from '../../../services/employee-dashboard.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,

  imports: [
    CommonModule,
    StatsCard,
    TaskChart
  ],

  templateUrl: './employee-dashboard.html',

  styleUrl: './employee-dashboard.scss'
})
export class EmployeeDashboard implements OnInit {

  stats = {

    attendanceToday: '',

    workingHours: 0,

    attendancePercentage: 0,

    pendingTasks: 0,

    pendingLeaves: 0,

    pendingExpenses: 0,

    taskSummary: {

      pending: 0,

      inProgress: 0,

      completed: 0,

      cancelled: 0

    },

    leaveSummary: {

      pending: 0,

      approved: 0,

      rejected: 0

    },

    expenseSummary: {

      pending: 0,

      approved: 0,

      rejected: 0

    }

  };

  constructor(

    private dashboardService: EmployeeDashboardService,

    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.dashboardService.getStats().subscribe({

      next: (response: any) => {

        this.stats = response.data;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}