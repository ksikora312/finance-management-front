import { Component, OnChanges, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { OutcomeOverview, OverviewType, Page } from 'src/app/dto/outcome-interface';
import { OutcomeService } from 'src/app/services/outcome-service';

@Component({
  selector: 'app-single-outcomes-overview',
  templateUrl: './single-outcomes-overview.component.html',
  styleUrls: ['./single-outcomes-overview.component.scss']
})
export class SingleOutcomesOverviewComponent implements OnInit, OnChanges {

  first = 0;
  rows = 10;

  outcomes: Page<OutcomeOverview> = {} as Page<OutcomeOverview>;
  constructor(private outcomeService: OutcomeService) { }

  ngOnInit(): void {
    this.outcomeService.getOverview(OverviewType.ALL, 0, 10).subscribe(r => {
      console.log(r);
      this.outcomes = r;
      this.first = 0;
    });
  }

  ngOnChanges() {

  }

  next() {
    this.first = this.first + 1;
  }

  prev() {
    this.first = this.first - 1;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.outcomes ? this.outcomes.last : true;
  }

  isFirstPage(): boolean {
    return this.outcomes ? this.first === 0 : true;
  }

  paginate(event: any) {
    this.first = event.first;
  }

  load(event: LazyLoadEvent) {
    const pageNumber = event.first!/event.rows!;
    const pageSize = event.rows!;
    this.outcomeService.getOverview(OverviewType.ALL, pageNumber, pageSize).subscribe(r => this.outcomes = r);
  }

}
