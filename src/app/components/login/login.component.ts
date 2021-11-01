import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  test = 'd';
  items: MenuItem[] = [];
  display: boolean = false;
  headerValue = "Enter credentials in order to login"
    
  constructor() {
  }
  
  ngOnInit() {
  }

  showDialog() {
    this.display = true;
  }

  login() {
    this.test = 'test';
    console.log("click");
  }

}
