import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskChart } from './task-chart';

describe('TaskChart', () => {
  let component: TaskChart;
  let fixture: ComponentFixture<TaskChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
