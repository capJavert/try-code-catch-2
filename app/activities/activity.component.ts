import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import '../rxjs-operators';
import {Transport} from "../models/transport";
import {ActivityService} from "../services/activity.service";
import {Activity} from "../models/activity";

@Component({
  moduleId: module.id,
  selector: 'transport',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.css']
})
export class ActivityComponent {
  title = 'Transport';
  activities: Activity[];
  errorMessage: any;
  arr = Array;

  constructor(
    private service: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(
      params => {
        this.service.getActivities().subscribe(
          data => {
            this.activities = data;
          },
          error =>  this.errorMessage = <any>error
        );
      });
  }

  goToActivities(id: number): void {
    this.router.navigate(['/planer/summary', id]);
  }
}
