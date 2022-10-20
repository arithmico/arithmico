import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./slices/settings";
import configProfileSlice from "./slices/config-profile";

const configStore = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    profile: configProfileSlice.reducer,
  },
});

export type ConfigRootState = ReturnType<typeof configStore["getState"]>;

export default configStore;
