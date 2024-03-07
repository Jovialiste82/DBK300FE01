// frontend/src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import adReducer from "./slices/adSlice";
import { apiSlice } from "./services/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    ad: adReducer,
  },

  // getDefaultMiddleware: This is a function provided by Redux Toolkit
  // that returns an array of default middleware provided by Redux Toolkit itself,
  // which includes thunk middleware for handling asynchronous actions,
  // immutability middleware, and serializability middleware.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
