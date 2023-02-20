import { configureStore} from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import authReducer from './auth/authSlice';
import searchReducer from './search/searchSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    search: searchReducer
  }
});