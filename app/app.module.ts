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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PlanerComponent,
    HotelComponent,
    TransportComponent
  ],
  providers: [
    LocationService,
    PlanService,
    HotelService,
    TransportService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}


