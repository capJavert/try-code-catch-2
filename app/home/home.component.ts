import { Component } from '@angular/core';
import {LocationService} from "../services/location.service";
import {Router} from "@angular/router";
import {Location} from "../models/location";
import '../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  title = 'Home';
  locations: Location[];
  errorMessage: any;
  searchParam: string = "";

  constructor(
    private service: LocationService,
    private router: Router
  ) { }

  public search(): void {
    console.debug("search()", this.searchParam);
      this.service.getLocationByName(this.searchParam).subscribe(
      locations => this.locations = locations,
      error =>  this.errorMessage = <any>error
    );
  }
}
