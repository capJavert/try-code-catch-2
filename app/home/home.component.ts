import { Component } from '@angular/core';
import {LocationService} from "../services/location.service";
import {Router} from "@angular/router";
import {Location} from "../models/location";
import '../rxjs-operators';
import {user} from "../plan-session";
import {WebUser} from "../models/user";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  title = 'Home';
  locations: Location[];
  errorMessage: any;
  searchParam: string = "";
  user: WebUser;

  constructor(
    private service: LocationService,
    private router: Router
  ) {
    this.user = user;
  }

  public search(): void {
    console.debug("search()");
      this.service.getLocationByName(this.searchParam).subscribe(
      locations => this.locations = locations,
      error =>  this.errorMessage = <any>error
    );
  }

  goToPlaner(id: number): void {
    this.router.navigate(['/planer', id]);
  }

  goToStatistics(): void {
    this.router.navigate(['/customer/statistics']);
  }
}
