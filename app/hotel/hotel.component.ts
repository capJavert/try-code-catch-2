import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import '../rxjs-operators';
import {Hotel} from "../models/hotel";
import {HotelService} from "../services/hotel.service";
import {plan, user} from "../plan-session";
import {WebUser} from "../models/user";

@Component({
  moduleId: module.id,
  selector: 'hotel',
  templateUrl: 'hotel.component.html',
  styleUrls: ['hotel.component.css']
})
export class HotelComponent {
  title = 'Hotel';
  hotels: Hotel[];
  errorMessage: any;
  arr = Array;
  locationId: number;
  user: WebUser;

  constructor(
    private service: HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = user;
    this.route.params.subscribe(
      params => {
        this.locationId = +params["id"];

        this.service.getHotelsByLocation(+params["id"]).subscribe(
          data => this.hotels = data,
          error =>  this.errorMessage = <any>error
        )
      });
  }

  goToTransport(id: number): void {
    plan.hotel_id = id;
    this.router.navigate(['/planer/transport', this.locationId]);
  }
}
