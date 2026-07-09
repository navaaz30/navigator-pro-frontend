import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './expense-chart.html',
  styleUrl: './expense-chart.scss'
})
export class ExpenseChart {

  lineChartData = {
    labels: ['20 May', '21 May', '22 May', '23 May', '24 May', '25 May', '26 May'],
    datasets: [
      {
        data: [3000, 6000, 8000, 7000, 7000, 14000, 12000],
        label: 'Expenses',
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25,118,210,.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
};
}