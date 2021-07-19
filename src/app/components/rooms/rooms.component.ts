import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { Room } from 'src/app/models/room';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  
  hotel: Hotel;
  room: Room;
  rooms: Array<Room> = [];
  confirmPassword;
  selectRoom = ["Habitación Dormitorio", "Salón de evento"];

  constructor(private restRoom: RestRoomService, private datepipe: DatePipe, private restHotel: RestHotelService, private router: Router) { 
    this.hotel = new Hotel("", null, "", "", null, "", "", [], []);
    this.room = new Room("","",null,null,null,"");
  }

  ngOnInit(): void {

    this.rooms = [];

    this.hotel = JSON.parse(localStorage.getItem("hotel"));

    this.restRoom.getRoomsByHotelAdmin().subscribe((resp:any)=>{
      resp.forEach(element => {
        this.rooms.push(element)
      });
    })
  }

  showDateInFormat(date): Date{
    date = this.datepipe.transform(date, "dd/MM/yyyy");
    return date;
  }

  setRoom(room: Room){
    this.room = room;
  }

  onSubmit(saveRoomByAdminForm){
    this.restRoom.createRoom(this.room,this.hotel._id).subscribe( (resp:any) => {
      if(resp.userSaved){
        alert(resp.message);
        saveRoomByAdminForm.reset();
        this.room = resp.roomSaved;
      }else {
        alert(resp.message);
      }
    }, 
    err => alert(err.error.message));
  }
 
  deleteInfo(){
    this.room = new Room("","",null,null,null,"");
  }

  removeRoom(){
    this.restRoom.deleteRoom(this.room._id,this.confirmPassword).subscribe((resp:any)=>{
      if(resp.ok == true){
        alert(resp.message);
        this.ngOnInit();
      }else{
        alert(resp.message);
      }
    },
    error => alert(error.error.message))
  }

}