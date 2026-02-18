import { configureStore } from "@reduxjs/toolkit";
import counterReducre from "./counter";
import authReducer from "./auth";

const store = configureStore({
  reducer: { counter: counterReducre, auth: authReducer },
});

export default store;
