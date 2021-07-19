import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Room } from 'src/app/models/room';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestRoomService {

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

  getRoom(roomId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getRoomByAdminHotel/${roomId}`, {headers}).pipe(map(this.extractData));
  }

  getRooms(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getRoomByAdminHotel`, {headers}).pipe(map(this.extractData));
  }

  getRoomsByHotelAdmin(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getRoomsByHotelAdmin`, {headers}).pipe(map(this.extractData));
  }

  createRoom(room: Room,idH: string){
    let params = JSON.stringify(room);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.post(`${this.uri}createRoom/${idH}`,params , {headers}).pipe(map(this.extractData));
  }

  deleteRoom(idRoom: string, password){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    return this.http.put(this.uri+'deleteRoom/' + idRoom, {password: password}, {headers: headers})
      .pipe(map(this.extractData));
  }

  getRoomByUser(roomId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getRoom/${roomId}`, {headers}).pipe(map(this.extractData));
  }
}
