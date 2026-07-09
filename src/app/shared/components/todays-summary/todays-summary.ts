import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Summary } from '../../../models/summary.model';

@Component({
  selector: 'app-todays-summary',
  imports: [
  CommonModule,
  MatIconModule
  ],
  templateUrl: './todays-summary.html',
  styleUrl: './todays-summary.scss',
})
export class TodaysSummary {

  summary: Summary[] = [
  {
    icon: 'groups',
    title: 'Attendance Present',
    value: 98
  },
  {
    icon: 'task_alt',
    title: 'Tasks Completed',
    value: 32
  },
  {
    icon: 'event_note',
    title: 'Leave Applied',
    value: 3
  },
  {
    icon: 'payments',
    title: 'Advance Requested',
    value: 2
  },
  {
    icon: 'inventory_2',
    title: 'Inventory Alerts',
    value: 7
  },
  {
    icon: 'schedule',
    title: 'Late Check-ins',
    value: 4
  }
];

}
