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

export interface CategorySummary {
    category: string;
    moneySpent: number;
    values: Array<number>;
    outcomes: Array<number>;
    outcomesSum: number;
}

export interface OutcomeSummary {
    startDate: string;
    endDate: string;
    dates: Array<string>;
    outcomesByCategories: Array<CategorySummary>;
    moneySpent: number;
    totalOutcomes: number;
}

export interface ChartData {
    label: string;
    data: Array<number>;
    tension: number;
    borderColor?: string;
    backgroundColor?: string;
}

export interface ContinuityOutcomeDetails {
    id: number;
    name: string;
    active: boolean;
    addedDate: string;
    lastUsage: string;
    nextUsage: string;
    value: number;
    category: string;
    timeIntervalInDays: number;
}

export interface UpdateOutcome {
    id: number;
    name: string;
    value: number;
    date: string;
    categoryId: number;
}

export interface UpdateContinuityOutcome {
    id: number;
    name: string;
    value: number;
    timeIntervalInDays: number;
    categoryId: number;
}