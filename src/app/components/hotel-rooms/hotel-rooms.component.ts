import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { Reservation } from 'src/app/models/reservation';
import { Room } from 'src/app/models/room';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-hotel-rooms',
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
})
export class HotelRoomsComponent implements OnInit {

  hotel: Hotel = null;
  rooms: Array<Room> = [];
  services: Array<Service>= []
  currentRoom: Room = null;

  reservation: Reservation = null;

  constructor() {
    this.reservation = new Reservation('','','','',null,null,null,null,[],[]);
  }

  ngOnInit(): void {
    let hotel = JSON.parse(localStorage.getItem('currentHotel'));
    this.hotel = hotel;
    hotel.rooms.forEach(room => {
      this.rooms.push(room);
    });

    hotel.services.forEach(service => {
      this.services.push(service);
    });
  
  }

  deleteSt(){
    // localStorage.removeItem('currentHotel');
  }

  roomSelected(room){
    this.currentRoom =  room;
    console.log(this.currentRoom);
    localStorage.setItem('currentRoom',JSON.stringify( this.currentRoom));
  }

  onSubmitR(formSetReservation){

  }

}
