import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalculatorSettingsState {
  excludeInfoInProtocol: boolean;
  copySynopsisOnClick: boolean;
}

const initialState: CalculatorSettingsState = {
  excludeInfoInProtocol: true,
  copySynopsisOnClick: true,
};

const calculatorSettingsSlice = createSlice({
  name: "calculator-settings",
  initialState,
  reducers: {
    setExcludeInfoInProtocol: (state, action: PayloadAction<boolean>) => {
      state.excludeInfoInProtocol = action.payload;
    },
    setCopySynopsisOnClick: (state, action: PayloadAction<boolean>) => {
      state.copySynopsisOnClick = action.payload;
    },
  },
});

export const { setCopySynopsisOnClick, setExcludeInfoInProtocol } =
  calculatorSettingsSlice.actions;

export default calculatorSettingsSlice;
