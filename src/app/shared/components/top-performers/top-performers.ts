import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Performer } from '../../../models/performer.model';

@Component({
  selector: 'app-top-performers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-performers.html',
  styleUrl: './top-performers.scss'
})
export class TopPerformers {

  performers: Performer[] = [
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