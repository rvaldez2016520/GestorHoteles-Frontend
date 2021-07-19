import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { Service } from 'src/app/models/service';
import { RestHotelServiceService } from '../../services/restHotelService/rest-hotel-service.service';

@Component({
  selector: 'app-hotel-service',
  templateUrl: './hotel-service.component.html',
  styleUrls: ['./hotel-service.component.css']
})
export class HotelServiceComponent implements OnInit {

  service: Service;
  hotel: Hotel;
  hotelServices: Array<Service> = [];

  constructor(private restHotelService: RestHotelServiceService) { 
    this.service = new Service("", "", null);
  }

  ngOnInit(): void {
    this.hotelServices = [];
    this.hotel = JSON.parse(localStorage.getItem('hotel'));
    this.restHotelService.getServicesHotel().subscribe((resp: any) => {
      console.log(resp);
      resp.services.forEach(element => {
        this.hotelServices.push(element);
      });
    })
  }

  onSubmit(formService){
    this.restHotelService.saveServiceHotel(this.service, this.hotel._id).subscribe((resp:any) =>{
      if(resp.hotelUpdated){
        formService.reset();
        alert(resp.message);
      }else{
        alert(resp.message);
      }
    })
  }

}
