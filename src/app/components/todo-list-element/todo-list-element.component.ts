import { Component, Input, OnInit } from '@angular/core';
import { TodoList, TodoListElement } from 'src/app/dto/todo-list.interface';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list-element',
  templateUrl: './todo-list-element.component.html',
  styleUrls: ['./todo-list-element.component.scss']
})
export class TodoListElementComponent implements OnInit {

  @Input() element: TodoListElement = {
    addedDate: '',
    description: '',
    done: false,
    dueDate: '',
    elementId: 0,
    name: '',
    priority: ''
  };

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
    console.log(this.element);
  }

  markElement() {
    this.todoListService.markElementAs(this.element.elementId, this.element.done)
    .subscribe(result => this.element = result);
  }

}
