import { Injectable }     from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import { WebUser }           from '../models/user';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class UserService {
  private baseUrl = 'http://rsc-harambe.azurewebsites.net/api';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor (private http: Http) {}

  getUsers (): Observable<WebUser[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/users', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUsersByLocation (id: number): Observable<WebUser[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/userlocation/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUser (id: number): Observable<WebUser[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/users/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUserByName (name: string): Observable<WebUser[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/users/?naziv='+name, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  create(name: string, email: string): Observable<WebUser[]> {
    const url = this.baseUrl+'/users';

    return this.http
      .post(url, JSON.stringify({ime: name, email: email}), {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  remove(id: number): any {
    const url = this.baseUrl+'/users/'+id;

    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  update(user: WebUser): any {
    const url = this.baseUrl+'/users';

    return this.http
      .post(url, JSON.stringify({action: 'update', 'data': [user]}), {headers: this.headers})
      .toPromise()
      .then(() => user)
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
