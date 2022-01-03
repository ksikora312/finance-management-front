export interface TodoListElement {
    addedDate: string;
    description: string;
    done: boolean;
    dueDate: string;
    elementId: number;
    name: string;
    priority: string;
}

export interface TodoList extends ListOverview {
    elements: Array<TodoListElement>;
}

export interface ListOverview {
    listId: number;
    name: string;
    isPrimary: boolean;
}

export interface ListsOverview {
    lists: Array<ListOverview>;
}

export interface NewTodoList {
    name: string;
    isPrimary: boolean;
}

export interface NewTodoListElement {
    listId: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
}

export enum Priority {
    LOW,
    MEDIUM,
    HIGH,
    VERY_HIGH,
    NOT_SPECIFIED
}

export interface ChangeListName {
    listId: number;
    name: string;
}

export enum EventType {
    PRIMARY_CHANGE,
    NEW_ELEMENT,
    STATUS_CHANGE,
    ELEMENT_DELETE,
    LIST_DELETE
}

export interface NewShoppingListElement {
    listId: number;
    name: string;
    categoryId: number;
    value: number;
}

export interface NewShoppingList {
    name: string;
    isPrimary: boolean;
    categoryId: number;
}

export interface ShoppingListElement {
    elementId: number;
    name: string;
    category: string;
    value: number;
    done: boolean;
}

export interface ShoppingList {
    listId: number;
    category: string;
    name: string;
    done: boolean;
    isPrimary: boolean;
    elements: Array<ShoppingListElement>;
}
