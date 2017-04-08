import { Component, OnInit } from '@angular/core';

import { Event } from './event';
import { EventService } from './event.service';


@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  events: Event[] = [];

  constructor(private heroService: EventService) { }

  ngOnInit(): void {
    this.heroService.getEvents()
      .subscribe(events => this.events = events.slice(1, 5));
  }
}

