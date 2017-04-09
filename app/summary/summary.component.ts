import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import '../rxjs-operators';
import {Plan} from "../models/plan";
import {PlanService} from "../services/plan.service";
import {plan, activities, user} from "../plan-session";
import {HotelService} from "../services/hotel.service";
import {ActivityService} from "../services/activity.service";
import {TransportService} from "../services/transport.service";
import {Hotel} from "../models/hotel";
import {Transport} from "../models/transport";
import {Activity} from "../models/activity";
import {LocationService} from "../services/location.service";
import {Location} from "../models/location";
import {WebUser} from "../models/user";

@Component({
  moduleId: module.id,
  selector: 'summary',
  templateUrl: 'summary.component.html',
  styleUrls: ['summary.component.css']
})
export class SummaryComponent {
  title = 'Summary';
  newPlan: Plan;
  errorMessage: any;
  hotel: Hotel = new Hotel();
  transport: Transport = new Transport();
  location: Location = new Location();
  newActivities: Activity[];
  arr = Array;
  isSignedIn: boolean = true;
  isSubmited: boolean = false;
  user: WebUser = new WebUser();

  constructor(
    private service: PlanService,
    private hotelService: HotelService,
    private activityService: ActivityService,
    private locationService: LocationService,
    private transportService: TransportService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = user;
    this.newActivities = [];
    this.newPlan = plan;

    this.hotelService.getHotel(plan.hotel_id).subscribe(
      data => {
        this.hotel = data[0] as Hotel;

        this.locationService.getLocation(this.hotel.loc_id).subscribe(
          data => {
            this.location = data[0] as Location;
          },
          error =>  this.errorMessage = <any>error
        )
      },
      error =>  this.errorMessage = <any>error
    );

    this.transportService.getTransport(plan.transport_id).subscribe(
      data => {
        this.transport = data[0] as Transport;

        this.locationService.getLocation(this.transport.end_id).subscribe(
          data => {
            let loc = data[0] as Location;
            this.transport.end_name = loc.loc_name;
          },
          error =>  this.errorMessage = <any>error
        )
      },
      error =>  this.errorMessage = <any>error
    );

    for(let aid of activities) {
      this.activityService.getActivities().subscribe(
        data => {
          for(let act of data) {
            if(act.id == aid) {
              this.newActivities.push(act);
            }
          }
        },
        error =>  this.errorMessage = <any>error
      );
    }
  }

  createPlan(): void {
    this.service.create(plan.plan_name, plan.transport_id, plan.hotel_id, this.user.id)
      .subscribe(data => {
        console.debug("success", data[0]);

        let np = data[0] as Plan;
        plan.id = np.id;

        for(let act of this.newActivities) {
          this.service.addActivity(plan.id, act.id)
            .then(() => {
              console.debug("success activity");
            });
        }

        this.isSubmited = true;
        window.scrollTo(0,0);
      },
      error =>  this.errorMessage = <any>error
    );
  };

  goHome(): void {
    this.router.navigate(["/home"]);
  }

  login(): void {
    user.redirect = "summary";
    this.router.navigate(["/login"]);
  }
}
