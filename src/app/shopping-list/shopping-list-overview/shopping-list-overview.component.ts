import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangeListName, EventType, ListsOverview, NewShoppingList } from 'src/app/dto/list.interface';
import { Categories } from 'src/app/dto/outcome-interface';
import { CategoryService } from 'src/app/services/category-service';
import { ShoppingListService } from 'src/app/services/shopping-list-service';

@Component({
  selector: 'app-shopping-list-overview',
  templateUrl: './shopping-list-overview.component.html',
  styleUrls: ['./shopping-list-overview.component.scss']
})
export class ShoppingListOverviewComponent implements OnInit {

  overviews = {} as ListsOverview;  
  showNewListDialog = false;
  showEditListNameDialog = false;
  newListModel = {name: '', isPrimary: false} as NewShoppingList;
  listNameModel = {} as ChangeListName;

  availableCategories: Categories = {
    categories: []
  };

  constructor(private listService: ShoppingListService, private categoryService: CategoryService, private dialogService: DialogService, private view: ViewContainerRef) { }

  ngOnInit(): void {
    this.listService.getListsOverview().subscribe(r => { 
      this.overviews = r 
    });
    this.categoryService.getCategories().subscribe(r => {
      this.availableCategories = r;
    });
  }

  openNewListDialog() {
    this.newListModel = {name: '', isPrimary: false} as NewShoppingList;
    this.showNewListDialog = true;
  }

  createNewList() {
    this.listService.createNewList(this.newListModel).subscribe(r => 
      this.refresh());
      this.showNewListDialog = false;
  }

  openEditListName(listId: number, listName: string) {
    this.listNameModel.listId = listId;
    this.listNameModel.name = listName;
    this.showEditListNameDialog = true;
  }

  editListName() {
    this.listService.changeListName(this.listNameModel).subscribe(r => 
      this.refresh());
      this.showEditListNameDialog = false;
  }

  refresh(eventType?: EventType) {
    this.listService.getListsOverview().subscribe(r => {
      this.overviews = r;
    });
  }

}
