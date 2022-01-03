import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Categories, Category, CategorySummary, ChartData, OutcomeOverview, OutcomeSummary, OverviewType, Page } from 'src/app/dto/outcome-interface';
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
    { name: 'All', type: OverviewType.ALL },
    { name: 'Regular outcomes', type: OverviewType.REGULAR_SINGLE_OUTCOME },
    { name: 'Continuity outcomes', type: OverviewType.CONTINUITY_SINGLE_OUTCOME }];

  defaultStartDate: string = this.defaultStartDateString();
  filterOverviewType: OverviewType = OverviewType.ALL;
  filterCategoryId?: number = undefined;
  filterStartDate?: string = undefined;
  filterEndDate?: string = undefined;

  outcomes: Page<OutcomeOverview> = {} as Page<OutcomeOverview>;
  outcomesSummary: OutcomeSummary = {} as OutcomeSummary;

  chartData: any;
  outcomesData: any;
  valuesChartOptions: any;
  outcomesChartOptions: any;

  chartColors: Array<string> = [];

  constructor(private outcomeService: OutcomeService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.outcomeService.getOverview(this.filterOverviewType, 0, 10, this.filterStartDate, this.filterEndDate, this.filterCategoryId).subscribe(r => {
      this.outcomes = r;
      this.first = 0;
    });
    this.outcomeService.getSummary(this.filterOverviewType, this.filterStartDate, this.filterEndDate, this.filterCategoryId).subscribe(r => {
      this.outcomesSummary = r;
      this.chartColors = [];
      this.prepareChartData();
    })
    this.categoryService.getCategories().subscribe(r => {
      let defaultAbstractCategory:Category = {id: -1, name: 'All'};
      this.availableCategories = r;
      this.availableCategories.categories.splice(0, 0, defaultAbstractCategory);
      if(!this.filterCategoryId) {
        this.filterCategoryId = this.availableCategories.categories[0].id;
      }
   });
  }

  applyFilters() {
    this.ngOnInit();
  }

  paginate(event: any) {
    this.first = event.first;
  }

  load(event: LazyLoadEvent) {
    const pageNumber = event.first! / event.rows!;
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

  private prepareChartData() {
    this.chartData = {
      labels: this.outcomesSummary.dates,
      datasets: this.valueDatasets()
    };
    this.outcomesData = {
      labels: this.outcomesSummary.dates,
      datasets: this.outcomeDatasets()
    };
    this.setValuesChartOptions();
    this.setOutcomesChartOptions();
  }


  private valueDatasets(): Array<ChartData> {
    let array = [] as Array<ChartData>;
    this.outcomesSummary.outcomesByCategories.forEach((sum: CategorySummary) => {
      let randomColor = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
      this.chartColors.push(randomColor);
      array.push({
        label: sum.category,
        data: sum.values,
        tension: .4,
        borderColor: randomColor
      });
    })
    return array;
  }

  private outcomeDatasets(): Array<ChartData> {
    let array = [] as Array<ChartData>;
    let colorIndex = 0;
    this.outcomesSummary.outcomesByCategories.forEach((sum: CategorySummary) => {
      let randomColor = this.chartColors[colorIndex];
      colorIndex++;
      array.push({
        label: sum.category,
        data: sum.outcomes,
        tension: .4,
        backgroundColor: randomColor
      });
    })
    return array;
  }

  private setValuesChartOptions() {
    this.valuesChartOptions = {
      legend: {
        position: 'bottom'
      },
      plugins: {
        title: {
          display: true,
          text: 'Outcome values by period',
          font: {
            size: 34,
          },
        },
        legend: {
          labels: {
            color: '#495057',
          }
        }
      },
    };
  }

  private setOutcomesChartOptions() {
    this.outcomesChartOptions = {
      legend: {
        position: 'bottom'
      },
      plugins: {
        title: {
          display: true,
          text: 'Number of outcomes in period',
          font: {
            size: 34,
          },
        },
        legend: {
          labels: {
            color: '#495057',
          }
        }
      },
    };
  }

}
