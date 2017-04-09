import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import '../rxjs-operators';
import {Transport} from "../models/transport";
import {TransportService} from "../services/transport.service";
import {LocationService} from "../services/location.service";
import {Location} from "../models/location";
import {plan, user} from "../plan-session";
import {WebUser} from "../models/user";

@Component({
  moduleId: module.id,
  selector: 'transport',
  templateUrl: 'transport.component.html',
  styleUrls: ['transport.component.css']
})
export class TransportComponent {
  title = 'Transport';
  transports: Transport[];
  errorMessage: any;
  arr = Array;
  locationId: number;
  user: WebUser;

  constructor(
    private service: TransportService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = user;
    this.route.params.subscribe(
      params => {
        this.service.getTransportsByLocation(+params["id"]).subscribe(
          data => {
            this.locationId = +params["id"];
            this.transports = data;

            for(let transport of this.transports) {
              this.locationService.getLocation(transport.end_id).subscribe(
                data => {
                  let location = data[0] as Location;
                  transport.end_name = location.loc_name
                },
                error =>  this.errorMessage = <any>error
              );
            }
          },
          error =>  this.errorMessage = <any>error
        );
      });
  }

  goToActivities(id: number): void {
    plan.transport_id = id;
    this.router.navigate(['/planer/activities', this.locationId]);
  }
}
