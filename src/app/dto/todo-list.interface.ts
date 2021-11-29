export interface TodoListElement {
    addedDate: string;
    description: string;
    done: boolean;
    dueDate: string;
    elementId: number;
    name: string;
    priority: string;
}

export interface TodoList {
    elements: Array<TodoListElement>;
    isPrimary: boolean;
    listId: number;
    name: string;
}