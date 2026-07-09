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

  searchText = '';
  selectedStatus = '';

  showForm = false;
  showViewModal = false;
  showDeleteModal = false;

  isEditMode = false;

  validationError = '';

  selectedAttendance: any = null;

  attendanceToDelete: any = null;

  attendanceList: any[] = [];

  employees: any[] = [];

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

  ngOnInit(): void {

  this.loadAttendance();

  this.loadEmployees();

}

  loadAttendance(): void {

    this.attendanceService.getAttendance().subscribe({

      next: (response: any) => {

        this.attendanceList = response.data;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  loadEmployees(): void {

  this.attendanceService.getEmployees().subscribe({

    next: (response: any) => {

      this.employees = response.data;

    },

    error: (error) => {

      console.error(error);

    }

  });

}

  get filteredAttendance(): any[] {

    return this.attendanceList.filter((record: any) => {

      const employeeName =
        record.employee?.fullName?.toLowerCase() || '';

      const employeeId =
        record.employeeId?.toLowerCase() || '';

      const matchesSearch =

        employeeName.includes(this.searchText.toLowerCase()) ||

        employeeId.includes(this.searchText.toLowerCase());

      const matchesStatus =

        this.selectedStatus === '' ||

        record.status === this.selectedStatus.toUpperCase();

      return matchesSearch && matchesStatus;

    });

  }

    // ===========================
  // Open Attendance Form
  // ===========================

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


  onEmployeeChange(): void {

  const employee = this.employees.find(
    (emp: any) => emp._id === this.newAttendance.employee
  );

  if (employee) {

    this.newAttendance.employeeId = employee.employeeId;

    this.newAttendance.email = employee.email;

  }

}
  // ===========================
  // Save Attendance
  // ===========================

  saveAttendance(): void {

    this.validationError = '';

    if (
      !this.newAttendance.employee ||
      !this.newAttendance.date ||
      !this.newAttendance.status
    ) {
      this.validationError = 'Please fill all required fields.';
      return;
    }

    if (this.isEditMode) {

      this.attendanceService.updateAttendance(
        this.newAttendance._id,
        this.newAttendance
      ).subscribe({

        next: () => {

          this.closeForm();

          this.loadAttendance();

        },

        error: (error) => {

          console.error(error);

        }

      });

    } else {

      this.attendanceService.createAttendance(
        this.newAttendance
      ).subscribe({

        next: () => {

          this.closeForm();

          this.loadAttendance();

        },

        error: (error) => {

          console.error(error);

        }

      });

    }

  }

  // ===========================
  // View Attendance
  // ===========================

  viewAttendance(attendance: any): void {

    this.selectedAttendance = { ...attendance };

    this.showViewModal = true;

  }

  closeViewModal(): void {

    this.showViewModal = false;

    this.selectedAttendance = null;

  }

  // ===========================
  // Edit Attendance
  // ===========================

  editAttendance(attendance: any): void {

    this.isEditMode = true;

    this.validationError = '';

    this.newAttendance = { ...attendance };

    this.showForm = true;

  }

  // ===========================
  // Delete Attendance
  // ===========================

  deleteAttendance(attendance: any): void {

    this.attendanceToDelete = attendance;

    this.selectedAttendance = attendance;

    this.showDeleteModal = true;

  }

  confirmDelete(): void {

    if (!this.attendanceToDelete) return;

    this.attendanceService.deleteAttendance(
      this.attendanceToDelete._id
    ).subscribe({

      next: () => {

        this.cancelDelete();

        this.loadAttendance();

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

  // ===========================
  // Close Attendance Form
  // ===========================

  closeForm(): void {

    this.showForm = false;

    this.validationError = '';

    this.isEditMode = false;

    this.newAttendance = {
      employee: '',
      employeeId: '',
      date: '',
      clockIn: '',
      clockOut: '',
      status: 'PRESENT',
      remarks: ''
    };

  }

}