import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import '../rxjs-operators';
import {Plan} from "../models/plan";
import {PlanService} from "../services/plan.service";
import {Location} from "../models/location";
import {LocationService} from "../services/location.service";
import {plan, user} from "../plan-session";
import {WebUser} from "../models/user";

@Component({
  moduleId: module.id,
  selector: 'planer',
  templateUrl: 'planer.component.html',
  styleUrls: ['planer.component.css']
})
export class PlanerComponent implements OnInit{
  title = 'Planer';
  plans: Plan[];
  errorMessage: any;
  searchParam: string = "";
  location: Location;
  planName: string;
  user: WebUser;

  constructor(
    private service: PlanService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.user = user;
    this.planName = "My new travel plan";
    this.location = new Location();

    this.route.params.subscribe(
      params => {
        this.locationService.getLocation(+params['id'])
          .subscribe(
            locations => {
              this.location = locations[0];

              this.service.getPlansByLocation(this.location.id).subscribe(
                data => this.plans = data,
                error =>  this.errorMessage = <any>error
              );
            },
            error =>  this.errorMessage = <any>error
          );
      });
  }

  ngOnInit(): void {

  }

  goToPlanSummary(id: number): void {
    this.router.navigate(['/plan', id]);
  }

  goToHotel(id: number): void {
    plan.plan_name = this.planName;
    this.router.navigate(['/planer/hotel', id]);
  }
}
