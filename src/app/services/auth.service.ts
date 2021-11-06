import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = 'token';

  constructor(private router: Router) { }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem(this.token) != null;
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.token);
  }

  public login(bearerToken: string) {
    sessionStorage.setItem(this.token, bearerToken);
  }

  public logout() {
    sessionStorage.removeItem(this.token);
    this.router.navigate([`${environment.homeUrl}`]);
  }

}
