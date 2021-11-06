import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog'
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService]
})
export class AppComponent {
  title = 'finance-management-front';

  constructor(private authService: AuthService, private dialogService: DialogService) { }

  login() {
    this.dialogService.open(LoginComponent, {header: "Login", closable: true});
  }

  register() {
    
  }

  logout() {
    this.authService.logout();
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }
}
