import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import '../rxjs-operators';
import {user} from "../plan-session";
import {WebUser} from "../models/user";
import {StatisticService} from "../services/statistic.service";
import {BaseChartDirective} from "ng2-charts";

@Component({
  moduleId: module.id,
  selector: 'statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.css'],
})
export class StatisticsComponent {
  @ViewChild( BaseChartDirective ) chart: BaseChartDirective;

  title = 'Statistics';
  errorMessage: any;
  searchParam: string = "";
  user: WebUser;
  // PolarArea
  polarAreaChartLabels:string[] = [];
  polarAreaChartData:number[] = [];
  polarAreaLegend:boolean = true;
  polarAreaChartType:string = 'pie';
  foodLabels: string[] = [];
  foodData: number[] = [];
  public lineChartOptions:any = {
    responsive: true
  };

  constructor(
    private router: Router,
    private service: StatisticService
  ) {
    this.user = user;

    this.mapFoodData();
  }

  mapFoodData(): void {
    this.service.getFoodStatistics().subscribe(
      data => {
        for(let item of data) {
          this.foodLabels.push(item.naziv+item.hotel_id);
          this.foodData.push(item.cnt*100);
        }

        console.debug(this.foodLabels);
        console.debug(this.foodData);
        this.updateChart();
      },
      error =>  this.errorMessage = <any>error
    );
  }

  private updateChart(){
    this.chart.ngOnChanges({});
  }

  // events
  chartClicked(e:any):void {
    console.log(e);
  }

  chartHovered(e:any):void {
    console.log(e);
  }

  goHome(id: number): void {
    this.router.navigate(['/home']);
  }

}
