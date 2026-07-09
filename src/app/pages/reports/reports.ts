import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import {
  Chart,
  DoughnutController,
  PieController,
  LineController,
  BarController,
  ArcElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

interface EmployeeReport {

  employee: string;

  department: string;

  attendance: number;

  tasks: number;

  expenses: number;

  leaves: number;

  performance: 'Excellent' | 'Good' | 'Average' | 'Poor';

}

Chart.register(
  DoughnutController,
  PieController,
  LineController,
  BarController,
  ArcElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

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
export class Reports implements AfterViewInit {
  // ==========================================
  // Filters
  // ==========================================

  selectedPeriod = 'today';

  selectedDepartment = '';

  // ==========================================
  // Modal Controls
  // ==========================================

  showViewModal = false;

  selectedReport: EmployeeReport | null = null;

  // ==========================================
  // Dummy Report Data
  // ==========================================

  reports: EmployeeReport[] = [

    {
      employee: 'Abhishek Singh',
      department: 'Electrical',
      attendance: 96,
      tasks: 45,
      expenses: 24500,
      leaves: 2,
      performance: 'Excellent'
    },

    {
      employee: 'Rohit Sharma',
      department: 'Civil',
      attendance: 91,
      tasks: 39,
      expenses: 18200,
      leaves: 4,
      performance: 'Good'
    },

    {
      employee: 'Sanjeev Kumar',
      department: 'Electrical',
      attendance: 88,
      tasks: 34,
      expenses: 12850,
      leaves: 5,
      performance: 'Average'
    },

    {
      employee: 'Pankaj Mehta',
      department: 'Mechanical',
      attendance: 76,
      tasks: 24,
      expenses: 9800,
      leaves: 8,
      performance: 'Poor'
    },

    {
      employee: 'Deepak Verma',
      department: 'Safety',
      attendance: 94,
      tasks: 42,
      expenses: 21400,
      leaves: 3,
      performance: 'Excellent'
    }

  ];

  // ==========================================
  // Filtered Reports
  // ==========================================

  get filteredReports(): EmployeeReport[] {

    return this.reports.filter(report => {

      const matchesDepartment =

        this.selectedDepartment === '' ||

        report.department === this.selectedDepartment;

      return matchesDepartment;

    });

  }

    // ==========================================
  // View Report
  // ==========================================

  viewReport(report: EmployeeReport): void {

    this.selectedReport = {
      ...report
    };

    this.showViewModal = true;

  }

  // ==========================================
  // Close View Modal
  // ==========================================

  closeViewModal(): void {

    this.showViewModal = false;

    this.selectedReport = null;

  }

  // ==========================================
  // Export PDF (Placeholder)
  // ==========================================

  downloadPDF(report: EmployeeReport): void {

    console.log(
      'Export PDF for:',
      report.employee
    );

    alert(
      'PDF Export functionality will be connected with the backend later.'
    );

  }

  // ==========================================
  // Print Report (Placeholder)
  // ==========================================

  printReport(report: EmployeeReport): void {

    console.log(
      'Print Report for:',
      report.employee
    );

    alert(
      'Print functionality will be connected with the backend later.'
    );

  }

   // ==========================================
// Initialize Charts
// ==========================================

ngAfterViewInit(): void {


  this.loadAttendanceChart();

  this.loadExpenseChart();

  this.loadTaskChart();

  this.loadLeaveChart();

}

// ==========================================
// Attendance Chart
// ==========================================

loadAttendanceChart(): void {

  const canvas = document.getElementById(
    'attendanceChart'
  ) as HTMLCanvasElement;

  if (!canvas) return;

  new Chart(canvas, {

    type: 'doughnut',

    data: {

      labels: [
        'Present',
        'Absent',
        'On Leave'
      ],

      datasets: [

        {

          data: [98, 12, 10],

          backgroundColor: [

            '#22c55e',

            '#ef4444',

            '#f59e0b'

          ],

          borderWidth: 2,

          borderColor: '#ffffff'

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

// ==========================================
// Expense Analysis Chart
// ==========================================

loadExpenseChart(): void {

  const canvas = document.getElementById(
    'expenseChart'
  ) as HTMLCanvasElement;

  if (!canvas) return;

  new Chart(canvas, {

    type: 'line',

    data: {

      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],

      datasets: [

        {

          label: 'Expenses (₹)',

          data: [
            12000,
            18500,
            15000,
            22000,
            18000,
            24500,
            21000,
            26000,
            23500,
            28000,
            25000,
            30000
          ],

          borderColor: '#2563eb',

          backgroundColor: 'rgba(37,99,235,0.15)',

          fill: true,

          tension: 0.4,

          pointRadius: 5,

          pointHoverRadius: 7

        }

      ]

    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      plugins: {

        legend: {

          display: true,

          position: 'bottom'

        }

      },

      scales: {

        y: {

          beginAtZero: true

        }

      }

    }

  });

}

// ==========================================
// Task Completion Chart
// ==========================================

loadTaskChart(): void {

  const canvas = document.getElementById(
    'taskChart'
  ) as HTMLCanvasElement;

  if (!canvas) return;

  new Chart(canvas, {

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
            245,
            52,
            18
          ],

          backgroundColor: [

            '#22c55e',

            '#3b82f6',

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
          suggestedMax: 300,

          ticks: {

            stepSize: 50

          }

        }

      }

    }

  });

}

// ==========================================
// Leave Statistics Chart
// ==========================================

loadLeaveChart(): void {

  const canvas = document.getElementById(
    'leaveChart'
  ) as HTMLCanvasElement;

  if (!canvas) return;

  new Chart(canvas, {

    type: 'pie',

    data: {

      labels: [
        'Casual',
        'Sick',
        'Earned',
        'Emergency'
      ],

      datasets: [

        {

          data: [
            42,
            18,
            27,
            8
          ],

          backgroundColor: [

            '#3b82f6',

            '#22c55e',

            '#f59e0b',

            '#ef4444'

          ],

          borderColor: '#ffffff',

          borderWidth: 2

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

}