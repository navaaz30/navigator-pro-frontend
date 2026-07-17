import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { EmployeeSidebar } from '../../pages/employee/components/employee-sidebar/employee-sidebar';
import { EmployeeNavbar } from '../../pages/employee/components/employee-navbar/employee-navbar';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    EmployeeSidebar,
    EmployeeNavbar
  ],
  templateUrl: './employee-layout.html',
  styleUrl: './employee-layout.scss'
})
export class EmployeeLayoutComponent {}