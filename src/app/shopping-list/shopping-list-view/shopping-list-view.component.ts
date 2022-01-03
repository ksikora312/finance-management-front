import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventType, NewShoppingListElement, ShoppingList } from 'src/app/dto/list.interface';
import { Categories } from 'src/app/dto/outcome-interface';
import { CategoryService } from 'src/app/services/category-service';
import { ShoppingListService } from 'src/app/services/shopping-list-service';
import { SortingService } from 'src/app/services/SortingService';

@Component({
  selector: 'app-shopping-list-view',
  templateUrl: './shopping-list-view.component.html',
  styleUrls: ['./shopping-list-view.component.scss']
})
export class ShoppingListViewComponent implements OnInit {

  @Input() listId: number = 0;

  @Output() eventType: EventEmitter<EventType> = new EventEmitter<EventType>();
  
  shoppingList = {} as ShoppingList;
  showNewElementDialog = false;
  newElement = {} as NewShoppingListElement;

  availableCategories: Categories = {
    categories: []
  };

  constructor(private listService: ShoppingListService, 
    private sortingService: SortingService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.listService.getListById(this.listId).subscribe(r => {
      this.shoppingList = r;
      this.sortElements();
    });
    this.categoryService.getCategories().subscribe(r => {
      this.availableCategories = r;
    });
  }

  openNewElementDialog() {
    this.showNewElementDialog = true;
  }

  createNewElement() {
    this.newElement.listId = this.listId;
    this.listService.createNewElement(this.newElement).subscribe(r => {
      this.shoppingList = r;
      this.showNewElementDialog = false;
      this.sortElements();
    });
  }

  deleteList() {
    this.listService.deleteList(this.shoppingList.listId).subscribe(r => {
      this.eventType.emit(EventType.LIST_DELETE);
    })
  }

  markAsPrimary() {
    this.listService.markListAsPrimary(this.shoppingList.listId).subscribe(r => {
      this.shoppingList = r
      this.listService.getListById(this.listId).subscribe(r => this.shoppingList = r);
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
    this.shoppingList.elements = this.sortingService.sortByDoneShopping(this.shoppingList.elements);
  }

}
