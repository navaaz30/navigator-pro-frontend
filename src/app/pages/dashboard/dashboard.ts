import { Component } from '@angular/core';
import { StatsCard } from '../../shared/components/stats-card/stats-card';
import { TaskChart } from '../../shared/components/task-chart/task-chart';
import { ExpenseChart } from '../../shared/components/expense-chart/expense-chart';
import { ActivityTable } from '../../shared/components/activity-table/activity-table';
import { TopPerformers } from '../../shared/components/top-performers/top-performers';
import { QuickActions } from '../../shared/components/quick-actions/quick-actions';
import { TodaysSummary } from '../../shared/components/todays-summary/todays-summary';
import { OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StatsCard,
    TaskChart,
    ExpenseChart,
    ActivityTable,
    TopPerformers,
    QuickActions,
    TodaysSummary
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  stats = {
  totalEmployees: 0,
  presentToday: 0,
  halfDayToday: 0,
  onLeaveToday: 0,
  pendingLeaves: 0
};

  constructor(
  private dashboardService: DashboardService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
  console.log('Dashboard ngOnInit');

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