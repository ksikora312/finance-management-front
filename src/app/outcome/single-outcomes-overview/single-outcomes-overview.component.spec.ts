import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOutcomesOverviewComponent } from './single-outcomes-overview.component';

describe('SingleOutcomesOverviewComponent', () => {
  let component: SingleOutcomesOverviewComponent;
  let fixture: ComponentFixture<SingleOutcomesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleOutcomesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOutcomesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
