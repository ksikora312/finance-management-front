import { Component, OnInit } from '@angular/core';
import { TodoListsOverview } from 'src/app/dto/todo-list.interface';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list-overview',
  templateUrl: './todo-list-overview.component.html',
  styleUrls: ['./todo-list-overview.component.scss']
})
export class TodoListOverviewComponent implements OnInit {

  overviews = {} as TodoListsOverview;  
  
  constructor(private todoService: TodoListService) { }

  ngOnInit(): void {
    this.todoService.getListsOverview().subscribe(r => this.overviews = r);
  }



}
