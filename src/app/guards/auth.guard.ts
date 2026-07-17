import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  const user = localStorage.getItem('user');

  if (!token || !user) {

    router.navigate(['/login']);

    return false;

  }

  const currentUser = JSON.parse(user);

  const role = currentUser.role;

  const url = state.url;

  // ==========================================
  // Employee Routes
  // ==========================================

  if (url.startsWith('/employee')) {

    if (role === 'EMPLOYEE') {

      return true;

    }

    router.navigate(['/dashboard']);

    return false;

  }

  // ==========================================
  // Admin Routes
  // ==========================================

  if (

    role === 'ADMIN' ||

    role === 'MANAGER'

  ) {

    return true;

  }

  router.navigate(['/employee/dashboard']);

  return false;

};