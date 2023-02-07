import { configureStore} from '@reduxjs/toolkit';
import { api } from './auth/api';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(api.middleware)
});