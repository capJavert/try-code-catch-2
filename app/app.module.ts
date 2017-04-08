import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import { EventDetailComponent } from './event-detail-component';
import { EventsComponent }     from './events.component';
import { EventService }         from './event.service';
import {HttpModule, JsonpModule} from "@angular/http";

import {DashboardComponent} from "./dashboard.component";
import { AppRoutingModule }     from './app-routing.module';
import {EventCreateComponent} from "./event-create.component";

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
    EventDetailComponent,
    EventCreateComponent,
    EventsComponent,
    DashboardComponent
  ],
  providers: [
    EventService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}


