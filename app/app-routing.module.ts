import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PlanerComponent} from "./planer/planer.component";
import {HotelComponent} from "./hotel/hotel.component";
import {TransportComponent} from "./transport/transport.component";
import {ActivityComponent} from "./activities/activity.component";
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'planer/:id',  component: PlanerComponent },
  { path: 'planer/hotel/:id',  component: HotelComponent },
  { path: 'planer/transport/:id',  component: TransportComponent },
  { path: 'planer/activities/:id',  component: ActivityComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
