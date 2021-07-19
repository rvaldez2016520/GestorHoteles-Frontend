import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { Hotel } from '../../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class RestHotelService {
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


  constructor( private http: HttpClient ) {
    this.uri = CONNECTION.URI;
  }

  getCountries(){
    return this.http.get("https://restcountries.eu/rest/v2/lang/es").pipe(map(this.extractData));
  }

  getHotels(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getHotels`, {headers}).pipe(map(this.extractData));
  }

  getHotelsRecomendations(){
    return this.http.get(`${this.uri}getHotelsRecomendations`).pipe(map(this.extractData));
  }

  createHotel(hotel:Hotel){
    let params = JSON.stringify(hotel);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.post(`${this.uri}createHotel`,params , {headers}).pipe(map(this.extractData));
  }

  getHotel(hotelId: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getHotel/${hotelId}`, {headers}).pipe(map(this.extractData))
  }

  getHotelByHotelAdmin(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getHotelBydAdminHotelID`, {headers}).pipe(map(this.extractData));
  }

  getHotelsNames(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getHotelsnames`, {headers}).pipe(map(this.extractData));
  }

  getRoomsByHotel(idH){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(this.uri+'getRoomsByHotel/'+idH,{headers}).pipe(map(this.extractData));
  }

  getHotelsVisited(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });
    return this.http.get(`${this.uri}getHotelsVisited`, {headers}).pipe(map(this.extractData));
  }
}
