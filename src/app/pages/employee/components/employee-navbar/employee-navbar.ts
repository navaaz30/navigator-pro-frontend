import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-employee-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './employee-navbar.html',
  styleUrl: './employee-navbar.scss'
})
export class EmployeeNavbar implements OnInit {

  currentUser: any = null;

  greeting = '';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser();

    this.setGreeting();

  }

  private setGreeting(): void {

    const hour = new Date().getHours();

    if (hour < 12) {

      this.greeting = 'Good Morning';

    } else if (hour < 17) {

      this.greeting = 'Good Afternoon';

    } else {

      this.greeting = 'Good Evening';

    }

  }

}