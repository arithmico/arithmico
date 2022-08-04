import { getDefaultContext } from "@arithmico/engine";
import { Context } from "@arithmico/engine/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MathProtocolItem {
  type: "math";
  input: string;
  output: string;
}

export interface ErrorProtocolItem {
  type: "error";
  input: string;
  error: string;
}

export interface InfoProtocolItem {
  type: "info";
  info: string;
}

export type ProtocolItem =
  | MathProtocolItem
  | ErrorProtocolItem
  | InfoProtocolItem;

export type Protocol = ProtocolItem[];

interface CalculatorSessionState {
  input: string;
  stack: Context["stack"];
  historyIndex: number;
  outputResetted: boolean;
  protocol: Protocol;
}

const initialState: CalculatorSessionState = {
  input: "",
  stack: getDefaultContext().stack,
  historyIndex: 0,
  outputResetted: false,
  protocol: [],
};

const calculatorSessionSlice = createSlice({
  name: "calculator-session",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    addProtocolItem: (state, action: PayloadAction<ProtocolItem>) => {
      state.protocol.push(action.payload);
    },
    resetProtocol: (state) => {
      state.protocol = initialState.protocol;
    },
    setStack: (state, action: PayloadAction<Context["stack"]>) => {
      state.stack = action.payload;
    },
    resetStack: (state) => {
      state.stack = initialState.stack;
    },
    setOutputResetted: (state, action: PayloadAction<boolean>) => {
      state.outputResetted = action.payload;
    },
  },
});

export const {
  addProtocolItem,
  resetProtocol,
  resetStack,
  setInput,
  setOutputResetted,
  setStack,
} = calculatorSessionSlice.actions;

export default calculatorSessionSlice;
