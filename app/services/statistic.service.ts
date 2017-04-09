import { Injectable }     from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import { Statistic }           from '../models/statistic';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class StatisticService {
  private baseUrl = 'http://rsc-harambe.azurewebsites.net/api';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor (private http: Http) {}

  getFoodStatistics (): Observable<Statistic[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/statisticsfood', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getHotelFoodStatistics (id: number): Observable<Statistic[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/statisticsfood/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getActivityStatistics (): Observable<Statistic[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/statisticsactivities', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getHotelActivityStatistics (id: number): Observable<Statistic[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/statisticsactivities/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTransportStatistics (): Observable<Statistic[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/statisticstransport', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getHotelTransportStatistics (id: number): Observable<Statistic[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/statisticstransport/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getImageStatistics (): Observable<Statistic[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/statisticsimages', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getHotelImageStatistics (id: number): Observable<Statistic[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/statisticsimages/'+id, params)
      .map(this.extractData)
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
