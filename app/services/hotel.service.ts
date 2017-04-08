import { Injectable }     from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import { Hotel }           from '../models/hotel';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class HotelService {
  private baseUrl = 'http://rsc-harambe.azurewebsites.net/api';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor (private http: Http) {}

  getHotels (): Observable<Hotel[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/hotels', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getHotelsByLocation (id: number): Observable<Hotel[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/hotellocation/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getHotel (id: number): Observable<Hotel[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/hotels/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getHotelByName (name: string): Observable<Hotel[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/hotels/?naziv='+name, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  create(name: string, hotel: string, date: string): any {
    const url = this.baseUrl+'/hotels';

    return this.http
      .post(url, JSON.stringify({action: 'create', 'data': [{name: name, hotel: hotel, date: date}]}), {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  remove(id: number): any {
    const url = this.baseUrl+'/hotels/'+id;

    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  update(hotel: Hotel): any {
    const url = this.baseUrl+'/hotels';

    return this.http
      .post(url, JSON.stringify({action: 'update', 'data': [hotel]}), {headers: this.headers})
      .toPromise()
      .then(() => hotel)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();

    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
