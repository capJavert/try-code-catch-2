import {Component, ContentChildren, QueryList, ViewChild, ViewChildren} from '@angular/core';
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
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  title = 'Statistics';
  errorMessage: any;
  user: WebUser;
  // PolarArea
  polarAreaLegend:boolean = true;
  polarAreaChartType:string = 'pie';
  public lineChartOptions:any = {
    responsive: true
  };

  foodLabels: string[] = [];
  foodData: number[] = [];

  activityLabels: string[] = [];
  activityData: number[] = [];

  imageLabels: string[] = [];
  imageData: number[] = [];

  transportLabels: string[] = [];
  transportData: number[] = [];

  constructor(
    private router: Router,
    private service: StatisticService
  ) {
    this.user = user;

    this.mapFoodData();
    this.mapActivityData();
    this.mapImageData();
    this.mapTransportData();
  }

  mapFoodData(): void {
    this.service.getFoodStatistics().subscribe(
      data => {
        for(let item of data) {
          this.foodLabels.push(item.naziv+ "(" + item.hotel_name + ")");
          this.foodData.push(item.cnt*100);
        }

        this.updateChart();

        console.debug(this.foodLabels);
        console.debug(this.foodData);
      },
      error =>  this.errorMessage = <any>error
    );
  }


  mapActivityData(): void {
    this.service.getActivityStatistics().subscribe(
      data => {
        for(let item of data) {
          this.activityLabels.push(item.naziv+ "(" + item.hotel_name + ")");
          this.activityData.push(item.cnt*100);
        }

        this.updateChart();

        console.debug(this.activityLabels);
        console.debug(this.activityData);
      },
      error =>  this.errorMessage = <any>error
    );
  }

  mapImageData(): void {
    this.service.getImageStatistics().subscribe(
      data => {
        for(let item of data) {
          this.imageLabels.push(item.naziv+ "(" + item.hotel_name + ")");
          this.imageData.push(item.cnt*100);
        }

        this.updateChart();

        console.debug(this.imageLabels);
        console.debug(this.imageData);
      },
      error =>  this.errorMessage = <any>error
    );
  }

  mapTransportData(): void {
    this.service.getTransportStatistics().subscribe(
      data => {
        for(let item of data) {
          this.transportLabels.push(item.naziv+ "(" + item.hotel_name + ")");
          this.transportData.push(item.cnt*100);
        }

        this.updateChart();

        console.debug(this.transportLabels);
        console.debug(this.transportData);
      },
      error =>  this.errorMessage = <any>error
    );
  }

  private updateChart(){
    console.debug(this.charts);
    for(let chart of this.charts.toArray()) {
      chart.ngOnChanges({});
    }
  }

  // events
  chartClicked(e:any):void {
    //console.log(e);
  }

  chartHovered(e:any):void {
    //console.log(e);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

}
