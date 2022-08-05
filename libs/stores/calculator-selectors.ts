import { CalculatorRootState } from "./calculator-store";

export const selectLanguage = (state: CalculatorRootState) =>
  state.globalLanguageSettings.language;

export const selectCopySynopsisOnClick = (state: CalculatorRootState) =>
  state.calculatorSettings.copySynopsisOnClick;

export const selectExcludeInfoInProtocol = (state: CalculatorRootState) =>
  state.calculatorSettings.excludeInfoInProtocol;

export const selectTheme = (state: CalculatorRootState) =>
  state.globalAppearanceSettings.theme;

export const selectFontSize = (state: CalculatorRootState) =>
  state.globalAppearanceSettings.fontSize;

export const selectBoldFont = (state: CalculatorRootState) =>
  state.globalAppearanceSettings.boldFont;
