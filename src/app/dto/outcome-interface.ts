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