import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

import { EmployeeAttendanceService } from '../../../services/employee-attendance.service';

@Component({
  selector: 'app-employee-attendance',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './employee-attendance.html',
  styleUrl: './employee-attendance.scss'
})
export class EmployeeAttendance implements OnInit {

  constructor(
  private attendanceService: EmployeeAttendanceService,
  private cdr: ChangeDetectorRef
) {}

  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;

  // ==========================================
  // Summary
  // ==========================================

  summary: any = {
    present: 0,
    absent: 0,
    halfDay: 0,
    totalWorkingHours: 0,
    attendancePercentage: 0
  };

  // ==========================================
  // Attendance
  // ==========================================

  attendanceList: any[] = [];

  todayAttendance: any = null;

  // ==========================================
  // Buttons
  // ==========================================

  canClockIn = true;

  canClockOut = false;

  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.loadAttendance();

  }

  // ==========================================
  // Load Attendance
  // ==========================================

  loadAttendance(): void {

    this.isLoading = true;

    this.attendanceService
      .getAttendance()
      .subscribe({

        next: (response: any) => {

          this.summary =
            response.data.summary;

            if (this.summary?.totalWorkingHours != null) {
  this.summary.totalWorkingHours = Number(
    this.summary.totalWorkingHours.toFixed(2)
  );
}

          this.attendanceList =
            response.data.attendance || [];

          this.setTodayAttendance();

this.cdr.detectChanges();

this.isLoading = false;

        },

        error: (error) => {

          console.error(error);

          this.isLoading = false;

        }

      });

  }

  // ==========================================
  // Today's Attendance
  // ==========================================

  setTodayAttendance(): void {

  const today = new Date();

  this.todayAttendance = this.attendanceList.find((attendance: any) => {

    const clockIn = attendance.clockIn
      ? new Date(attendance.clockIn)
      : null;

    if (!clockIn) {
      return false;
    }

    return (
      clockIn.getDate() === today.getDate() &&
      clockIn.getMonth() === today.getMonth() &&
      clockIn.getFullYear() === today.getFullYear()
    );

  }) || null;

  if (!this.todayAttendance) {

    this.canClockIn = true;
    this.canClockOut = false;
    return;

  }

  if (this.todayAttendance.clockIn && !this.todayAttendance.clockOut) {

    this.canClockIn = false;
    this.canClockOut = true;
    return;

  }

  if (this.todayAttendance.clockIn && this.todayAttendance.clockOut) {

    this.canClockIn = false;
    this.canClockOut = false;
    return;

  }

}

  // ==========================================
  // Clock In
  // ==========================================

  clockIn(): void {

    if (!this.canClockIn) {

      return;

    }

    this.attendanceService
      .clockIn()
      .subscribe({

        next: () => {

          this.loadAttendance();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  // ==========================================
  // Clock Out
  // ==========================================

  clockOut(): void {

    if (!this.canClockOut) {

      return;

    }

    this.attendanceService
      .clockOut()
      .subscribe({

        next: () => {

          this.loadAttendance();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  // ==========================================
  // Helpers
  // ==========================================

  formatDate(date: string): string {

    return new Date(date)
      .toLocaleDateString();

  }

  formatTime(time: string): string {

    if (!time) {

      return '--';

    }

    return new Date(time)
      .toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

  }

}