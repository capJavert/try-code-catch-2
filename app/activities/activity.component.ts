import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import '../rxjs-operators';
import {Transport} from "../models/transport";
import {ActivityService} from "../services/activity.service";
import {Activity} from "../models/activity";
import {activities, user} from "../plan-session";
import {WebUser} from "../models/user";

@Component({
  moduleId: module.id,
  selector: 'activity',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.css']
})
export class ActivityComponent {
  title = 'Transport';
  activities: Activity[];
  errorMessage: any;
  selectedActivities: number[];
  user: WebUser;

  constructor(
    private service: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = user;
    this.route.params.subscribe(
      params => {
        this.service.getActivities().subscribe(
          data => {
            this.activities = data;
          },
          error =>  this.errorMessage = <any>error
        );
      });

    this.selectedActivities = [];
  }

  selectActivity(id: number) {
    for(let activity of this.activities) {
      if(activity.id == id) {
        activities.push(activity.id);
      }
    }

    this.selectedActivities = activities;
  }

  deselectActivity(id: number) {
    for(let aid of this.selectedActivities) {
      if(aid == id) {
        let index = this.selectedActivities.indexOf(aid);
        activities.splice(index, 1);
      }
    }

    this.selectedActivities = activities;
  }

  isSelected(id: number): boolean {
    return this.selectedActivities.indexOf(id) != -1;
  }

  goToSummary(): void {
    this.router.navigate(['/summary']);
  }
}
