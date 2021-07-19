import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  token: String = null;
  role: String = null;

  constructor(private router: Router, private restUser: RestUserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.role = this.restUser.getRole();
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('home');
  }

}
