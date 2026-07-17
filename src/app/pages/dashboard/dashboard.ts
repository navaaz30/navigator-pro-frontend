import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { StatsCard } from '../../shared/components/stats-card/stats-card';
import { TaskChart } from '../../shared/components/task-chart/task-chart';

import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StatsCard,
    TaskChart
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  stats = {

    totalEmployees: 0,

    presentToday: 0,
    absentToday: 0,
    halfDayToday: 0,
    onLeaveToday: 0,

    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,

    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    cancelledTasks: 0,

    pendingExpenses: 0,
    approvedExpenses: 0,
    rejectedExpenses: 0,

    inventoryItems: 0,
    lowStockItems: 0,
    outOfStockItems: 0

  };

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.dashboardService.getStats().subscribe({

      next: (response: any) => {

        this.stats = response.data;

        this.cdr.detectChanges();

      },

      error: (error: any) => {

        console.error('Dashboard Error:', error);

      }

    });

  }

}