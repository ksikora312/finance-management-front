import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginDto } from 'src/app/dto/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  incorrectCredentials = false;
  loginSuccess = false;
  model: LoginDto = {login: '', password: ''};
    
  constructor(private loginService: UserService, private authService: AuthService, private dialogService: DialogService, private dialogRef: DynamicDialogRef) {
  }
  
  ngOnInit() {
  }


  login() {
    console.log("click");
    this.loginService.login(this.model).subscribe(token => {
      console.log(token.token);
      this.authService.login(token.token);
      this.incorrectCredentials = false;
      this.loginSuccess = true;
    }, error => {
      console.log("incorrect cred")
      console.log(error);
      this.incorrectCredentials = true;
    });
  }

  goToRegister() {
    this.dialogRef.close();
    this.dialogService.open(RegistrationComponent, {header: "Registration"});
  }

}
