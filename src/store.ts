import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./store/billSlice";

export const store = configureStore({
  reducer: {
    billData: billReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
