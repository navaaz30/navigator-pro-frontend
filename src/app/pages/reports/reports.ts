import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { ReportService } from '../../services/report.service';

import {
  Chart,
  DoughnutController,
  PieController,
  BarController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  DoughnutController,
  PieController,
  BarController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface EmployeeReport {

  employee: string;

  department: string;

  attendance: number;

  tasks: number;

  expenses: number;

  leaves: number;

  performance: 'Excellent' | 'Good' | 'Average' | 'Poor';

}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.scss'
})

export class Reports implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) {}

  // =====================================================
  // Filters
  // =====================================================

  selectedPeriod = 'today';

  selectedDepartment = '';

  // =====================================================
  // Modal
  // =====================================================

  showViewModal = false;

  selectedReport: EmployeeReport | null = null;

  // =====================================================
  // Backend Data
  // =====================================================

  summary: any = {};

  attendanceData: any = {};

  taskData: any = {};

  leaveData: any = {};

  expenseData: any = {};

  inventoryData: any = {};

  reports: EmployeeReport[] = [];

  // =====================================================
  // Charts
  // =====================================================

  attendanceChart?: Chart;

  expenseChart?: Chart;

  taskChart?: Chart;

  leaveChart?: Chart;

  // =====================================================
  // Filtered Reports
  // =====================================================

  get filteredReports(): EmployeeReport[] {

    return this.reports.filter(report => {

      return (

        this.selectedDepartment === '' ||

        report.department === this.selectedDepartment

      );

    });

  }

  // =====================================================
  // Lifecycle
  // =====================================================

  ngOnInit(): void {

    this.loadSummary();

    this.loadAttendanceReport();

    this.loadTaskReport();

    this.loadLeaveReport();

    this.loadExpenseReport();

    this.loadInventoryReport();

    this.loadEmployeeReport();

  }

  ngAfterViewInit(): void {

    // Charts will be created after
    // API data has loaded.

  }

  ngOnDestroy(): void {

    this.attendanceChart?.destroy();

    this.expenseChart?.destroy();

    this.taskChart?.destroy();

    this.leaveChart?.destroy();

  }

    // =====================================================
  // Dashboard Summary
  // =====================================================

  loadSummary(): void {

    this.reportService.getSummary().subscribe({

      next: (res: any) => {

        this.summary = res.data;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error('Summary Error:', err);

      }

    });

  }

  // =====================================================
  // Attendance Report
  // =====================================================

  loadAttendanceReport(): void {

    this.reportService.getAttendanceReport().subscribe({

      next: (res: any) => {

        this.attendanceData = res.data;

        this.cdr.detectChanges();

        setTimeout(() => {

          this.loadAttendanceChart();

        }, 0);

      },

      error: (err) => {

        console.error('Attendance Error:', err);

      }

    });

  }

  // =====================================================
  // Task Report
  // =====================================================

  loadTaskReport(): void {

    this.reportService.getTaskReport().subscribe({

      next: (res: any) => {

        this.taskData = res.data;

        this.cdr.detectChanges();

        setTimeout(() => {

          this.loadTaskChart();

        }, 0);

      },

      error: (err) => {

        console.error('Task Error:', err);

      }

    });

  }

  // =====================================================
  // Leave Report
  // =====================================================

  loadLeaveReport(): void {

    this.reportService.getLeaveReport().subscribe({

      next: (res: any) => {

        this.leaveData = res.data;

        this.cdr.detectChanges();

        setTimeout(() => {

          this.loadLeaveChart();

        }, 0);

      },

      error: (err) => {

        console.error('Leave Error:', err);

      }

    });

  }

  // =====================================================
  // Expense Report
  // =====================================================

  loadExpenseReport(): void {

    this.reportService.getExpenseReport().subscribe({

      next: (res: any) => {

        this.expenseData = res.data;

        this.cdr.detectChanges();

        setTimeout(() => {

          this.loadExpenseChart();

        }, 0);

      },

      error: (err) => {

        console.error('Expense Error:', err);

      }

    });

  }

  // =====================================================
  // Inventory Report
  // =====================================================

  loadInventoryReport(): void {

    this.reportService.getInventoryReport().subscribe({

      next: (res: any) => {

        this.inventoryData = res.data;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error('Inventory Error:', err);

      }

    });

  }

  // =====================================================
  // Employee Report
  // =====================================================

  loadEmployeeReport(): void {

    this.reportService.getEmployeeReport().subscribe({

      next: (res: any) => {

        this.reports = res.data.map((employee: any) => ({

          employee: employee.fullName,

          department: employee.department,

          
          attendance: employee.attendance,

          tasks: employee.tasks,

          expenses: employee.expenses,

          leaves: employee.leaves,

          performance: employee.performance

        }));

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error('Employee Report Error:', err);

      }

    });

  }

    // =====================================================
  // Attendance Chart
  // =====================================================

  loadAttendanceChart(): void {

    const canvas = document.getElementById(
      'attendanceChart'
    ) as HTMLCanvasElement;

    if (!canvas) return;

    this.attendanceChart?.destroy();

    this.attendanceChart = new Chart(canvas, {

      type: 'doughnut',

      data: {

        labels: [

          'Present',

          'Absent',

          'Half Day'

        ],

        datasets: [

          {

            data: [

              this.attendanceData?.present ?? 0,

              this.attendanceData?.absent ?? 0,

              this.attendanceData?.halfDay ?? 0

            ],

            backgroundColor: [

              '#16a34a',

              '#dc2626',

              '#f59e0b'

            ],

            borderWidth: 2,

            borderColor: '#fff'

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            position: 'bottom'

          }

        }

      }

    });

  }

  // =====================================================
  // Task Chart
  // =====================================================

  loadTaskChart(): void {

    const canvas = document.getElementById(
      'taskChart'
    ) as HTMLCanvasElement;

    if (!canvas) return;

    this.taskChart?.destroy();

    this.taskChart = new Chart(canvas, {

      type: 'bar',

      data: {

        labels: [

          'Completed',

          'In Progress',

          'Pending'

        ],

        datasets: [

          {

            label: 'Tasks',

            data: [

              this.taskData?.completed ?? 0,

              this.taskData?.inProgress ?? 0,

              this.taskData?.pending ?? 0

            ],

            backgroundColor: [

              '#16a34a',

              '#2563eb',

              '#f59e0b'

            ],

            borderRadius: 8

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            display: false

          }

        },

        scales: {

          y: {

            beginAtZero: true,

            ticks: {

              precision: 0

            }

          }

        }

      }

    });

  }

  // =====================================================
  // Leave Chart
  // =====================================================

  loadLeaveChart(): void {

    const canvas = document.getElementById(
      'leaveChart'
    ) as HTMLCanvasElement;

    if (!canvas) return;

    this.leaveChart?.destroy();

    this.leaveChart = new Chart(canvas, {

      type: 'pie',

      data: {

        labels: [

          'Casual',

          'Sick',

          'Earned'

        ],

        datasets: [

          {

            data: [

              this.leaveData?.leaveTypes?.casual ?? 0,

              this.leaveData?.leaveTypes?.sick ?? 0,

              this.leaveData?.leaveTypes?.earned ?? 0

            ],

            backgroundColor: [

              '#3b82f6',

              '#22c55e',

              '#f59e0b'

            ],

            borderWidth: 2,

            borderColor: '#fff'

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            position: 'bottom'

          }

        }

      }

    });

  }

  // =====================================================
  // Expense Chart
  // =====================================================

  loadExpenseChart(): void {

    const canvas = document.getElementById(
      'expenseChart'
    ) as HTMLCanvasElement;

    if (!canvas) return;

    this.expenseChart?.destroy();

    this.expenseChart = new Chart(canvas, {

      type: 'bar',

      data: {

        labels: [

          'Approved',

          'Pending',

          'Rejected'

        ],

        datasets: [

          {

            label: 'Amount (₹)',

            data: [

              this.expenseData?.approvedExpenses ?? 0,

              this.expenseData?.pendingExpenses ?? 0,

              this.expenseData?.rejectedExpenses ?? 0

            ],

            backgroundColor: [

              '#22c55e',

              '#f59e0b',

              '#ef4444'

            ],

            borderRadius: 8

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            display: false

          }

        },

        scales: {

          y: {

            beginAtZero: true,

            ticks: {

              callback(value) {

                return '₹' + value;

              }

            }

          }

        }

      }

    });

  }

    // =====================================================
  // View Report
  // =====================================================

  viewReport(report: EmployeeReport): void {

    this.selectedReport = { ...report };

    this.showViewModal = true;

  }

  // =====================================================
  // Close Modal
  // =====================================================

  closeViewModal(): void {

    this.selectedReport = null;

    this.showViewModal = false;

  }

  // =====================================================
  // Export PDF
  // =====================================================

  downloadPDF(report: EmployeeReport): void {

    console.log('PDF Export', report);

    alert(
      'PDF Export will be implemented in the next update.'
    );

  }

  // =====================================================
  // Export Excel
  // =====================================================

  downloadExcel(): void {

    console.log('Excel Export');

    alert(
      'Excel Export will be implemented in the next update.'
    );

  }

  // =====================================================
  // Print
  // =====================================================

  printReport(report: EmployeeReport): void {

    console.log('Print', report);

    window.print();

  }

  // =====================================================
  // Refresh
  // =====================================================

  refreshReports(): void {

    this.loadSummary();

    this.loadAttendanceReport();

    this.loadTaskReport();

    this.loadLeaveReport();

    this.loadExpenseReport();

    this.loadInventoryReport();

    this.loadEmployeeReport();

  }

  // =====================================================
  // Apply Filters
  // =====================================================

  applyFilters(): void {

    this.refreshReports();

  }

  // =====================================================
  // Reset Filters
  // =====================================================

  resetFilters(): void {

    this.selectedDepartment = '';

    this.selectedPeriod = 'today';

    this.refreshReports();

  }

  // =====================================================
  // Helper Getters
  // =====================================================

  get totalEmployees(): number {

    return this.summary?.totalEmployees ?? 0;

  }

  get presentToday(): number {

    return this.summary?.presentToday ?? 0;

  }

  get completedTasks(): number {

    return this.summary?.completedTasks ?? 0;

  }

  get totalExpenses(): number {

    return this.summary?.totalExpenses ?? 0;

  }

  get inventoryValue(): number {

    return this.summary?.totalInventoryValue ?? 0;

  }

  get totalAttendance(): number {

    return this.attendanceData?.present ?? 0;

  }

  get totalLeaves(): number {

    return this.leaveData?.total ?? 0;

  }

  get pendingTasks(): number {

    return this.taskData?.pending ?? 0;

  }

  get approvedExpenses(): number {

    return this.expenseData?.approvedExpenses ?? 0;

  }

  // =====================================================
  // Currency Formatter
  // =====================================================

  formatCurrency(value: number): string {

    return new Intl.NumberFormat(

      'en-IN',

      {

        style: 'currency',

        currency: 'INR',

        maximumFractionDigits: 0

      }

    ).format(value);

  }

}