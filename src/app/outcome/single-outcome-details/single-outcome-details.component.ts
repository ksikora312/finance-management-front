import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Categories, OutcomeOverview, UpdateOutcome } from 'src/app/dto/outcome-interface';
import { CategoryService } from 'src/app/services/category-service';
import { OutcomeService } from 'src/app/services/outcome-service';

@Component({
  selector: 'app-single-outcome-details',
  templateUrl: './single-outcome-details.component.html',
  styleUrls: ['./single-outcome-details.component.scss'],
  providers: [ConfirmationService],
})
export class SingleOutcomeDetailsComponent implements OnInit {

  @Input()
  outcome: OutcomeOverview = {} as OutcomeOverview;

  availableCategories: Categories = {
    categories: []
  };
  
  showUpdateOutcomeDialog = false;
  showConfirmDialog = false;
  update: UpdateOutcome = {} as UpdateOutcome;

  constructor(private categoryService: CategoryService, private outcomeService: OutcomeService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(r => {
      this.availableCategories = r;
    });
  }

  openEditOutcomeDialog() {
    this.update = {
      id: this.outcome.id,
      name: this.outcome.name,
      value: this.outcome.value,
      date: '',
      categoryId: this.availableCategories.categories.find(c => c.name === this.outcome.category)!.id,
    }
    this.showUpdateOutcomeDialog = true;
  }

  updateOutcome() {
    this.outcomeService.updateOutcome(this.update).subscribe(r => window.location.reload());
  }

  confirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete outcome with name: ' + this.outcome.name + '?',
      accept: () => {
      }
    });
  }
}
