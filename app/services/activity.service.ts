import { Injectable }     from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import { Activity }           from '../models/activity';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ActivityService {
  private baseUrl = 'http://rsc-harambe.azurewebsites.net/api';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor (private http: Http) {}

  getActivities (): Observable<Activity[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/activities', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getActivitiesByLocation (id: number): Observable<Activity[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/activitieslocation/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getActivity (id: number): Observable<Activity[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/activities/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getActivityByName (name: string): Observable<Activity[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/activities/?naziv='+name, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  create(name: string, activities: string, date: string): any {
    const url = this.baseUrl+'/activities';

    return this.http
      .post(url, JSON.stringify({action: 'create', 'data': [{name: name, activities: activities, date: date}]}), {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  remove(id: number): any {
    const url = this.baseUrl+'/activities/'+id;

    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  update(activities: Activity): any {
    const url = this.baseUrl+'/activities';

    return this.http
      .post(url, JSON.stringify({action: 'update', 'data': [activities]}), {headers: this.headers})
      .toPromise()
      .then(() => activities)
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
