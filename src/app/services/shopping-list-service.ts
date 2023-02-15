import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ChangeListName, ListsOverview, ListToOutcome, NewShoppingList, NewShoppingListElement, ShoppingList, ShoppingListElement } from "../dto/list.interface";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    SHOPPING_LIST_APPENDIX = '/list/shopping';
    SHOPPING_LIST_BASE_ENDPOINT = `${environment.hostUrl}${this.SHOPPING_LIST_APPENDIX}`;
    ELEMENT_ENDPOINT = `${environment.hostUrl}${this.SHOPPING_LIST_APPENDIX}/element`;
    SHOPPING_LISTS_OVERVIEW_ENDPOINT = `${environment.hostUrl}${this.SHOPPING_LIST_APPENDIX}/overview`;

    constructor(private httpClient: HttpClient) {
    }

    getListsOverview(): Observable<ListsOverview> {
        return this.httpClient.get(this.SHOPPING_LISTS_OVERVIEW_ENDPOINT) as Observable<ListsOverview>;
    }

    createNewElement(newElement: NewShoppingListElement): Observable<ShoppingList> {
        return this.httpClient.post(this.ELEMENT_ENDPOINT, newElement) as Observable<ShoppingList>;
    }

    createNewList(newList: NewShoppingList): Observable<ShoppingList> {
        return this.httpClient.post(this.SHOPPING_LIST_BASE_ENDPOINT, newList) as Observable<ShoppingList>;
    }

    markListAsPrimary(listId: number): Observable<ShoppingList> {
        const url = `${this.SHOPPING_LIST_BASE_ENDPOINT}/primary/${listId}`;
        return this.httpClient.put(url, null) as Observable<ShoppingList>;
    }

    changeListName(changeListName: ChangeListName): Observable<any> {
        const url = `${this.SHOPPING_LIST_BASE_ENDPOINT}/${changeListName.listId}/${changeListName.name}`;
        return this.httpClient.patch(url, null) as Observable<any>;
    }

    markElementAs(elementId: number, done: boolean): Observable<ShoppingListElement> {
        const url = `${this.ELEMENT_ENDPOINT}/${elementId}/${done}`;
        return this.httpClient.put(url, null) as Observable<ShoppingListElement>;
    }

    getListById(listId: number): Observable<ShoppingList> {
        const url = `${this.SHOPPING_LIST_BASE_ENDPOINT}/${listId}`;
        return this.httpClient.get(url) as Observable<ShoppingList>;
    }

    deleteListElement(elementId: number): Observable<ShoppingList> {
        const url = `${this.ELEMENT_ENDPOINT}/${elementId}`;
        return this.httpClient.delete(url) as Observable<ShoppingList>;
    }

    deleteList(listId: number): Observable<any> {
        const url = `${this.SHOPPING_LIST_BASE_ENDPOINT}/${listId}`;
        return this.httpClient.delete(url);
    }

    listToOutcome(content: ListToOutcome): Observable<any> {
        content.date = new DatePipe('en-US').transform(content.date, 'dd.MM.yyyy')!;
        const url = `${this.SHOPPING_LIST_BASE_ENDPOINT}/outcome`;
        return this.httpClient.post(url, content);
    }
}