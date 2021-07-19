import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { Reservation } from 'src/app/models/reservation';
import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestReservationService } from 'src/app/services/restReservation/rest-reservation.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  reservation: Reservation;
  hotel: Hotel;
  room: Room;
  user: User;
  reservations: Array<Reservation> = [];
  hotels: Array<Hotel> = [];

  constructor(private restReservation: RestReservationService, private datepipe: DatePipe, private restRoom: RestRoomService,
    private restHotel: RestHotelService) { 
      this.user = new User("","","","","","","",[],[],[]);
      this.reservation = new Reservation("","","","",null,null,null,null,[],[]);
      this.hotel = new Hotel("", null, "", "", null, "", "", [], []);
      this.room = new Room("","",null,null,null,"");
    }

  ngOnInit(): void {
    this.reservations = [];
    this.hotels = [];
    this.user = JSON.parse(localStorage.getItem('user'));

    this.restReservation.getReservationsByUser().subscribe((resp:any)=>{
      resp.userFinded.reservations.forEach(element => {
        this.reservations.push(element);
      });
    })
    this.restHotel.getHotelsVisited().subscribe((resp:any)=>{
      console.log(resp);
      resp.userFinded.history_hotels.forEach(element => {
        this.hotels.push(element);
      });
    })
  }

  showDateInFormat(date): Date{
    date = this.datepipe.transform(date, "dd/MM/yyyy");
    return date;
  }

  setReservationInfo(reservation: Reservation){
    this.reservation = reservation;
    this.restRoom.getRoomByUser(reservation.room).subscribe((resp:any)=>{
      this.room = resp.rooms;
    })
    this.restHotel.getHotel(reservation.hotel).subscribe((resp:any)=>{
      this.hotel = resp.users;
    })
  }

}
