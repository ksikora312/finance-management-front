import { Injectable } from "@angular/core";
import { ShoppingListElement, TodoListElement } from "../dto/list.interface";

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

    sortByDoneShopping(array: Array<ShoppingListElement>): Array<ShoppingListElement> {
      const clonedArray: Array<ShoppingListElement> = [];
      array.forEach(e => clonedArray.push(Object.assign({}, e)));
      clonedArray.sort((a, b) => {
          return a.done == b.done? 0 : a.done? 1 : -1;
      });
      return clonedArray;
  };
  }