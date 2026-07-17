import {
  Component,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';

import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-task-chart',
  standalone: true,
  templateUrl: './task-chart.html',
  styleUrl: './task-chart.scss'
})
export class TaskChart implements AfterViewInit, OnChanges {

  @Input() pending = 0;
  @Input() inProgress = 0;
  @Input() completed = 0;
  @Input() cancelled = 0;

  private chart!: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.chart) {

      this.chart.data.datasets[0].data = [
        this.completed,
        this.inProgress,
        this.pending,
        this.cancelled
      ];

      this.chart.update();

    }

  }

  private createChart(): void {

    this.chart = new Chart('taskChart', {

      type: 'doughnut',

      data: {

        labels: [
          'Completed',
          'In Progress',
          'Pending',
          'Cancelled'
        ],

        datasets: [

          {

            data: [
              this.completed,
              this.inProgress,
              this.pending,
              this.cancelled
            ],

            backgroundColor: [
              '#22c55e',
              '#3b82f6',
              '#f59e0b',
              '#ef4444'
            ],

            borderWidth: 0

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            position: 'right'

          }

        }

      }

    });

  }

}