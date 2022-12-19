import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sort: {
        name: "популярности (ASC)",
        sortProperty: "rating",
    },
    currentPage: 1
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortType(state, action) {
            state.sort = action.payload
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.page)
            state.categoryId = Number(action.payload.category)
            state.sort.sortProperty = action.payload.sortProperty
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        }
    },
})

export const { setCategoryId, setSortType, setFilters, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer