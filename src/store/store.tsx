// store.ts
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
  },
  middleware: [],
});

export default store;
export type AppDispatch = typeof store.dispatch;