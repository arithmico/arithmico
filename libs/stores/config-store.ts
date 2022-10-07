import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./slices/settings";

const configStore = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
  },
});

export type ConfigRootState = ReturnType<typeof configStore["getState"]>;

export default configStore;
