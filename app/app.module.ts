import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import {HttpModule, JsonpModule} from "@angular/http";

import { AppRoutingModule }     from './app-routing.module';
import {HomeComponent} from "./home/home.component";
import {LocationService} from "./services/location.service";

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
    HomeComponent
  ],
  providers: [
    LocationService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}


