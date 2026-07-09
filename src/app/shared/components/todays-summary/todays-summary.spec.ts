import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysSummary } from './todays-summary';

describe('TodaysSummary', () => {
  let component: TodaysSummary;
  let fixture: ComponentFixture<TodaysSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
