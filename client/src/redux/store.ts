import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/AuthSlice';
import { useDispatch } from 'react-redux';


export const store = configureStore({
  reducer: { 
    authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch