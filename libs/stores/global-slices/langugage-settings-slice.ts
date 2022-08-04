import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageSettingsState {
  language: string;
}

const initialState: LanguageSettingsState = {
  language: "en",
};

const languageSettingsSlice = createSlice({
  name: "language-settings",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload === "de" ? "de" : "en";
    },
  },
});

export const { setLanguage } = languageSettingsSlice.actions;

export default languageSettingsSlice;
