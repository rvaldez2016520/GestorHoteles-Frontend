import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/models/event';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestEventService {

  public uri:  string;
  public token: string;

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getToken(){
    let token = localStorage.getItem('token');
    this.token = (token!= undefined || token != null) ? token : null;
    
    return token;
  }

  constructor(private http: HttpClient) { 
    this.uri = CONNECTION.URI;
  }

  getRoomsEvent(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getRoomsEvent`, {headers}).pipe(map(this.extractData));
  }

  getEventsByHotelAdmin(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getEvents`, {headers}).pipe(map(this.extractData));
  }

  createEvent(event: Event){
    let params = JSON.stringify(event);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.post(`${this.uri}createEvent`, params, {headers}).pipe(map(this.extractData));
  }

  updateEvent(eventId: string,event: Event){
    let update = JSON.stringify(event);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.put(`${this.uri}updateEvent/${eventId}`, update, {headers}).pipe(map(this.extractData));
  }

  deleteEvent(idEvent: string, password){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    return this.http.put(this.uri+'deleteEvent/' + idEvent, {password: password}, {headers: headers})
      .pipe(map(this.extractData));
  }
}
