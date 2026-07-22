import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { EmployeeSidebar } from '../../pages/employee/components/employee-sidebar/employee-sidebar';
import { EmployeeNavbar } from '../../pages/employee/components/employee-navbar/employee-navbar';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [
  CommonModule,
  RouterOutlet,
  EmployeeSidebar,
  EmployeeNavbar
],
  templateUrl: './employee-layout.html',
  styleUrl: './employee-layout.scss'
})
export class EmployeeLayoutComponent {

  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

}