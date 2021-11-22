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
      { label: 'Outcomes', icon: 'pi pi-dollar',
      items: [
        { label: 'New outcome', icon: 'pi pi-plus', routerLink: ['/outcomes/new'] },
        { label: 'View outcomes', icon: 'pi pi-list', routerLink: ['/outcomes/view']}
    ]
  },{
    label: 'Shopping list', icon: 'pi pi-check-square',
    items: [
      { label: 'New list', icon: 'pi pi-plus', routerLink: ['/shopping-list/new/list'] },
      { label: 'New item', icon: 'pi pi-plus', routerLink: ['/shopping-list/new/item'] },
      { label: 'View list', icon: 'pi pi-list', routerLink: ['/shopping-list/view'] }
    ]
  },{
    label: 'Todo list', icon: 'pi pi-check-square',
    items: [
      { label: 'New list', icon: 'pi pi-plus', routerLink: ['/todo-list/new/list'] },
      { label: 'New item', icon: 'pi pi-plus', routerLink: ['/todo-list/new/item'] },
      { label: 'View list', icon: 'pi pi-list', routerLink: ['/todo-list/view'] }
    ]
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
