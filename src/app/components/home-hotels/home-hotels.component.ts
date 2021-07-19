import { Component, OnInit, DoCheck } from '@angular/core';
import { Country } from 'src/app/interfaces/country';
import { Hotel } from 'src/app/models/hotel';
import { Reservation } from 'src/app/models/reservation';
import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { RestReservationService } from '../../services/restReservation/rest-reservation.service';
import { RestHotelServiceService } from 'src/app/services/restHotelService/rest-hotel-service.service';
import { RestRoomService } from '../../services/restRoom/rest-room.service';

@Component({
  selector: 'app-home-hotels',
  templateUrl: './home-hotels.component.html',
  styleUrls: ['./home-hotels.component.css']
})
export class HomeHotelsComponent implements OnInit, DoCheck {

  search;

  countries: Array<Country> = [];
  user: User;
  hotel: Hotel;
  hotels: Array<Hotel> = [];
  usersManagements: Array<User> = [];
  role: String = null;

  room: Room;
  rooms: Array<Room> = [];
  cuartos: Array<Room>[];
  servicess: Array<String>[];
  reservation: Reservation
  hotelSelected: Hotel;
  roomSelected: Room;
  userLogged:User;


  constructor(private restHotel: RestHotelService, private restUser: RestUserService, 
    private restReservation: RestReservationService, private restHotelService: RestHotelServiceService,
    private restRoom: RestRoomService) { 
    this.user = new User("", "", "", "", "", "", "", [], [], []);
    this.hotel = new Hotel("", null, "", "", 0, "", "", [], []);
    this.room = new Room('','',null,null,null,'');
    this.reservation = new Reservation('','','','',null,null,null,null,[],[]);
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');

      this.restHotel.getCountries().subscribe( (resp: any) => {
        resp.forEach(country => {
          this.countries.push(country.name)
        });
      });
  
    if(this.role == "ROLE_ADMIN"){
    this.restUser.getManagements().subscribe((resp: any)=> {
      resp.managements.forEach(element => {
        this.usersManagements.push(element);
      });
    });
  }
    this.restHotel.getHotels().subscribe( (resp:any) => {
      resp.users.forEach(hotel => {
        this.hotels.push(hotel);
      });
      localStorage.setItem('hotels', JSON.stringify(resp.users));
    });

    this.restHotelService.getServices().subscribe((resp:any)=>{
      this.servicess = resp.services;
    });

    this.role = this.restUser.getRole();
    this.hotelSelected = new Hotel('',null,'','',null,'','',[],[]);
  }

  ngDoCheck(){
    this.role = this.restUser.getRole();
  }

  setHotelDetail(hotel:any){
    this.hotel.name = hotel.name;
    this.hotel.country = hotel.country;
    this.hotel.address = hotel.address;
    this.hotel.rooms = hotel.rooms;
  }

  obtenerData(hotel){
    this.hotelSelected = hotel;
    localStorage.setItem('hotel', JSON.stringify(this.hotelSelected));
    let idH = this.hotelSelected._id;

    
    if(this.rooms.length > 0){ 
      if(hotel._id == this.hotelSelected._id){
        this.rooms = [];
        this.restHotel.getRoomsByHotel(idH).subscribe((resp:any)=>{
          resp.forEach(element => {
            this.rooms.push(element);
          });
        })
      }
    }else{
      this.restHotel.getRoomsByHotel(idH).subscribe((resp:any)=>{
        resp.forEach(element => {
          this.rooms.push(element);
        });
      })
    }
  }

  obtenerDataRoom(room){
    this.roomSelected = room;
    localStorage.setItem('room', JSON.stringify(this.roomSelected));
  }

  onSubmit(formCHotel){
    this.restHotel.createHotel(this.hotel).subscribe( (resp: any) => {
      if(resp.hotelSaved){
        alert(resp.message);
        formCHotel.reset();
        this.hotel = resp.hotelSaved;
        this.hotels = resp.hotels;
        localStorage.setItem('hotels', JSON.stringify(this.hotels))
      }else {
        alert(resp.message);
      }
    }
    , err => alert(err.error.message) );
  }

  onSubmitR(formSetReservation){
    this.userLogged = this.restUser.getUser();
    let idH = this.hotelSelected._id;
    let idU = this.userLogged._id;
    let idR = this.roomSelected._id;
    this.restReservation.setReservation(this.reservation, idH, idU, idR).subscribe((resp: any)=>{
      if(resp.reservationSaved){
        alert(resp.message);
        formSetReservation.reset();
      }else{
        alert(resp.message);
        console.log("nel");
      }
    })
  }

  setLSRoom(cHotel){
    localStorage.setItem('currentHotel', JSON.stringify(cHotel));
  }


}
