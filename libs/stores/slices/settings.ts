import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import defaultProfile from "../profile";
export interface SettingsState {
  language: string;
  numberFormat: string;
  angleUnit: string;
  decimalPlaces: number;
  theme: string;
  fontSize: string;
  boldFont: boolean;
  excludeInfoInProtocol: boolean;
  copySynopsisOnClick: boolean;
}

export const initialState = defaultProfile.settings;

export const themes = ["light", "dark"];
export const fontSizes = ["small", "medium", "large"];
export const languages = ["de", "en"];
export const numberFormats = ["de", "en", "default"];

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      if (languages.includes(action.payload)) {
        state.language = action.payload;
      }
    },
    setNumberFormat: (state, action: PayloadAction<string>) => {
      if (numberFormats.includes(action.payload)) {
        state.numberFormat = action.payload;
      }
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
  setLanguage,
  setAngleUnit,
  setBoldFont,
  setCopySynopsisOnClick,
  setDecimalPlaces,
  setExcludeInfoInProtocol,
  setFontSize,
  setNumberFormat,
  setTheme,
} = settingsSlice.actions;
