export type PizzaItem = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    type: number[];
    size: number[];
    rating: number;
}

export interface IPizzaItems {
    items: PizzaItem[];
    status: 'loading' | 'success' | 'error';
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type FetchPizzaProps = {
    currentPage: number;
    category: string;
    sortBy: string;
    order: string
    searchValue: string
}