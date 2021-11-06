import { Component, OnInit } from '@angular/core';
import { LoginDto } from 'src/app/dto/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: LoginDto = {login: '', password: ''};//
    
  constructor(private authService: AuthService) {
  }
  
  ngOnInit() {
  }


  login() {
    console.log("click");
    this.authService.login(this.model).subscribe(token => {
      console.log(token.token);
    }, error => {
      console.log("incorrect cred")
      console.log(error);
    });
  }

}
