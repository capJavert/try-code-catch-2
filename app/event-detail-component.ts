import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import './rxjs-operators';
import { EventService } from './event.service';
import {Event} from "./event";

@Component({
  moduleId: module.id,
  selector: 'my-event-detail',
  templateUrl: 'event-detail.component.html',
  styleUrls: ['event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input()
  event: Event;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.eventService.getEvent(+params['id']))
      .subscribe(event => this.event = event[0] as Event);
  }

  save(): void {
    this.eventService.update(this.event)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
