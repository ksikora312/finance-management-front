import { Component, OnInit } from '@angular/core';
import { EventType, TodoListsOverview } from 'src/app/dto/todo-list.interface';
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
    this.todoService.getListsOverview().subscribe(r => { 
      this.overviews = r 
      console.log("ON INIT");
      console.log(this.overviews);
    });
  }

  openNewListDialog() {

  }

  refresh(eventType: EventType) {
    this.todoService.getListsOverview().subscribe(r => {
      this.overviews = r;
      console.log("ON REFRESH");
      console.log(r);
    });
  };

}
