import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
  length: 0,
  total: 0,
};

export const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },

    addToCart: (state, action) => {
      let id;
      const foundState = state.carts.filter((cart, idx) => {
        id = idx;
        return cart.id === action.payload.id;
      });
      if (foundState.length > 0) {
        state.carts[id].quantity += 1;
      } else {
        state.carts.push({ ...action.payload, quantity: 1 });
      }

      state.length += 1;
      state.total += action.payload.price;
    },

    removeFromCart: (state, action) => {
      const prevState = state.carts.filter(
        (cart) => cart.id === action.payload
      );
      console.log({ prevState });
      const newState = state.carts.filter((cart) => cart.id !== action.payload);
      state.carts = newState;
      state.length -= 1;
    },
  },
});

export const { addToCart, removeFromCart, reset } = cartsSlice.actions;
export default cartsSlice.reducer;
