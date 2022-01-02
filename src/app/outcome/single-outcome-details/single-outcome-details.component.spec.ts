import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOutcomeDetailsComponent } from './single-outcome-details.component';

describe('SingleOutcomeDetailsComponent', () => {
  let component: SingleOutcomeDetailsComponent;
  let fixture: ComponentFixture<SingleOutcomeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleOutcomeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOutcomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
