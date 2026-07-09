import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
  return this.http.get('http://localhost:5000/api/dashboard');
}

  getSummary() {
    return [
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

  getQuickActions() {
    return [
      { title: 'Add Expense', icon: 'payments' },
      { title: 'Apply Leave', icon: 'event_note' },
      { title: 'Add Task', icon: 'assignment_add' },
      { title: 'View Reports', icon: 'description' },
      { title: 'Advance Request', icon: 'account_balance_wallet' }
    ];
  }

  getPerformers() {
    return [
      {
        name: 'Abhishek Singh',
        image: 'https://i.pravatar.cc/40?img=1',
        score: 98
      },
      {
        name: 'Sanjeev Kumar',
        image: 'https://i.pravatar.cc/40?img=2',
        score: 92
      },
      {
        name: 'Ramesh Yadav',
        image: 'https://i.pravatar.cc/40?img=3',
        score: 88
      },
      {
        name: 'Rohit Sharma',
        image: 'https://i.pravatar.cc/40?img=4',
        score: 85
      },
      {
        name: 'Pankaj Mehta',
        image: 'https://i.pravatar.cc/40?img=5',
        score: 82
      }
    ];
  }

  getActivities() {
    return [
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

}