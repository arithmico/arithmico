import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface engineFeaturesState {
  objects: string[];
  functions: string[];
  constants: string[];
  methods: string[];
  operators: string[];
}

const engineFeaturesSlice = createSlice({
  name: "engine-features",
  initialState: (): engineFeaturesState => ({
    objects: ["boolean", "number", "string", "symbol", "vector"],
    functions: [],
    constants: [],
    methods: [],
    operators: [
      "define",
      "lambda",
      "functionCall",
      "methodCall",
      "orBooleanBoolean",
      "orFunctionFunction",
      "andBooleanBoolean",
      "andFunctionFunction",
      "negateNumber",
      "negateBoolean",
      "negateFunction",
      "equalsNumberNumber",
      "equalsBooleanBoolean",
      "equalsFunctionFunction",
      "lessNumberNumber",
      "lessFunctionFunction",
      "lessOrEqualsNumberNumber",
      "lessOrEqualsFunctionFunction",
      "greaterNumberNumber",
      "greaterFunctionFunction",
      "greaterOrEqualsNumberNumber",
      "greaterOrEqualsFunctionFunction",
      "plusNumberNumber",
      "plusVectorVector",
      "plusFunctionFunction",
      "minusNumberNumber",
      "minusVectorVector",
      "minusFunctionFunction",
      "timesNumberNumber",
      "timesNumberVector",
      "timesVectorVector",
      "timesVectorMatrix",
      "timesMatrixMatrix",
      "timesFunctionFunction",
      "dividedNumberNumber",
      "dividedVectorNumber",
      "dividedFunctionFunction",
      "powerNumberNumber",
      "powerFunctionFunction",
    ],
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
export const { toggleFunction, toggleConstant, toggleMethod } =
  engineFeaturesSlice.actions;
