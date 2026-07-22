import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule
  ],
  templateUrl: './employee-sidebar.html',
  styleUrl: './employee-sidebar.scss'
})
export class EmployeeSidebar {

  @Input() isOpen = false;

  @Output() closeSidebar = new EventEmitter<void>();

  close(): void {
    this.closeSidebar.emit();
  }

}