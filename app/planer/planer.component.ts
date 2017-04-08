import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import '../rxjs-operators';
import {Plan} from "../models/plan";
import {PlanService} from "../services/plan.service";
import {Location} from "../models/location";
import {LocationService} from "../services/location.service";
import {plan} from "../plan-session";

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

  constructor(
    private service: PlanService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.location = new Location();

    this.route.params.subscribe(
      params => {
        this.locationService.getLocation(+params['id'])
          .subscribe(
            locations => {
              this.location = locations[0];
            },
            error =>  this.errorMessage = <any>error
          );
      });

    this.service.getPlans().subscribe(
      data => this.plans = data,
      error =>  this.errorMessage = <any>error
    );
  }

  ngOnInit(): void {

  }

  public search(): void {
    console.debug("search()", this.searchParam);
      this.service.getPlans().subscribe(
      data => this.plans = data,
      error =>  this.errorMessage = <any>error
    );
  }

  goToPlanSummary(id: number): void {
    this.router.navigate(['/plan', id]);
  }

  goToHotel(id: number): void {
    plan.plan_name = "Sweet 16";
    this.router.navigate(['/planer/hotel', id]);
  }
}
