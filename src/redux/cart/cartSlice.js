import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setId } from '../auth/authSlice';

/* Test API */
const baseUrl = 'http://localhost:80/api/Cart';

const initialState = {
  items: [],
  status: "idle" /* idle | succeeded | loading | failed */,
  error: null
};

export const fetchCartItemsAsync = createAsyncThunk(
  "cart/fetchCartItemsAsync",
  async function (_, { getState, rejectWithValue, dispatch }) {
    let customerId = getState().auth.id;
    let token = getState().auth.token;
    try {

      if(!token || !customerId){
        localStorage.setItem("anonymousCart", 'ADCF1516-7CCD-4A8F-962A-D7F358A163FD');
        customerId = localStorage.getItem("anonymousCart");
        dispatch(setId({id: customerId}));
      }

      const response = await fetch(`${baseUrl}/${customerId}`);

      if (response.status != 200)
        return rejectWithValue(`Failure with status: ${response.status}`);

      const body = await response.json();
      return body.items;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async function ({ productId }, { getState, rejectWithValue }) {
    const customerId = getState().auth.id;
    try {
      const response = await fetch(
        `${baseUrl}/remove-item/${customerId}?productId=${productId}`,
        {
          method: "PUT",
        }
      );

      if (response.status != 200)
        rejectWithValue(`Failure with status: ${response.status}`);

      return { productId };
    } catch (error) {
      return error.message;
    }
  }
);

export const updateItemQuantityAsync = createAsyncThunk(
  "cart/updateItemQuantityAsync",
  async function ({ item, newQuantity }, { getState, rejectWithValue }) {
    const customerId = getState().auth.id;
    try {
      const response = await fetch(`${baseUrl}/update-item/${customerId}`, {
        method: "PUT",
        body: JSON.stringify({ ...item, itemQuantity: newQuantity }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status != 200)
        rejectWithValue(`Failure with status: ${response.status}`);

      return { item, newQuantity };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async function (_, { getState, rejectWithValue }) {
    const customerId = getState().auth.id;
    try {
      const response = await fetch(`${baseUrl}/clear/${customerId}`, {
        method: "PUT",
      });

      if (response.status != 200)
        rejectWithValue(`Failure with status: ${response.status}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCartItemsAsync.pending, (state, action) => {
        console.log("LOADING");
        state.status = "loading";
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateItemQuantityAsync.fulfilled, (state, action) => {
        const {item, newQuantity} = action.payload;
        state.items = state.items.map((i) => {
          if (i.productId === item.productId)
            return { ...i, itemQuantity: newQuantity };
          return i;
        });
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        const removeId = action.payload.productId;
        state.items = state.items.filter((item) => item.productId !== removeId);
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.items = [];
      });
  }  
});

export default cartSlice.reducer;

export const { 
  removeCartItem, 
  updateItemQuantity, 
  clearCart } = cartSlice.actions; 

export const cartItemsSelector = (state) =>  state.cart.items;
export const cartStatusSelector = (state) => state.cart.status;
export const cartErrorSelector = (state) => state.cart.error;
export const cartItemCountSelector = (state) => { 
  return state.cart.items
    .reduce((total, next) => total + next.itemQuantity, 0);
}

