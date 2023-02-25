import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchCartItemsAsync",
  async ({ id }, { rejectWithValue }) => {
    // fetch product with axios
  }
);

const initialState = {
  product: undefined,
  state: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProductByIdAsync.pending, (state, action) => {
      //set values or something
    });
    builder.addCase(fetchProductByIdAsync.rejected, (state, action) => {
      //set values or something
    });
    builder.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
      //set values or something
    });
  },
});

export default productSlice.reducer;
export const {} = searchSlice.actions;
