import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { EventsComponent }      from './events.component';
import { EventDetailComponent } from './event-detail-component';
import {EventCreateComponent} from "./event-create.component";
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: EventDetailComponent },
  { path: 'create', component: EventCreateComponent },
  { path: 'events',     component: EventsComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
