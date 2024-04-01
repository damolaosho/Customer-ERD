import { configureStore } from '@reduxjs/toolkit';
import cartsSlice from '../features/carts/cartsSlice';
import authSlice from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    carts: cartsSlice,
    auth: authSlice,
  },
});
