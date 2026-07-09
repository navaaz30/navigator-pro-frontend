export interface Task{
    id:string;
    technician:string;
    client:string;
    status:'Pending' | 'Ongoing' | 'Completed' | 'Overdue';
    priority:'High' | 'Medium' | 'Low';
    dueDate:string;
}