import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegistrationDto } from 'src/app/dto/user.interface';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  model: RegistrationDto = {username: '', email: '', password: ''};
  registrationError = false;
  registrationSuccess = false;

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(1)], [this.usernameValidator(this.userService)]),
    email: new FormControl('', [Validators.required], [this.emailValidator(this.userService)]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.min(1)]),
      repeatedPassword: new FormControl('', [Validators.min(1)])
    }, this.validatePasswords)
  });


  constructor(private userService: UserService, private dialogService: DialogService, private dialogRef: DynamicDialogRef) { }

  ngOnInit(): void {
  }



  register() {
    this.userService.register({username: this.registrationForm.value.username, email: this.registrationForm.value.email, password: this.registrationForm.value.passwords.password})
    .subscribe(success => {
      this.registrationError = false;
      this.registrationSuccess = true;
    }, err => {
      this.registrationError = true;
      this.registrationSuccess = false;
    })
  }

  usernameValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return userService.isUsernameAvailable(control.value).pipe(map(result => {
        return result.available ? null : {usernameAlreadyExists: true};
      }))
    }
  }

  emailValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return userService.isEmailAvailable(control.value).pipe(map(result => {
        return result.available == true ? null : {emailAlreadyExists: true};
      }))
    }
  }

  validatePasswords(control: AbstractControl) {
    if(control.value.password === control.value.repeatedPassword) {
      return null;
    }
    return { passwordsDoNotMatch: true };
  }

  goToLogin() {
    this.dialogRef.close();
    this.dialogService.open(LoginComponent, {header: "Login"});
  }
}
