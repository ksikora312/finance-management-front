import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RegistrationComponent } from './components/registration/registration.component';
import { TodoListOverviewComponent } from './components/todo-list-overview/todo-list-overview.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthTokenInterceptor } from './interceptors/AuthTokenInterceptor';
import { TodoListElementComponent } from './components/todo-list-element/todo-list-element.component';
import { TodoListViewComponent } from './components/todo-list-view/todo-list-view.component';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { OutcomeOverviewComponent } from './outcome/outcome-overview/outcome-overview.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { SingleOutcomesOverviewComponent } from './outcome/single-outcomes-overview/single-outcomes-overview.component';
import { ContinuityOutcomesOverviewComponent } from './outcome/continuity-outcomes-overview/continuity-outcomes-overview.component';
import { ShoppingListOutcomesOverviewComponent } from './outcome/shopping-list-outcomes-overview/shopping-list-outcomes-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    TodoListOverviewComponent,
    TodoListElementComponent,
    TodoListViewComponent,
    OutcomeOverviewComponent,
    SingleOutcomesOverviewComponent,
    ContinuityOutcomesOverviewComponent,
    ShoppingListOutcomesOverviewComponent
  ],
  imports: [
    AccordionModule,
    CheckboxModule,
    TableModule,
    ToolbarModule,
    MessagesModule,
    MessageModule,
    HttpClientModule,
    MenubarModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    AppRoutingModule,
    CalendarModule,
    DropdownModule,
    SelectButtonModule,
    InputNumberModule,
    TabViewModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
