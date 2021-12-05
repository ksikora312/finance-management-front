import { Component, Input, OnInit } from '@angular/core';
import { TodoList } from 'src/app/dto/todo-list.interface';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.scss']
})
export class TodoListViewComponent implements OnInit {

  @Input() listId: number = 0;

  todoList = {} as TodoList;
  
  constructor(private todoService: TodoListService) { }

  ngOnInit(): void {
    console.log(this.listId);
    this.todoService.getListById(this.listId).subscribe(r => this.todoList = r);
  }

  openNewElementDialog() {

  }

  deleteList() {

  }
}
