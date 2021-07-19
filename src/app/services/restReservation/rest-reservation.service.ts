import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestReservationService {

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

  constructor(private http: HttpClient ) {
    this.uri = CONNECTION.URI;
  }

  getToken(){
    let token = localStorage.getItem('token');
    this.token = (token!= undefined || token != null) ? token : null;
    
    return token;
  }

  getReservations(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getReservationsByHotelAdmin`, {headers}).pipe(map(this.extractData));
  }

  setReservation(reservation, idH, idU, idR){
    let params = JSON.stringify(reservation);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });
    return this.http.post(this.uri+idH+'/setReservation/'+idU+'/'+idR, params, {headers}).pipe(map(this.extractData));
  }

  getReservationsByUser(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });
    return this.http.get(`${this.uri}getReservationsByUser`, {headers}).pipe(map(this.extractData));
  }
}
