import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./slices/settings";
import engineFeaturesSlice from "./slices/engine-features";

const configStore = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    engineFeatures: engineFeaturesSlice.reducer,
  },
});

export type ConfigRootState = ReturnType<(typeof configStore)["getState"]>;

export default configStore;
