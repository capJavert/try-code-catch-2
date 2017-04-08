import { Injectable }     from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import { Plan }           from '../models/plan';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PlanService {
  private baseUrl = 'http://rsc-harambe.azurewebsites.net/api';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor (private http: Http) {}

  getPlansByLocation (): Observable<Plan[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/plans', params)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getPlans (): Observable<Plan[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/plans', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPlan (id: number): Observable<Plan> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/plans/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  create(plan_name: string, transport_id: number, hotel_id: number): Observable<Plan[]> {
    const url = this.baseUrl+'/plans';

    return this.http
      .post(url, JSON.stringify(
        {
          plan_name: plan_name,
          transport_id: transport_id,
          hotel_id: hotel_id
        }),
        {headers: this.headers}
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  addActivity(pid: number, aid: number): any {
    const url = this.baseUrl+'/planactivities';

    return this.http
      .post(url, JSON.stringify(
        {
          pid: pid,
          aid: aid
        }),
        {headers: this.headers}
      )
      .toPromise()
      .catch(this.handleError);
  }

  remove(id: number): any {
    const url = this.baseUrl+'/plans/'+id;

    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  update(plan: Plan): any {
    const url = this.baseUrl+'/plans';

    return this.http
      .post(url, JSON.stringify({action: 'update', 'data': [plan]}), {headers: this.headers})
      .toPromise()
      .then(() => plan)
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
