import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListOutcomesOverviewComponent } from './shopping-list-outcomes-overview.component';

describe('ShoppingListOutcomesOverviewComponent', () => {
  let component: ShoppingListOutcomesOverviewComponent;
  let fixture: ComponentFixture<ShoppingListOutcomesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListOutcomesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListOutcomesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
