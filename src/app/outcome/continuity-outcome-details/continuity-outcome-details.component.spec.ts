import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuityOutcomeDetailsComponent } from './continuity-outcome-details.component';

describe('ContinuityOutcomeDetailsComponent', () => {
  let component: ContinuityOutcomeDetailsComponent;
  let fixture: ComponentFixture<ContinuityOutcomeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuityOutcomeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuityOutcomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
