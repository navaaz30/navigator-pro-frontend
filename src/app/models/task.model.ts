export interface Task {

  _id?: string;

  assignedTo: string;

  assignedBy?: string;

  title: string;

  description: string;

  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';

  dueDate: string;

  remarks?: string;

  createdAt?: string;

  updatedAt?: string;

}