import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import authService from './services/authServices'
import postServices from "./services/postServices";
import userServices from "./services/userServices";


const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [userServices.reducerPath]: userServices.reducer,
    [postServices.reducerPath]: postServices.reducer,
    authReducer:authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authService.middleware,userServices.middleware,postServices.middleware]),
});

export default store;
