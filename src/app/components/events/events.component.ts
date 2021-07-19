import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event'
import { Hotel } from 'src/app/models/hotel';
import { Room } from 'src/app/models/room';
import { RestEventService } from 'src/app/services/restEvent/rest-event.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  hotel: Hotel = null;
  room: Room;
  role: string = null;
  event: Event;
  events: Array<Event> = [];
  roomsEvent: Array<Room> = [];
  typesEvent = ["Private","Public"];
  confirmPassword;

  constructor(private restEvent: RestEventService, private datepipe: DatePipe) { 
    this.room = new Room("","",null,null,null,"");
    this.event = new Event("","","",null);
    this.hotel = new Hotel("", null, "", "", null, "", "", [], []);
  }

  ngOnInit(): void {
    this.roomsEvent = [];
    this.events = [];
    this.role = localStorage.getItem('role');
    console.log(this.hotel);
    this.hotel = JSON.parse(localStorage.getItem("currentHotel")) || JSON.parse(localStorage.getItem('hotel'));

    if(this.role == "ROLE_CLIENT"){
      this.hotel.events.forEach( event => {
        this.events.push(event);
      })
    }

    console.log(this.events);

    if(this.role != "ROLE_CLIENT"){
      this.restEvent.getEventsByHotelAdmin().subscribe((resp:any)=>{
        resp.events.forEach(element => {
         this.events.push(element);
       });
     })
    }

    if(this.role != "ROLE_CLIENT"){
      this.restEvent.getRoomsEvent().subscribe((resp:any)=>{
        resp.rooms.forEach(element => {
          this.roomsEvent.push(element);
        });
      })
    }
  }

  onSubmit(saveEventByAdminForm){
    this.restEvent.createEvent(this.event).subscribe( (resp:any) => {
      if(resp.eventSaved){
        alert(resp.message);
        saveEventByAdminForm.reset();
        this.event = resp.eventSaved;
      }else {
        alert(resp.message);
      }
    }, 
    err => alert(err.error.message));
  }

  updateEvent(updateEventByAdminForm){
    var eventId = this.event._id;
    this.restEvent.updateEvent(eventId,this.event).subscribe( (resp:any) => {
      if(resp.eventUpdated){
        alert(resp.message);
        updateEventByAdminForm.reset();
        this.event = resp.eventUpdated;
      }else {
        alert(resp.message);
      }
    }, 
    err => alert(err.error.message));
  }

  deleteInfo(){
    this.event = new Event("","","",null);
  }

  setEvent(event: Event){
    this.event = event;
  }

  showDateInFormat(date): Date{
    date = this.datepipe.transform(date, "dd/MM/yyyy");
    return date;
  }

  setRoom(room: Room){
    this.room = room;
  }

  removeEvent(){
    this.restEvent.deleteEvent(this.event._id,this.confirmPassword).subscribe((resp:any)=>{
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
