export interface TodoListElement {
    addedDate: string;
    description: string;
    done: boolean;
    dueDate: string;
    elementId: number;
    name: string;
    priority: string;
}

export interface TodoList extends TodoListOverview {
    elements: Array<TodoListElement>;
}

export interface TodoListOverview {
    listId: number;
    name: string;
    isPrimary: boolean;
}

export interface TodoListsOverview {
    lists: Array<TodoListOverview>;
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