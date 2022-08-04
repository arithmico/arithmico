import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppearanceSettingsState {
  theme: string;
  fontSize: string;
  boldFont: boolean;
}

const initialState: AppearanceSettingsState = {
  theme: "light",
  fontSize: "medium",
  boldFont: false,
};

const appearanceSettingsSlice = createSlice({
  name: "appearance-settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload === "dark" ? "dark" : "light";
    },
    setFontSize: (state, action: PayloadAction<string>) => {
      if (!["small", "medium", "large"].includes(action.payload)) {
        state.fontSize = initialState.fontSize;
      } else {
        state.fontSize = action.payload;
      }
    },
    setBoldFont: (state, action: PayloadAction<boolean>) => {
      state.boldFont = action.payload;
    },
  },
});

export const { setBoldFont, setFontSize, setTheme } =
  appearanceSettingsSlice.actions;

export default appearanceSettingsSlice;
