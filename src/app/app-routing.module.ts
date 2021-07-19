import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeHotelsComponent } from './components/home-hotels/home-hotels.component';
import { HoteladminReservationsComponent } from './components/hoteladmin-reservations/hoteladmin-reservations.component';
import { MyAccountComponent } from './components/myaccount/myaccount.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { HotelServiceComponent } from './components/hotel-service/hotel-service.component';
import { EventsComponent } from './components/events/events.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { HistoryComponent } from './components/history/history.component';
import { AdminGuard } from './guards/admin.guard';
import { RolehotelGuard } from './guards/rolehotel.guard';
import { HotelRoomsComponent } from './components/hotel-rooms/hotel-rooms.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserGuardGuard } from './guards/user-guard.guard';
import { AccessHomeAdminGuard } from './guards/access-home-admin.guard';

const routes: Routes = [
  /* {
    path: "", component: HomeComponent,
  }, */
  {
    path: "", redirectTo: "home", pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: 'homeHotels', canActivate: [UserGuardGuard], component: HomeHotelsComponent
  },
  {
    path: "homeAdmin", canActivate: [AccessHomeAdminGuard], component: HomeAdminComponent
  },
  {
    path: "users", canActivate: [AdminGuard], component: UsersComponent
  },
  {
    path: "rooms", canActivate: [RolehotelGuard],component: RoomsComponent
  },
  {
    path: "reservations", canActivate: [RolehotelGuard], component: HoteladminReservationsComponent
  },
  {
    path: "myaccount", canActivate: [UserGuardGuard],  component: MyAccountComponent
  },
  {
    path: "hotelService", canActivate: [RolehotelGuard], component: HotelServiceComponent
  },
  {
    path: "events", canActivate: [UserGuardGuard], component: EventsComponent
  },
  {
    path: "hotelRooms", canActivate: [UserGuardGuard], component: HotelRoomsComponent
  },
  {
    path: "reservation", canActivate: [UserGuardGuard], component: ReservationComponent
  },
  {
    path: "invoices", component: InvoiceComponent
  },
  {
    path: "history",  canActivate: [UserGuardGuard], component: HistoryComponent
  },
  {
    path: "**", component: HomeAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
