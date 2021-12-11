import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventType, TodoList } from 'src/app/dto/todo-list.interface';
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
  
  constructor(private todoService: TodoListService) { }

  ngOnInit(): void {
    this.todoService.getListById(this.listId).subscribe(r => this.todoList = r);
  }

  ngOnChanges() {

  }

  openNewElementDialog() {

  }

  deleteList() {

  }

  markAsPrimary() {
    this.todoService.markListAsPrimary(this.todoList.listId).subscribe(r => {
      this.todoList = r
      this.todoService.getListById(this.listId).subscribe(r => this.todoList = r);
      this.eventType.emit(EventType.PRIMARY_CHANGE);
    });
  }
}
