import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activity } from '../../../models/activity.model';

@Component({
  selector: 'app-activity-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-table.html',
  styleUrl: './activity-table.scss'
})
export class ActivityTable {

  activities: Activity[] = [
    {
      activity: 'Expense Submitted',
      employee: 'Abhishek Singh',
      type: 'Expense',
      status: 'Pending',
      time: '10:30 AM'
    },
    {
      activity: 'Task Completed',
      employee: 'Sanjeev Kumar',
      type: 'Task',
      status: 'Completed',
      time: '09:15 AM'
    },
    {
      activity: 'Leave Applied',
      employee: 'Ramesh Yadav',
      type: 'Leave',
      status: 'Pending',
      time: '11:45 AM'
    },
    {
      activity: 'Inventory Updated',
      employee: 'Rohit Sharma',
      type: 'Inventory',
      status: 'Completed',
      time: '02:20 PM'
    }
  ];

}