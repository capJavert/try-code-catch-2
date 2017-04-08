import { Component } from '@angular/core';
import {LocationService} from "../services/location.service";
import {Router} from "@angular/router";
import '../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'hotel',
  templateUrl: 'hotel.component.html',
  styleUrls: ['hotel.component.css']
})
export class HotelComponent {
  title = 'Hotel';

  constructor(
    private service: LocationService,
    private router: Router
  ) { }

  goToTranport(id: number): void {
    this.router.navigate(['/planer/transport']);
  }
}
