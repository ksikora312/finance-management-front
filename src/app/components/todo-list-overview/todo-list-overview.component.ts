import { Component, OnInit } from '@angular/core';
import { TodoList } from 'src/app/dto/todo-list.interface';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list-overview',
  templateUrl: './todo-list-overview.component.html',
  styleUrls: ['./todo-list-overview.component.scss']
})
export class TodoListOverviewComponent implements OnInit {

  todoList = {} as TodoList;
  
  tableHeaders = ['Done', 'Name', 'Priority', 'Added', 'Due Date', 'Description']
  
  constructor(private todoService: TodoListService) { }

  ngOnInit(): void {
    this.todoService.getPrimaryList().subscribe(r => this.todoList = r);
  }

  openNewElementDialog() {

  }

  openNewListDialog() {

  }

  deleteList() {

  }
}
