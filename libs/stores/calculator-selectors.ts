import { CalculatorRootState } from "./calculator-store";

export const selectLanguage = (state: CalculatorRootState) =>
  state.globalLanguageSettings.language;

export const selectCopySynopsisOnClick = (state: CalculatorRootState) =>
  state.calculatorSettings.copySynopsisOnClick;

export const selectExcludeInfoInProtocol = (state: CalculatorRootState) =>
  state.calculatorSettings.excludeInfoInProtocol;
