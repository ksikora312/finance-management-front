import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangeListName, NewTodoList, TodoList, TodoListElement, TodoListsOverview } from '../dto/todo-list.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  TODO_LIST_APPENDIX = '/list/todo';
  TODO_LIST_BASE_ENDPOINT = `${environment.hostUrl}${this.TODO_LIST_APPENDIX}`;
  ELEMENT_ENDPOINT = `${environment.hostUrl}${this.TODO_LIST_APPENDIX}/element`;
  TODO_LISTS_OVERVIEW_ENDPOINT =  `${environment.hostUrl}${this.TODO_LIST_APPENDIX}/overview`;

  constructor(private httpCLient: HttpClient) { }

  getPrimaryList(): Observable<TodoList> {
    return this.httpCLient.get(this.TODO_LIST_BASE_ENDPOINT) as Observable<TodoList>;
  }

  markElementAs(elementId: number, done: boolean): Observable<TodoListElement> {
    const url = `${this.ELEMENT_ENDPOINT}/${elementId}/${done}`;
    return this.httpCLient.put(url, null) as Observable<TodoListElement>;
  }

  markListAsPrimary(listId: number): Observable<TodoList> {
    console.log("MARKING LIST " + listId + " as primary");
    const url = `${this.TODO_LIST_BASE_ENDPOINT}/primary/${listId}`;
    return this.httpCLient.put(url, null) as Observable<TodoList>;
  }

  getListsOverview(): Observable<TodoListsOverview> {
    return this.httpCLient.get(this.TODO_LISTS_OVERVIEW_ENDPOINT) as Observable<TodoListsOverview>;
  }

  getListById(listId: number): Observable<TodoList> {
    const url = `${this.TODO_LIST_BASE_ENDPOINT}/${listId}`;
    return this.httpCLient.get(url) as Observable<TodoList>;
  }

  createNewList(list: NewTodoList): Observable<any> {
    return this.httpCLient.post(this.TODO_LIST_BASE_ENDPOINT, list) as Observable<any>;
  }

  changeListName(changeListName: ChangeListName): Observable<any> {
    const url = `${this.TODO_LIST_BASE_ENDPOINT}/${changeListName.listId}/${changeListName.name}`;
    return this.httpCLient.patch(url, null) as Observable<any>;
  }

}
