import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { Invoice } from 'src/app/models/invoice';
import { Room } from 'src/app/models/room';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestHotelServiceService } from 'src/app/services/restHotelService/rest-hotel-service.service';
import { RestInvoiceService } from 'src/app/services/restInvoice/rest-invoice.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  hotel: Hotel = null;
  hotelsInvoicesClient: Array<Hotel> = []
  room: Room;
  user: User;
  invoice: Invoice;
  role;
  services: Array<Service> = [];
  invoices: Array<Invoice> = [];

  constructor(private restInvoice: RestInvoiceService, private datepipe: DatePipe, private restUser: RestUserService,
    private restRoom: RestRoomService, private restService: RestHotelServiceService , private restHotel: RestHotelService) { 
    this.hotel = new Hotel("", null, "", "", null, "", "", [], []);
    this.room = new Room("","",null,null,null,"");
    this.invoice = new Invoice("",null,null,null,"","", null,[],"");
    this.user = new User("","","","","","","",[],[],[]);
  }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    console.log(this.role);
    this.invoices = [];
    this.services = [];
    if(this.role == "ROLE_HOTEL"){
      this.hotel = JSON.parse(localStorage.getItem("hotel"));
      this.restInvoice.getInvoicesByHotelAdmin().subscribe((resp:any)=>{
        resp.invoices.forEach(element => {
          this.invoices.push(element);
        });
      })
    }else if(this.role == "ROLE_CLIENT"){
      this.restInvoice.getInvoicesByUser().subscribe((resp:any)=>{
        this.restInvoice.getInvoicesByUser().subscribe((resp:any)=>{
          resp.invoices.forEach(element => {
            this.invoices.push(element);
          });
          resp.invoices.forEach(element => {
            this.hotelsInvoicesClient.push(element.hotel);
          });
        })
      })


    }
    console.log(this.invoices);
  }

  showDateInFormat(date): Date{
    date = this.datepipe.transform(date, "dd/MM/yyyy");
    return date;
  }

  setInvoiceInfo(invoice: any){
    this.services = [];
    this.invoice = invoice;
    if(this.role == "ROLE_HOTEL"){
      this.restUser.getUserByHotelAdmin(invoice.user).subscribe((resp:any)=>{
        this.user = resp.user;
      })
      this.restRoom.getRoom(invoice.room).subscribe((resp:any)=>{
        this.room = resp.rooms;
      })
      this.restInvoice.getInvoice(invoice._id).subscribe((resp:any)=>{
        resp.invoice.services.forEach(element => {
          this.services.push(element);
        });
      })
    }else if(this.role == "ROLE_CLIENT"){
      this.user = JSON.parse(localStorage.getItem('user'));
      // this.hotel = this.invoice.hotel;
      this.restRoom.getRoomByUser(this.invoice.room._id).subscribe((resp:any)=>{
        this.room = resp.rooms;
      })
      // console.log(invoice.hotel._id);
      this.restHotel.getHotel(invoice.hotel._id).subscribe((resp: any) =>{
        console.log(resp);
        this.hotel= resp.users;
      })

      console.log(invoice.services);
      invoice.services.forEach(service => {
        this.services.push(service);
      });

    }
  }

}
