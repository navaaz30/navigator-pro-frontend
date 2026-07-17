import { Routes } from '@angular/router';

import { AdminLayout } from './layouts/admin-layout/admin-layout';

import { Dashboard } from './pages/dashboard/dashboard';
import { Users } from './pages/users/users';
import { Tasks } from './pages/tasks/tasks';
import { Leave } from './pages/leave/leave';
import { Attendance } from './pages/attendance/attendance';
import { Inventory } from './pages/inventory/inventory';
import { Expenses } from './pages/expenses/expenses';
import { Reports } from './pages/reports/reports';
import { Settings } from './pages/settings/settings';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth.guard';

import { EmployeeLayoutComponent } from './layouts/employee-layout/employee-layout';

import { EmployeeDashboard } from './pages/employee/employee-dashboard/employee-dashboard';
import { EmployeeTasks } from './pages/employee/employee-tasks/employee-tasks';
import { EmployeeAttendance } from './pages/employee/employee-attendance/employee-attendance';
import { EmployeeLeave } from './pages/employee/employee-leave/employee-leave';
import { EmployeeExpenses } from './pages/employee/employee-expenses/employee-expenses';
import { EmployeeProfile } from './pages/employee/employee-profile/employee-profile';



export const routes: Routes = [

  // Login (without layout)
  {
    path: 'login',
    component: Login
  },

  // Dashboard Layout
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'tasks',
        component: Tasks
      },

      {
        path: 'attendance',
        component: Attendance
      },

      {
        path: 'expenses',
        component: Expenses
      },

      {
        path: 'inventory',
        component: Inventory
      },

      {
        path: 'leave',
        component: Leave
      },

      {
        path: 'reports',
        component: Reports
      },

      {
        path: 'users',
        component: Users
      },

      {
        path: 'settings',
        component: Settings
      }

    ]
  },

  {
  path: 'employee',
  component: EmployeeLayoutComponent,
  canActivate: [authGuard],
  children: [

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },

    {
      path: 'dashboard',
      component: EmployeeDashboard
    },

    {
      path: 'tasks',
      component: EmployeeTasks
    },

    {
      path: 'attendance',
      component: EmployeeAttendance
    },

    {
      path: 'leave',
      component: EmployeeLeave
    },

    {
      path: 'expenses',
      component: EmployeeExpenses
    },

    {
      path: 'profile',
      component: EmployeeProfile
    }

  ]
},
  
  {
    path: '**',
    redirectTo: 'login'
  }

];