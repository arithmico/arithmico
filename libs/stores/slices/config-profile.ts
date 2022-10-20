import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigProfileState {
  objects: string[];
}

const configProfileSlice = createSlice({
  name: "config-profile",
  initialState: (): ConfigProfileState => ({ objects: [] }),
  reducers: {
    toggleObject: (state, action: PayloadAction<string>) => {
      if (state.objects.includes(action.payload)) {
        state.objects = state.objects.filter((o) => o !== action.payload);
      } else {
        state.objects = [...state.objects, action.payload];
      }
    },
  },
});

export default configProfileSlice;
export const { toggleObject } = configProfileSlice.actions;
