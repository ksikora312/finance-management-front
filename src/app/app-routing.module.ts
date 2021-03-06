import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoListOverviewComponent } from './components/todo-list-overview/todo-list-overview.component';
import { OutcomeOverviewComponent } from './outcome/outcome-overview/outcome-overview.component';
import { ShoppingListOverviewComponent } from './shopping-list/shopping-list-overview/shopping-list-overview.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo-list/view', component: TodoListOverviewComponent },
  { path: 'shopping-list/view', component: ShoppingListOverviewComponent },
  { path: 'outcomes/view', component: OutcomeOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
