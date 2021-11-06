import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto, TokenDto } from '../dto/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LOGIN_URL = `${environment.hostUrl}/login`;

  constructor(private httpClient: HttpClient) { }

  login(loginData: LoginDto): Observable<TokenDto> {
    console.log(loginData);
    return this.httpClient.post(this.LOGIN_URL, loginData) as Observable<TokenDto>;
  }

}
