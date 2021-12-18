import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventType, TodoList, TodoListElement } from 'src/app/dto/todo-list.interface';
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

  @Output() eventType: EventEmitter<EventType> = new EventEmitter<EventType>();

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.prettyFormatPriority();
  }

  ngOnChanges() {
    
  }

  markElement() {
    this.todoListService.markElementAs(this.element.elementId, this.element.done)
    .subscribe(result => {
      this.element = result;
      this.prettyFormatPriority();
      this.eventType.emit(EventType.STATUS_CHANGE);
    });
  }

  deleteElement() {
    this.todoListService.deleteListElement(this.element.elementId).subscribe(r => {
      this.eventType.emit(EventType.ELEMENT_DELETE);
    })
  }

  private prettyFormatPriority() {
    this.element.priority = this.element.priority.replace('_', ' ');
  }

}
