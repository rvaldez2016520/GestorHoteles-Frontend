import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { Reservation } from 'src/app/models/reservation';
import { Room } from 'src/app/models/room';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { RestReservationService } from '../../services/restReservation/rest-reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  hotel: Hotel = null;
  room: Room = null;
  user: User = null;
  services: Array<Service> = [];
  reservation: Reservation = null;

  textButton: string = "Agregar";
  buttons: Array<string> = []

  yourServices: Array<Service> = [];

  constructor(private restReservation: RestReservationService, private router: Router) { 
    this.reservation = new Reservation('','','','',null,null,null,null,[],[]);
  }

  ngOnInit(): void {
    let hotel = JSON.parse(localStorage.getItem('currentHotel'));
    this.hotel = hotel;
    this.room = JSON.parse(localStorage.getItem('currentRoom'));
    console.log(this.hotel);
    hotel.services.forEach(service => {
      this.services.push(service);
    });
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  // deleteSt(){
  //   localStorage.removeItem('currentRoom');
  // }

  changeText(){
    this.textButton = (this.textButton == "Agregar")? "Cancelar": "Agregar";

  }

  addService(service){
    // this.yourServices.forEach( yService => {
    //   if(yService._id != service._id){
    //     this.yourServices.push(service);
    //   }
    // })
    this.yourServices.push(service);
  }

  onSubmit(formReservation){
    console.log(this.reservation);
    this.reservation.hotel = this.hotel._id;
    this.reservation.room = this.room._id;
    this.reservation.user = this.user._id;

    this.yourServices.forEach( service => {
      this.reservation.services.push(service);
    })

    console.log(this.reservation);

    this.restReservation.setReservation(this.reservation, this.hotel._id, this.user._id, this.room._id).subscribe( (resp: any) => {
      console.log(resp);
      alert(resp.message);
      this.router.navigateByUrl('homeHotels');
    })
  }
}
