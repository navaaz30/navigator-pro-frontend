import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


import { AttendanceService } from '../../services/attendance.service';

interface AttendanceRecord {
  _id?: string;
  employee: any;
  employeeId?: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: string;
  remarks?: string;
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './attendance.html',
  styleUrl: './attendance.scss'
})
export class Attendance implements OnInit {

  constructor(
    private attendanceService: AttendanceService,
    private cdr: ChangeDetectorRef
  ) {}

  // ==========================================
  // Search & Filters
  // ==========================================

  searchText = '';

  selectedStatus = '';

  selectedDateFilter = 'TODAY';

  selectedDate = '';

  // ==========================================
  // Popup Controls
  // ==========================================

  showForm = false;

  showViewModal = false;

  showDeleteModal = false;

  isEditMode = false;

  validationError = '';

  // ==========================================
  // Selected Records
  // ==========================================

  selectedAttendance: any = null;

  attendanceToDelete: any = null;

  // ==========================================
  // Data
  // ==========================================

  attendanceList: any[] = [];

  employees: any[] = [];

  // ==========================================
  // Form Model
  // ==========================================

  newAttendance: any = {
    employee: '',
    employeeId: '',
    date: '',
    clockIn: '',
    clockOut: '',
    status: 'PRESENT',
    remarks: '',
    email: ''
  };

  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    // Backend defaults to today's attendance
    this.loadAttendance();

    this.loadStaff();

  }

  // ==========================================
  // Load Attendance
  // ==========================================

  loadAttendance(date?: string): void {

    this.attendanceService
      .getAttendance(date)
      .subscribe({

        next: (response: any) => {

          this.attendanceList = response.data || [];

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  // ==========================================
  // Refresh Attendance
  // Keeps selected date after CRUD operations
  // ==========================================

  private refreshAttendance(): void {

    if (this.selectedDateFilter === 'TODAY') {

      this.loadAttendance();

    }

    else if (this.selectedDateFilter === 'YESTERDAY') {

      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);

      this.loadAttendance(
        yesterday.toISOString().split('T')[0]
      );

    }

    else if (
      this.selectedDateFilter === 'CUSTOM' &&
      this.selectedDate
    ) {

      this.loadAttendance(this.selectedDate);

    }

  }

  // ==========================================
  // Date Filter
  // ==========================================

  onDateFilterChange(): void {

    if (this.selectedDateFilter === 'TODAY') {

      this.selectedDate = '';

      this.loadAttendance();

    }

    else if (this.selectedDateFilter === 'YESTERDAY') {

      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);

      this.loadAttendance(
        yesterday.toISOString().split('T')[0]
      );

    }

  }

  // ==========================================
  // Custom Date
  // ==========================================

  onCustomDateChange(): void {

    if (this.selectedDate) {

      this.loadAttendance(this.selectedDate);

    }

  }

  // ==========================================
  // Load Employees
  // ==========================================

    loadStaff(): void {

  this.attendanceService.getStaff().subscribe({

      next: (response: any) => {

        this.employees = response.data || [];

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // ==========================================
  // Attendance Table Filter
  // ==========================================

  get filteredAttendance(): any[] {

    return this.attendanceList.filter((record: any) => {

      const employeeName =
        record.employee?.fullName?.toLowerCase() || '';

      const employeeId =
        record.employee?.employeeId?.toLowerCase() || '';

      const status =
        record.status?.toLowerCase() || '';

      const matchesSearch =

        employeeName.includes(this.searchText.toLowerCase()) ||

        employeeId.includes(this.searchText.toLowerCase()) ||

        status.includes(this.searchText.toLowerCase());

      const matchesStatus =

        this.selectedStatus === '' ||

        record.status === this.selectedStatus.toUpperCase();

      return matchesSearch && matchesStatus;

    });

  }

  // ==========================================
  // Open Attendance Form
  // ==========================================

  openAttendanceForm(): void {

    this.isEditMode = false;

    this.validationError = '';

    this.newAttendance = {

      employee: '',

      employeeId: '',

      email: '',

      date: '',

      clockIn: '',

      clockOut: '',

      status: 'PRESENT',

      remarks: ''

    };

    this.showForm = true;

  }

  // ==========================================
  // Employee Selection
  // ==========================================

  onEmployeeChange(): void {

    const employee = this.employees.find(

      (emp: any) => emp._id === this.newAttendance.employee

    );

    if (employee) {

      this.newAttendance.employeeId = employee.employeeId;

      this.newAttendance.email = employee.email;

    }

  }

  // ==========================================
  // Save Attendance
  // ==========================================

  saveAttendance(): void {

    this.validationError = '';

    if (

      !this.newAttendance.employee ||

      !this.newAttendance.date ||

      !this.newAttendance.status

    ) {

      this.validationError =

        'Please fill all required fields.';

      return;

    }

    const attendanceDate =

      new Date(this.newAttendance.date);

    const clockIn =

      new Date(attendanceDate);

    const clockOut =

      new Date(attendanceDate);

    if (this.newAttendance.clockIn) {

      const [hour, minute] =

        this.newAttendance.clockIn.split(':');

      clockIn.setHours(

        +hour,

        +minute,

        0,

        0

      );

    }

    if (this.newAttendance.clockOut) {

      const [hour, minute] =

        this.newAttendance.clockOut.split(':');

      clockOut.setHours(

        +hour,

        +minute,

        0,

        0

      );

    }

    const attendancePayload = {

      ...this.newAttendance,

      date: attendanceDate,

      clockIn,

      clockOut

    };

    if (this.isEditMode) {

      this.attendanceService

        .updateAttendance(

          this.newAttendance._id,

          attendancePayload

        )

        .subscribe({

          next: () => {

            this.closeForm();

            this.refreshAttendance();

          },

          error: (error) => {

            console.error(error);

          }

        });

    }

    else {

      this.attendanceService

        .createAttendance(

          attendancePayload

        )

        .subscribe({

          next: () => {

            this.closeForm();

            this.refreshAttendance();

          },

          error: (error) => {

            console.error(error);

          }

        });

    }

  }

  // ==========================================
  // View Attendance
  // ==========================================

    viewAttendance(attendance: any): void {

    this.selectedAttendance = { ...attendance };

    this.showViewModal = true;

  }

  closeViewModal(): void {

    this.showViewModal = false;

    this.selectedAttendance = null;

  }

  // ==========================================
  // Edit Attendance
  // ==========================================

  editAttendance(attendance: any): void {

    this.isEditMode = true;

    this.validationError = '';

    const clockIn = attendance.clockIn
      ? new Date(attendance.clockIn)
      : null;

    const clockOut = attendance.clockOut
      ? new Date(attendance.clockOut)
      : null;

    const attendanceDate = attendance.date
      ? new Date(attendance.date)
      : null;

    this.newAttendance = {

      ...attendance,

      employee:
        attendance.employee?._id ||
        attendance.employee,

      employeeId:
        attendance.employee?.employeeId ||
        attendance.employeeId,

      email:
        attendance.employee?.email ||
        attendance.email,

      date: attendanceDate
  ? `${attendanceDate.getFullYear()}-${String(attendanceDate.getMonth() + 1).padStart(2, '0')}-${String(attendanceDate.getDate()).padStart(2, '0')}`
  : '',

      clockIn: clockIn
        ? clockIn
            .toTimeString()
            .slice(0, 5)
        : '',

      clockOut: clockOut
        ? clockOut
            .toTimeString()
            .slice(0, 5)
        : ''

    };

    this.showForm = true;

  }

  // ==========================================
  // Delete Attendance
  // ==========================================

  deleteAttendance(attendance: any): void {

    this.attendanceToDelete = attendance;

    this.selectedAttendance = attendance;

    this.showDeleteModal = true;

  }

  confirmDelete(): void {

    if (!this.attendanceToDelete) {

      return;

    }

    this.attendanceService
      .deleteAttendance(
        this.attendanceToDelete._id
      )
      .subscribe({

        next: () => {

          this.cancelDelete();

          this.refreshAttendance();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  cancelDelete(): void {

    this.showDeleteModal = false;

    this.attendanceToDelete = null;

    this.selectedAttendance = null;

  }

  // ==========================================
  // Close Attendance Form
  // ==========================================

  closeForm(): void {

    this.showForm = false;

    this.validationError = '';

    this.isEditMode = false;

    this.newAttendance = {

      employee: '',

      employeeId: '',

      email: '',

      date: '',

      clockIn: '',

      clockOut: '',

      status: 'PRESENT',

      remarks: ''

    };

  }

}