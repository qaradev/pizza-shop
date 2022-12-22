import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import cart from './cart/slice';
import pizza from './pizza/slice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>()