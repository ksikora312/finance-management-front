import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventType, NewTodoListElement, Priority, TodoList } from 'src/app/dto/list.interface';
import { SortingService } from 'src/app/services/SortingService';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.scss']
})
export class TodoListViewComponent implements OnInit {

  @Input() listId: number = 0;

  @Output() eventType: EventEmitter<EventType> = new EventEmitter<EventType>();

  todoList = {} as TodoList;
  showNewElementDialog = false;
  newElement = {} as NewTodoListElement;
  availablePriorities = Object.keys(Priority).filter(v => isNaN(Number(v)) === false).map((key) => Priority[Number(key)].toString());
  
  constructor(private todoService: TodoListService, private sortingService: SortingService) { }

  ngOnInit(): void {
    this.todoService.getListById(this.listId).subscribe(r => {
      this.todoList = r;
      this.sortElements();
    });
  }

  ngOnChanges() {

  }

  openNewElementDialog() {
    this.showNewElementDialog = true;
  }

  createNewElement() {
    this.newElement.listId = this.listId;
    this.newElement.description = '';
    this.todoService.createNewElement(this.newElement).subscribe(r => {
      this.todoList = r;
      this.showNewElementDialog = false;
      this.sortElements();
    });
  }

  deleteList() {
    this.todoService.deleteList(this.todoList.listId).subscribe(r => {
      this.eventType.emit(EventType.LIST_DELETE);
    })
  }

  markAsPrimary() {
    this.todoService.markListAsPrimary(this.todoList.listId).subscribe(r => {
      this.todoList = r
      this.todoService.getListById(this.listId).subscribe(r => this.todoList = r);
      this.eventType.emit(EventType.PRIMARY_CHANGE);
    });
  }

  refresh(event: EventType) {
    switch(event) {
      case EventType.STATUS_CHANGE:
        this.sortElements();
        break;
      case EventType.ELEMENT_DELETE:
        this.ngOnInit();
        break;
    }
  }

  private sortElements() {
    this.todoList.elements = this.sortingService.sortByDone(this.todoList.elements);
  }

}
