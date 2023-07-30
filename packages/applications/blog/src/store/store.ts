import { configureStore } from "@reduxjs/toolkit";
import { contentApi } from "./api";

export const store = configureStore({
  reducer: {
    [contentApi.reducerPath]: contentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contentApi.middleware),
});
