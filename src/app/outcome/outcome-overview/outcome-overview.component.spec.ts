import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeOverviewComponent } from './outcome-overview.component';

describe('OutcomeOverviewComponent', () => {
  let component: OutcomeOverviewComponent;
  let fixture: ComponentFixture<OutcomeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
