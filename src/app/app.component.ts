import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog'
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService]
})
export class AppComponent implements OnInit{

  items: MenuItem[] = [];

  title = 'finance-management-front';

  constructor(private authService: AuthService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Outcomes', icon: 'pi pi-dollar', routerLink: ['/outcomes/view'],
  },{
    label: 'Shopping list', icon: 'pi pi-tag', routerLink: ['/shopping-list/view'],
  },{
    label: 'Todo list', icon: 'pi pi-check-square', routerLink: ['/todo-list/view'],
  }];
  }

  login() {
    this.dialogService.open(LoginComponent, {header: "Login", closable: true});
  }

  register() {
    this.dialogService.open(RegistrationComponent, {header: "Register", closable: true});
  }

  logout() {
    this.authService.logout();
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }
}
