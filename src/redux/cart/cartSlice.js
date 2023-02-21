import { createSlice } from '@reduxjs/toolkit';
import { CartStatus } from './cartStatus';
import {
  clearCartAsync,
  fetchCartItemsAsync,
  putItemToCartAsync,
  removeCartItemAsync,
  updateItemQuantityAsync,
} from "./thunks";


const initialState = {
  cartId: "",
  items: [],
  status: CartStatus.Idle,
  error: null
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload.cartId;
      console.log("setting id", action.payload.id);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCartItemsAsync.pending, (state, action) => {
        state.status = CartStatus.Loading;
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = CartStatus.Succeeded;
        state.items = action.payload.items;
        state.cartId = action.payload.cartId;
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.status = CartStatus.Failed;
        state.error = action.error.message;
      })
      .addCase(updateItemQuantityAsync.fulfilled, (state, action) => {
        const { item, newQuantity } = action.payload;
        state.items = state.items.map((i) => {
          if (i.productId === item.productId)
            return { ...i, itemQuantity: newQuantity };
          return i;
        });
      })
      .addCase(putItemToCartAsync.fulfilled, (state, action) => {
        const { item } = action.payload;
        const index = state.items.findIndex(
          (i) => i.productId === item.productId
        );
        if (index < 0) 
          state.items.push(item);
        else state.items[index].itemQuantity += item.itemQuantity;
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        const removeId = action.payload.productId;
        state.items = state.items.filter((item) => item.productId !== removeId);
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
export const {setCartId} = cartSlice.actions;
