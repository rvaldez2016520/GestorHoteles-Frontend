import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestInvoiceService {

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

  getInvoicesByHotelAdmin(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getInvoicesByHotelAdmin`, {headers}).pipe(map(this.extractData));
  }

  getInvoice(invoiceId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getInvoice/${invoiceId}`, {headers}).pipe(map(this.extractData));
  }

  createInvoice(reservationId: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.post(`${this.uri}createInvoice/${reservationId}`,[], {headers}).pipe(map(this.extractData));
  }

  getInvoicesByUser(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getInvoicesByUser`, {headers}).pipe(map(this.extractData));
  }
}
