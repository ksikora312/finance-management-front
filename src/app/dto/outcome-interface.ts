export interface Outcome {
    name: string;
    value: number;
    categoryId: number;
}

export interface NewRegularOutcome extends Outcome {
    date: string;
    description: string;
}

export interface NewContinuityOutcome extends Outcome {
    description: string;
    timeIntervalInDays: number;
    createOutcome: boolean;
}

export interface Category {
    id: number;
    name: string;
}

export interface Categories {
    categories: Array<Category>;
}

export interface OutcomeOverview {
    id: number;
    name: string;
    value: number;
    type: string;
    date: string;
    category: string;
}

export enum OverviewType {
    ALL,
    REGULAR_SINGLE_OUTCOME,
    CONTINUITY_SINGLE_OUTCOME,
    SHOPPING_LIST_SINGLE_OUTCOME,
    CONTINUITY_OUTCOME
};

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Page<T> {
    content: Array<T>;

    pageable: Pageable;

    last: boolean;
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}