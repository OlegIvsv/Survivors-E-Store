import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { setCartId } from "./cartSlice";

const apiClient = axios.create({
  baseURL: "http://localhost:80/api/Cart",
});

export const fetchCartItemsAsync = createAsyncThunk(
  "cart/fetchCartItemsAsync",
  async (_, { getState, rejectWithValue, dispatch }) => {

    const state = getState();
    let cartId = state.cart.cartId;

    try {
      /* If is not set */
      if (!cartId) {
        /* Try to use user id */
        cartId = state.auth.id;
        if(cartId)
          dispatch(setCartId({cartId}));
        /* If user is not set, then get id from storage */
        else{
          cartId = getCartIdFromStorage();
          /* If there's no cart id in storage, then create new anonymous cart */
          if (cartId == null) {
            const cart = await createAnonymousCartAsync();
            cartId = cart.customerId;
            setCartIdToStorage(cartId);
            dispatch(setCartId({ cartId }));
          }
          /* Else if there's id in storage, we use it */
          else
            dispatch(setCartId({ cartId }));
        }
      }
      
      let response = await apiClient.get(`/${cartId}`);
      /* 404 status means that cart was deleted from database, so new one is created */
      if(response.status === 404){
        const cart = await createAnonymousCartAsync();
        setCartIdToStorage(cart.customerId);
        dispatch(setCartId({cartId}));
        response = await apiClient.get(`/${cart.customerId}`);
      }

      if (response.status !== 200)
        return rejectWithValue(`Failure with status: ${response.status}`);

      return {
        items:response.data.items, 
        cartId: response.data.customerId
      };

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async ({ productId }, { getState, rejectWithValue }) => {
    const customerId = getState().cart.cartId;
    try {
      const response = await apiClient.put(`/remove-item/${customerId}`, 
        null,
        { params:{productId}}
      );
      if (response.status !== 200)
        rejectWithValue(`Failure removeing item. Status: ${response.status}`);
      return { productId };
    } catch (error) {
      return error.message;
    }
  }
);

export const updateItemQuantityAsync = createAsyncThunk(
  "cart/updateItemQuantityAsync",
  async ({ item, newQuantity }, { getState, rejectWithValue }) => {
    const customerId = getState().cart.cartId;
    try {
      const response = await apiClient.put(`/update-item/${customerId}`, {
        ...item,
        itemQuantity: newQuantity,
      });
      if (response.status !== 200)
        rejectWithValue(`Failure updating item. Status: ${response.status}`);
      return { item, newQuantity };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const putItemToCartAsync = createAsyncThunk(
  "cart/putItemToCartAsync",
  async ({ item }, { getState, rejectWithValue }) => {
    const customerId = getState().cart.cartId;
    try {
      const response = await apiClient.put(`/put-item/${customerId}`, item);
      if (response.status !== 200)
        rejectWithValue(`Failure putting item. Status: ${response.status}`);
      return { item };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async (_, { getState, rejectWithValue }) => {
    const customerId = getState().cart.cartId;
    try {
      const response = await apiClient.put(`/clear/${customerId}`);

      if (response.status !== 200) {
        rejectWithValue(`Failure clearing cart. Status: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const createAnonymousCartAsync = async () => {
  const cartId = uuidv4();
  const response = await apiClient.post(`/${cartId}`);
  if (response.status !== 201)
    throw new Error(
      `Failed creating anonymous cart. Status: ${response.status}`
    );
  return response.data;
};

function getCartIdFromStorage(){
  return localStorage.getItem("anonymousCart");
};

function setCartIdToStorage(id){
  localStorage.setItem("anonymousCart", id);
}