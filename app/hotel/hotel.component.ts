import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import '../rxjs-operators';
import {Hotel} from "../models/hotel";
import {HotelService} from "../services/hotel.service";
import {plan} from "../plan-session";

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

  constructor(
    private service: HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
