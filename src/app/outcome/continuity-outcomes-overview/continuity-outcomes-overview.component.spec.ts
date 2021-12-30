import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuityOutcomesOverviewComponent } from './continuity-outcomes-overview.component';

describe('ContinuityOutcomesOverviewComponent', () => {
  let component: ContinuityOutcomesOverviewComponent;
  let fixture: ComponentFixture<ContinuityOutcomesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuityOutcomesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuityOutcomesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
