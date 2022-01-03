import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Categories, ContinuityOutcomeDetails, OutcomeOverview, Page, UpdateContinuityOutcome, UpdateOutcome } from 'src/app/dto/outcome-interface';
import { CategoryService } from 'src/app/services/category-service';
import { OutcomeService } from 'src/app/services/outcome-service';

@Component({
  selector: 'app-continuity-outcome-details',
  templateUrl: './continuity-outcome-details.component.html',
  styleUrls: ['./continuity-outcome-details.component.scss'],
  providers: [ConfirmationService],
})
export class ContinuityOutcomeDetailsComponent implements OnInit {

  @Input()
  id: number = {} as number;

  first = 0;
  rows = 10;

  details: ContinuityOutcomeDetails = {} as ContinuityOutcomeDetails;
  outcomes: Page<OutcomeOverview> = {} as Page<OutcomeOverview>;

  availableCategories: Categories = {
    categories: []
  };

  showUpdateOutcomeDialog = false;
  showUpdateSingleOutcomeDialog = false;

  update: UpdateContinuityOutcome = {} as UpdateContinuityOutcome;
  updateSingle: UpdateOutcome = {} as UpdateOutcome;

  showOutcomes = false;

  constructor(private outcomeService: OutcomeService, private categoryService: CategoryService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.outcomeService.getContinuityOutcomeDetails(this.id).subscribe(r => this.details = r);

    this.categoryService.getCategories().subscribe(r => {
      this.availableCategories = r;
    });
  }

  loadOutcomes() {
    this.outcomeService.getOutcomesByContinuityOutcome(this.id, 0, 10).subscribe(r => {
      this.outcomes = r;
      this.showOutcomes = true;
    })
  }

  load(event: LazyLoadEvent) {
    const pageNumber = event.first! / event.rows!;
    const pageSize = event.rows!;
    this.outcomeService.getOutcomesByContinuityOutcome(this.id, pageNumber, pageSize).subscribe(r => this.outcomes = r);
  }

  confirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete continuity outcome with name: ' + this.details.name + '?',
      accept: () => {
      }
    });
  }

  openEditOutcomeDialog() {
    this.update = {
      id: this.details.id,
      name: this.details.name,
      value: this.details.value,
      timeIntervalInDays: this.details.timeIntervalInDays,
      categoryId: this.availableCategories.categories.find(c => c.name === this.details.category)!.id,
    }
    this.showUpdateOutcomeDialog = true;
  }

  updateOutcome() {
    this.outcomeService.updateContinuityOUtcome(this.update).subscribe(r => window.location.reload());
  }

  openEditSingleOutcomeDialog(outcome: OutcomeOverview) {
    this.updateSingle = {
      id: outcome.id,
      name: outcome.name,
      value: outcome.value,
      date: outcome.date,
      categoryId: this.availableCategories.categories.find(c => c.name === this.details.category)!.id,
    };
    this.showUpdateSingleOutcomeDialog = true;
  }

  updateSingleOutcome() {
    this.outcomeService.updateOutcome(this.updateSingle).subscribe(r => window.location.reload());
  }

  confirmSingleDialog(outcome: OutcomeOverview) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete outcome with name: ' + outcome.name + '?',
      accept: () => {
      }
    });
  }

}
