import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import {HttpModule, JsonpModule} from "@angular/http";

import { AppRoutingModule }     from './app-routing.module';
import {HomeComponent} from "./home/home.component";
import {LocationService} from "./services/location.service";
import {PlanerComponent} from "./planer/planer.component";
import {PlanService} from "./services/plan.service";
import {HotelComponent} from "./hotel/hotel.component";
import {HotelService} from "./services/hotel.service";
import {TransportComponent} from "./transport/transport.component";
import {TransportService} from "./services/transport.service";
import {ActivityComponent} from "./activities/activity.component";
import {ActivityService} from "./services/activity.service";
import {SummaryComponent} from "./summary/summary.component";
import {FacebookLoginComponent} from "./facebook-login/facebook-login.component";
import {FacebookModule, FacebookService} from "ng2-facebook-sdk";
import {UserService} from "./services/login.service";
import {PlanComponent} from "./summary/plan.component";
import {ChartsModule} from "ng2-charts";
import {StatisticsComponent} from "./statistics/statistics.component";
import {StatisticService} from "./services/statistic.service";

@NgModule({
  imports: [
    FacebookModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    ChartsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PlanerComponent,
    HotelComponent,
    TransportComponent,
    ActivityComponent,
    SummaryComponent,
    FacebookLoginComponent,
    PlanComponent,
    StatisticsComponent
  ],
  providers: [
    LocationService,
    PlanService,
    HotelService,
    TransportService,
    ActivityService,
    FacebookService,
    UserService,
    StatisticService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}


