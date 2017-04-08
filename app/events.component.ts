import { Component, OnInit } from '@angular/core';
import { Event } from './event';
import { EventService } from './event.service';
import './rxjs-operators';
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'my-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css'],
  providers: [EventService]
})

export class EventsComponent implements OnInit {
  title = 'Events';
  events: Event[];
  errorMessage: any;
  selectedEvent: Event;
  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  getEvents(): void {
    this.eventService.getEvents().subscribe(
      events => this.events = events,
      error =>  this.errorMessage = <any>error
    );
  }
  ngOnInit(): void {
    this.getEvents();
  }

  onSelect(event: Event): void {
    this.selectedEvent = event;
  }

  gotoDetail(id: number): void {
    this.router.navigate(['/detail', id]);
  }

  gotoCreate(): void {
    this.router.navigate(['/create']);
  }

  remove(id: number): void {
    this.eventService.remove(id)
      .then(() => this.router.navigate(['/events']));
  }

}
