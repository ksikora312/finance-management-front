import { Component, OnInit } from '@angular/core';
import { LoginDto } from 'src/app/dto/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  incorrectCredentials = false;
  loginSuccess = false;
  model: LoginDto = {login: '', password: ''};
    
  constructor(private authService: UserService) {
  }
  
  ngOnInit() {
  }


  login() {
    console.log("click");
    this.authService.login(this.model).subscribe(token => {
      console.log(token.token);
      this.incorrectCredentials = false;
      this.loginSuccess = true;
    }, error => {
      console.log("incorrect cred")
      console.log(error);
      this.incorrectCredentials = true;
    });
  }

}
