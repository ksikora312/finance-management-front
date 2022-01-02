import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Categories, OutcomeOverview, OverviewType, Page } from 'src/app/dto/outcome-interface';
import { CategoryService } from 'src/app/services/category-service';
import { OutcomeService } from 'src/app/services/outcome-service';
import * as moment from 'moment';

@Component({
  selector: 'app-single-outcomes-overview',
  templateUrl: './single-outcomes-overview.component.html',
  styleUrls: ['./single-outcomes-overview.component.scss']
})
export class SingleOutcomesOverviewComponent implements OnInit {

  first = 0;
  rows = 10;
  
  availableCategories: Categories = {
    categories: []
  };

  availableTypes = [
    {name: OverviewType[OverviewType.ALL.valueOf()], type: OverviewType.ALL}, 
    {name: OverviewType[OverviewType.REGULAR_SINGLE_OUTCOME.valueOf()], type: OverviewType.REGULAR_SINGLE_OUTCOME},
    {name: OverviewType[OverviewType.CONTINUITY_SINGLE_OUTCOME.valueOf()], type: OverviewType.CONTINUITY_SINGLE_OUTCOME},
    {name: OverviewType[OverviewType.SHOPPING_LIST_SINGLE_OUTCOME.valueOf()], type: OverviewType.SHOPPING_LIST_SINGLE_OUTCOME}];

  defaultStartDate: string = this.defaultStartDateString();
  filterOverviewType: OverviewType = OverviewType.ALL;
  filterCategoryId?: number = undefined;
  filterStartDate?: string = undefined;
  filterEndDate?: string = undefined;

  outcomes: Page<OutcomeOverview> = {} as Page<OutcomeOverview>;
  constructor(private outcomeService: OutcomeService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.outcomeService.getOverview(this.filterOverviewType, 0, 10, this.filterStartDate, this.filterEndDate, this.filterCategoryId).subscribe(r => {
      this.outcomes = r;
      this.first = 0;
    });
    this.categoryService.getCategories().subscribe(r => {
      this.availableCategories = r;
    });
  }

  applyFilters() {
    this.ngOnInit();
  }

  paginate(event: any) {
    this.first = event.first;
  }

  load(event: LazyLoadEvent) {
    const pageNumber = event.first!/event.rows!;
    const pageSize = event.rows!;
    this.outcomeService.getOverview(this.filterOverviewType, pageNumber, pageSize, 
      this.filterStartDate, this.filterEndDate, this.filterCategoryId)
      .subscribe(r => this.outcomes = r);
  }

  private defaultStartDateString(): string {
    const now = new Date();
    let mom = moment(now).subtract(1, 'months').format('DD.MM.YYYY');
    return mom;
  }
}
