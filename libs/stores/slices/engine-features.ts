import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface engineFeaturesState {
  functions: string[];
  constants: string[];
  methods: string[];
}

const engineFeaturesSlice = createSlice({
  name: "engine-features",
  initialState: (): engineFeaturesState => ({
    functions: [],
    constants: [],
    methods: [],
  }),
  reducers: {
    toggleFunction: (state, action: PayloadAction<string>) => {
      if (state.functions.includes(action.payload)) {
        state.functions = state.functions.filter((o) => o !== action.payload);
      } else {
        state.functions = [...state.functions, action.payload];
      }
    },
    toggleConstant: (state, action: PayloadAction<string>) => {
      if (state.constants.includes(action.payload)) {
        state.constants = state.constants.filter((o) => o !== action.payload);
      } else {
        state.constants = [...state.constants, action.payload];
      }
    },
    toggleMethod: (state, action: PayloadAction<string>) => {
      if (state.methods.includes(action.payload)) {
        state.methods = state.methods.filter((o) => o !== action.payload);
      } else {
        state.methods = [...state.methods, action.payload];
      }
    },
  },
});

export default engineFeaturesSlice;
export const { toggleConstant, toggleFunction, toggleMethod } =
  engineFeaturesSlice.actions;
