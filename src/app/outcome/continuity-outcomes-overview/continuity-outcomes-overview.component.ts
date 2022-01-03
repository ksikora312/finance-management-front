import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { OutcomeOverview, OverviewType, Page, UpdateContinuityOutcome } from 'src/app/dto/outcome-interface';
import { OutcomeService } from 'src/app/services/outcome-service';

@Component({
  selector: 'app-continuity-outcomes-overview',
  templateUrl: './continuity-outcomes-overview.component.html',
  styleUrls: ['./continuity-outcomes-overview.component.scss']
})
export class ContinuityOutcomesOverviewComponent implements OnInit {

  first = 0;
  rows = 10;

  continuityOutcomes: Page<OutcomeOverview> = {} as Page<OutcomeOverview>;

  update: UpdateContinuityOutcome = {} as UpdateContinuityOutcome;
  showEditOutcomeDialog = false;

  constructor(private outcomeService: OutcomeService) { }

  ngOnInit(): void {
    this.outcomeService.getOverview(OverviewType.CONTINUITY_OUTCOME, 0, 10).subscribe(r => this.continuityOutcomes = r);
  }


  load(event: LazyLoadEvent) {
    const pageNumber = event.first! / event.rows!;
    const pageSize = event.rows!;
    this.outcomeService.getOverview(OverviewType.CONTINUITY_OUTCOME, pageNumber, pageSize).subscribe(r => this.continuityOutcomes = r);
  }
}
