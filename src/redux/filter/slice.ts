import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceState, SortItem, SortPropertyEnum } from './types';


const initialState: FilterSliceState = {
    categoryId: 0,
    sort: {
        name: "популярности (DESC)",
        sortProperty: SortPropertyEnum.RATING_DESC,
    },
    currentPage: 1,
    searchValue: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSortType(state, action: PayloadAction<SortItem>) {
            state.sort = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = action.payload.currentPage
            state.categoryId = action.payload.categoryId
            state.sort = action.payload.sort
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        }
    },
})


export const { setCategoryId, setSortType, setFilters, setCurrentPage, setSearchValue } = filterSlice.actions

export default filterSlice.reducer