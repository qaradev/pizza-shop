import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0
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
            state.totalPrice = state.items.reduce((sum, obj) => sum + (obj.price * obj.count), 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter(i => i.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
        decrementCount(state, action) {
            if (action.payload.count > 1) {
                state.items.find(obj => obj.id === action.payload.id).count--
            } else {
                state.items = state.items.filter(obj => obj.id !== action.payload.id)
            }
            state.totalPrice = state.items.reduce((sum, obj) => sum + (obj.price * obj.count), 0)
        }
    },
})

export const { addToCartItem, clearItems, removeItem, incrementCount, decrementCount } = cartSlice.actions

export default cartSlice.reducer