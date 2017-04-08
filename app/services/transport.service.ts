import { Injectable }     from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import { Transport }           from '../models/transport';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class TransportService {
  private baseUrl = 'http://rsc-harambe.azurewebsites.net/api';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor (private http: Http) {}

  getTransports (): Observable<Transport[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/transport', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTransportsByLocation (id: number): Observable<Transport[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/transportlocation/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTransport (id: number): Observable<Transport[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/transport/'+id, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTransportByName (name: string): Observable<Transport[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/transport/?naziv='+name, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  create(name: string, transport: string, date: string): any {
    const url = this.baseUrl+'/transport';

    return this.http
      .post(url, JSON.stringify({action: 'create', 'data': [{name: name, transport: transport, date: date}]}), {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  remove(id: number): any {
    const url = this.baseUrl+'/transport/'+id;

    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  update(transport: Transport): any {
    const url = this.baseUrl+'/transport';

    return this.http
      .post(url, JSON.stringify({action: 'update', 'data': [transport]}), {headers: this.headers})
      .toPromise()
      .then(() => transport)
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
