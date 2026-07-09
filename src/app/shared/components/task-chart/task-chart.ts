import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-task-chart',
  standalone: true,
  templateUrl: './task-chart.html',
  styleUrl: './task-chart.scss'
})
export class TaskChart implements AfterViewInit {

  ngAfterViewInit(): void {

    new Chart('taskChart', {

      type: 'doughnut',

      data: {
        labels: ['Completed', 'In Progress', 'Pending', 'Overdue'],
        datasets: [{
          data: [65, 20, 10, 5],
          backgroundColor: [
            '#4CAF50',
            '#2196F3',
            '#FFC107',
            '#F44336'
          ]
        }]
      },

      options: {
        responsive: true,
        plugins: {
  legend: {
    display: true,
    position: 'right'
  }
}
      }

    });

  }

}