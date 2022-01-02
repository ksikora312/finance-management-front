import { Component, Input, OnInit } from '@angular/core';
import { OutcomeOverview } from 'src/app/dto/outcome-interface';

@Component({
  selector: 'app-single-outcome-details',
  templateUrl: './single-outcome-details.component.html',
  styleUrls: ['./single-outcome-details.component.scss']
})
export class SingleOutcomeDetailsComponent implements OnInit {

  @Input()
  outcome: OutcomeOverview = {} as OutcomeOverview;

  constructor() { }

  ngOnInit(): void {
  }

}
