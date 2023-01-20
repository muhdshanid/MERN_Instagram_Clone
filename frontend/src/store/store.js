import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import authService from './services/authServices'
import messageService from "./services/messageServices";
import postServices from "./services/postServices";
import userServices from "./services/userServices";


const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [userServices.reducerPath]: userServices.reducer,
    [postServices.reducerPath]: postServices.reducer,
    [messageService.reducerPath]: messageService.reducer,
    authReducer:authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authService.middleware,userServices.middleware,postServices.middleware,
      messageService.middleware]),
});

export default store;
