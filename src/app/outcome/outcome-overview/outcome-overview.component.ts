import { Component, OnInit } from '@angular/core';
import { Categories, Category, NewContinuityOutcome, NewRegularOutcome } from 'src/app/dto/outcome-interface';
import { CategoryService } from 'src/app/services/category-service';
import { OutcomeService } from 'src/app/services/outcome-service';

export enum OutcomeType {
  REGULAR_OUTCOME,
  CONTINUITY_OUTCOME,
  SHOPPING_LIST_OUTCOME
}

interface Outcome {
  type: OutcomeType;
  name: string;
}

@Component({
  selector: 'app-outcome-overview',
  templateUrl: './outcome-overview.component.html',
  styleUrls: ['./outcome-overview.component.scss']
})
export class OutcomeOverviewComponent implements OnInit {

  showNewOutcomeDialog = false;
  showNewCategoryDialog = false;
  regularOutcome = true;
  continuityOutcome = false;
  selectedOutcome: Outcome;
  outcomeTypeEnum: typeof OutcomeType = OutcomeType;
  options: Outcome[];
  
  availableCategories: Categories = {
    categories: []
  };
  
  newRegularOutcome = {} as NewRegularOutcome;
  newContinuityOutcome = {} as NewContinuityOutcome;
  newCategory: string = '';

  constructor(private outcomeService: OutcomeService, private categoryService: CategoryService) { 
    this.options = [
      { type: OutcomeType.REGULAR_OUTCOME, name: "Regular" },
      { type: OutcomeType.CONTINUITY_OUTCOME, name: 'Continuity' }
    ];
    this.selectedOutcome = this.options[0];
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(r => {
      this.availableCategories = r;
    })
  }

  openNewOutcomeDialog() {
    this.showNewOutcomeDialog = true;
  }

  openNewCategoryDialog() {
    this.showNewCategoryDialog = true;
  }

  createNewRegularOutcome() {
    this.outcomeService.addRegularOutcome(this.newRegularOutcome).subscribe(r => this.showNewOutcomeDialog = false);
  }

  createNewContinuityOutcome() {
    this.newContinuityOutcome.createOutcome = this.newContinuityOutcome.createOutcome? true: false;
    this.outcomeService.addContinuityOutcome(this.newContinuityOutcome).subscribe(r => this.showNewOutcomeDialog = false);
  }

  createNewCategory() {
    this.categoryService.addCategory(this.newCategory).subscribe(r => {
      this.ngOnInit();
      this.showNewCategoryDialog = false;
    });
  }
}
