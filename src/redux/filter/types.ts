export interface SortItem {
    name: string;
    sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
    categoryId: number;
    sort: SortItem;
    currentPage: number;
    searchValue: string;
}

export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}