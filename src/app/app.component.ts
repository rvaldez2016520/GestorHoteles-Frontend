import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck, OnChanges {
  title = 'hotel-management';

  role: String = localStorage.getItem('role') || null;
  token: String = localStorage.getItem('token') || null;

  ngOnInit(){
    this.role = localStorage.getItem('role');
    this.token = localStorage.getItem('token');
  }

  ngDoCheck(){
    this.role = localStorage.getItem('role');
    this.token = localStorage.getItem('token');
  }

  ngOnChanges(){
    this.role = localStorage.getItem('role');
    this.token = localStorage.getItem('token');
  }

}
