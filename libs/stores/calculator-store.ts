import { configureStore } from "@reduxjs/toolkit";
import calculatorSessionSlice from "./slices/calculator-session";
import settingsSlice from "./slices/settings";

const calculatorStore = configureStore({
  reducer: {
    session: calculatorSessionSlice.reducer,
    settings: settingsSlice.reducer,
  },
});

export type CalculatorRootState = ReturnType<
  typeof calculatorStore["getState"]
>;

export default calculatorStore;
