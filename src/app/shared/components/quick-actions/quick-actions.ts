import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.scss'
})
export class QuickActions {

  actions = [
    {
      title: 'Add Expense',
      icon: 'payments'
    },
    {
      title: 'Apply Leave',
      icon: 'event_note'
    },
    {
      title: 'Add Task',
      icon: 'assignment_add'
    },
    {
      title: 'View Reports',
      icon: 'description'
    },
    {
      title: 'Advance Request',
      icon: 'account_balance_wallet'
    }
  ];

}