import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EngineSettingsState {
  numberFormat: string;
  angleUnit: string;
  decimalPlaces: number;
}

const initialState: EngineSettingsState = {
  numberFormat: "en",
  angleUnit: "degrees",
  decimalPlaces: 5,
};

const engineSettingsSlice = createSlice({
  name: "engine-settings",
  initialState,
  reducers: {
    setNumberFormat: (state, action: PayloadAction<string>) => {
      state.numberFormat = action.payload === "en" ? "en" : "de";
    },
    setAngleUnit: (state, action: PayloadAction<string>) => {
      state.angleUnit = action.payload === "radians" ? "radians" : "degrees";
    },
    setDecimalPlaces: (state, action: PayloadAction<number>) => {
      state.decimalPlaces =
        action.payload >= 0 && action.payload <= 15
          ? action.payload
          : initialState.decimalPlaces;
    },
  },
});

export const { setNumberFormat, setAngleUnit, setDecimalPlaces } =
  engineSettingsSlice.actions;

export default engineSettingsSlice;
