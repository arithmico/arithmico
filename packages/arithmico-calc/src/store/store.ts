import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/es/storage";
import calculatorSessionSlice from "./slices/session.slice";
import settingsSlice, { SettingsState } from "./slices/settings.slice";

const persistConfig = {
  key: "settings",
  version: 1,
  storage,
};

const settingsReducer = persistReducer<SettingsState>(
  persistConfig,
  settingsSlice.reducer
);

const calculatorStore = configureStore({
  reducer: {
    session: calculatorSessionSlice.reducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type CalculatorRootState = ReturnType<
  (typeof calculatorStore)["getState"]
> & { settings: SettingsState };

export default calculatorStore;
