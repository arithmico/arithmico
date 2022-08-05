import { configureStore } from "@reduxjs/toolkit";
import calculatorSessionSlice from "./calc-slices/calculator-session-slice";
import calculatorSettingsSlice from "./calc-slices/calculator-settings-slice";
import globalAppearanceSettingsSlice from "./global-slices/appearance-settings-slice";
import globalEngineSettingsSlice from "./global-slices/engine-settings-slice";
import globalLanguageSettingsSlice from "./global-slices/langugage-settings-slice";

const calculatorStore = configureStore({
  reducer: {
    calculatorSession: calculatorSessionSlice.reducer,
    calculatorSettings: calculatorSettingsSlice.reducer,
    globalAppearanceSettings: globalAppearanceSettingsSlice.reducer,
    globalEngineSettings: globalEngineSettingsSlice.reducer,
    globalLanguageSettings: globalLanguageSettingsSlice.reducer,
  },
});

export type CalculatorRootState = ReturnType<
  typeof calculatorStore["getState"]
>;

export default calculatorStore;
