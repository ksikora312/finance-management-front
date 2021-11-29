import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TodoList } from '../dto/todo-list.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  PRIMARY_LIST_ENDPOINT = `${environment.hostUrl}/list/todo`;

  constructor(private httpCLient: HttpClient) { }

  getPrimaryList(): Observable<TodoList> {
    return this.httpCLient.get(this.PRIMARY_LIST_ENDPOINT) as Observable<TodoList>;
  }
}
