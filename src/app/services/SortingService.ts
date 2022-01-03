import { Injectable } from "@angular/core";
import { TodoListElement } from "../dto/list.interface";

@Injectable({
    providedIn: 'root'
  })
  export class SortingService {


    sortByDone(array: Array<TodoListElement>): Array<TodoListElement> {
        const clonedArray: Array<TodoListElement> = [];
        array.forEach(e => clonedArray.push(Object.assign({}, e)));
        clonedArray.sort((a, b) => {
            return a.done == b.done? 0 : a.done? 1 : -1;
        });
        return clonedArray;
    };

  }