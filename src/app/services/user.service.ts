import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AvailableValidationResult, LoginDto, RegistrationDto, TokenDto } from '../dto/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  LOGIN_URL = `${environment.hostUrl}/login`;
  REGISTRATION_URL = `${environment.hostUrl}/register`;
  USERNAME_EXISTS_URL = `${environment.hostUrl}/exists/username/`;
  EMAIL_EXISTS_URL = `${environment.hostUrl}/exists/email/`;

  constructor(private httpClient: HttpClient) { }

  login(loginData: LoginDto): Observable<TokenDto> {
    return this.httpClient.post(this.LOGIN_URL, loginData) as Observable<TokenDto>;
  }

  register(registrationDto: RegistrationDto) {
    return this.httpClient.post(this.REGISTRATION_URL, registrationDto) as Observable<any>;
  }

  isUsernameAvailable(username: string): Observable<AvailableValidationResult> {
    if(!username) {
      return of({available: false})
    }
    return this.httpClient.get(this.USERNAME_EXISTS_URL + username) as Observable<AvailableValidationResult>;
  }

  isEmailAvailable(email: string): Observable<AvailableValidationResult> {
    if(!email) {
      return of({available: false});
    }
    return this.httpClient.get(this.EMAIL_EXISTS_URL + email) as Observable<AvailableValidationResult>;
  }


}
