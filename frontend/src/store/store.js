import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import authService from './services/authServices'
import userServices from "./services/userServices";


const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [userServices.reducerPath]: userServices.reducer,
    authReducer:authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authService.middleware,userServices.middleware]),
});

export default store;
