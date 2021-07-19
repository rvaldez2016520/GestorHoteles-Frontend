import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { User } from 'src/app/models/user';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hotelsHome: Array<Hotel> = []
  user: User = null;

  constructor(private restHotel: RestHotelService) { }

  ngOnInit(): void {
    this.user = (JSON.parse(localStorage.getItem('user')))? JSON.parse(localStorage.getItem('user')): null;
    this.restHotel.getHotelsRecomendations().subscribe((resp: any) =>{
       console.log(resp);
       resp.hotels.forEach(hotel => {
        this.hotelsHome.push(hotel);
       });
     })
  }

  saveUsername(){
    
  }

}
