import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import './rxjs-operators';
import { EventService } from './event.service';

@Component({
  moduleId: module.id,
  selector: 'my-event-create',
  templateUrl: 'event-create.component.html',
  styleUrls: ['event-detail.component.css']
})
export class EventCreateComponent implements OnInit {
  @Input()
  name: string;
  llocation: string;
  date: string;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  save(): void {
    this.eventService.create(this.name, this.llocation, this.date)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
