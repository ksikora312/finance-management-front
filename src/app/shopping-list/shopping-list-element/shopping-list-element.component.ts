import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventType, ShoppingListElement } from 'src/app/dto/list.interface';
import { ShoppingListService } from 'src/app/services/shopping-list-service';

@Component({
  selector: 'app-shopping-list-element',
  templateUrl: './shopping-list-element.component.html',
  styleUrls: ['./shopping-list-element.component.scss']
})
export class ShoppingListElementComponent implements OnInit {

  @Input()
  element: ShoppingListElement = {
    elementId: 0,
    name: '',
    category: '',
    value: 0,
    done: false,
  }

  @Output() 
  eventType: EventEmitter<EventType> = new EventEmitter<EventType>();


  constructor(private listService: ShoppingListService) { }

  ngOnInit(): void {
  }

  markElement() {
    this.listService.markElementAs(this.element.elementId, this.element.done)
    .subscribe(result => {
      this.element = result;
      this.eventType.emit(EventType.STATUS_CHANGE);
    });
  }

  deleteElement() {
    this.listService.deleteListElement(this.element.elementId).subscribe(r => {
      this.eventType.emit(EventType.ELEMENT_DELETE);
    })
  }

}
