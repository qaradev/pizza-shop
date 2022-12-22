import { createSlice } from '@reduxjs/toolkit'
import { getCartFromLC } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { ICartSlice } from './types';

const { items, totalPrice } = getCartFromLC()

const initialState: ICartSlice = {
    items,
    totalPrice
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCartItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem(state, action) {
            state.items = state.items.filter(i => i.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
        decrementCount(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            findItem && findItem.count--

            state.totalPrice = calcTotalPrice(state.items)
        }
    },
})


export const { addToCartItem, clearItems, removeItem, decrementCount } = cartSlice.actions

export default cartSlice.reducer