import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  numberFormat: string;
  angleUnit: string;
  decimalPlaces: number;
  theme: string;
  fontSize: string;
  boldFont: boolean;
  excludeInfoInProtocol: boolean;
  copySynopsisOnClick: boolean;
}

const initialState: SettingsState = {
  numberFormat: "de",
  angleUnit: "degrees",
  decimalPlaces: 5,
  theme: "light",
  fontSize: "normal",
  boldFont: false,
  excludeInfoInProtocol: true,
  copySynopsisOnClick: false,
};

export const themes = ["light", "dark"];
export const fontSizes = ["small", "medium", "large"];

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setNumberFormat: (state, action: PayloadAction<string>) => {
      state.numberFormat = action.payload === "en" ? action.payload : "de";
    },
    setAngleUnit: (state, action: PayloadAction<string>) => {
      state.angleUnit =
        action.payload === "radians" ? action.payload : "degrees";
    },
    setDecimalPlaces: (state, action: PayloadAction<number>) => {
      if (
        action.payload >= 0 &&
        action.payload <= 15 &&
        action.payload % 1 === 0
      ) {
        state.decimalPlaces = action.payload;
      }
    },
    setTheme: (state, action: PayloadAction<string>) => {
      if (themes.includes(action.payload)) {
        state.theme = action.payload;
      }
    },
    setFontSize: (state, action: PayloadAction<string>) => {
      if (fontSizes.includes(action.payload)) {
        state.fontSize = action.payload;
      }
    },
    setBoldFont: (state, action: PayloadAction<boolean>) => {
      state.boldFont = !!action.payload;
    },
    setExcludeInfoInProtocol: (state, action: PayloadAction<boolean>) => {
      state.excludeInfoInProtocol = !!action.payload;
    },
    setCopySynopsisOnClick: (state, action: PayloadAction<boolean>) => {
      state.copySynopsisOnClick = !!action.payload;
    },
  },
});

export default settingsSlice;
export const {
  setAngleUnit,
  setBoldFont,
  setCopySynopsisOnClick,
  setDecimalPlaces,
  setExcludeInfoInProtocol,
  setFontSize,
  setNumberFormat,
  setTheme,
} = settingsSlice.actions;
