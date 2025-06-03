import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    tasks: taskReducer,
  },
});
