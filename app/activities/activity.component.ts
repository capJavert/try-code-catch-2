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
  selectedActivities: number[];

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

    this.selectedActivities = [];
  }

  selectActivity(id: number) {
    for(let activity of this.activities) {
      if(activity.id == id) {
        this.selectedActivities.push(activity.id);
      }
    }
  }

  deselectActivity(id: number) {
    for(let aid of this.selectedActivities) {
      if(aid == id) {
        let index = this.selectedActivities.indexOf(aid);
        this.selectedActivities.splice(index, 1);
      }
    }
  }

  isSelected(id: number): boolean {
    return this.selectedActivities.indexOf(id) != -1;
  }

  goToSummary(): void {
    this.router.navigate(['/planer/summary']);
  }
}
