import { Component, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogContent } from 'primeng/dynamicdialog/dynamicdialogcontent';
import { ChangeListName, EventType, NewTodoList, TodoListsOverview } from 'src/app/dto/list.interface';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list-overview',
  templateUrl: './todo-list-overview.component.html',
  styleUrls: ['./todo-list-overview.component.scss']
})
export class TodoListOverviewComponent implements OnInit {

  overviews = {} as TodoListsOverview;  
  showNewListDialog = false;
  showEditListNameDialog = false;
  newListModel = {name: '', isPrimary: false} as NewTodoList;
  listNameModel = {} as ChangeListName;

  @ViewChild('newListDialog', {read: TemplateRef})
  newListDialog!: TemplateRef<any>;

  constructor(private todoService: TodoListService, private dialogService: DialogService, private view: ViewContainerRef) { }

  ngOnInit(): void {
    this.todoService.getListsOverview().subscribe(r => { 
      this.overviews = r 
    });
  }

  openNewListDialog() {
    this.newListModel = {name: '', isPrimary: false} as NewTodoList;
    this.showNewListDialog = true;
  }

  createNewList() {
    this.todoService.createNewList(this.newListModel).subscribe(r => 
      this.refresh());
      this.showNewListDialog = false;
  }

  openEditListName(listId: number, listName: string) {
    this.listNameModel.listId = listId;
    this.listNameModel.name = listName;
    this.showEditListNameDialog = true;
  }

  editListName() {
    this.todoService.changeListName(this.listNameModel).subscribe(r => 
      this.refresh());
      this.showEditListNameDialog = false;
  }

  refresh(eventType?: EventType) {
    this.todoService.getListsOverview().subscribe(r => {
      this.overviews = r;
    });
  }

}
