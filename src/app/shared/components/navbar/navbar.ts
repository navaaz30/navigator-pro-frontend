import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

  @Output() menuToggle = new EventEmitter<void>();

  currentUser: any = null;

  greeting = '';

  constructor(
    private router: Router,
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

  toggleMenu(): void {

    this.menuToggle.emit();

  }

  openSettings(): void {

    this.router.navigate(['/settings']);

  }

}