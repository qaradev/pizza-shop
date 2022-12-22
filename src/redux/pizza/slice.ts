import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzaProps, IPizzaItems, PizzaItem, Status } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaProps>('pizzas/fetchPizzaStatus', async (params) => {
    const { currentPage, category, sortBy, order, searchValue } = params;
    const { data } = await axios.get<PizzaItem[]>(
        `https://639ca75242e3ad6927387619.mockapi.io/items?page=${currentPage}&limit=4&${category}&orderBy=${sortBy}&order=${order}&search=${searchValue}`
    );
    return data;
});


const initialState: IPizzaItems = {
    items: [],
    status: Status.LOADING // loading | success | error
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS
        })
    },
});


export default pizzaSlice.reducer;
