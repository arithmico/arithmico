import evaluateInput, { getDefaultContext } from "@arithmico/engine";
import {
  Context,
  EvaluationResult,
  TextResult,
} from "@arithmico/engine/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Output = (
  | Exclude<EvaluationResult, TextResult>
  | Omit<TextResult, "context">
) & { input: string };

export interface ProtocolItem {
  input: string;
  output: Output;
}

export type Protocol = ProtocolItem[];

interface CalculatorSessionState {
  input: string;
  output: Output;
  stack: Context["stack"];
  historyIndex: number;
  protocol: Protocol;
}

const emptyTextOutput: Output = { type: "text", text: "", input: "" };

const initialState = (): CalculatorSessionState => ({
  input: "",
  output: emptyTextOutput,
  stack: getDefaultContext().stack,
  historyIndex: 0,
  protocol: [],
});

const calculatorSessionSlice = createSlice({
  name: "calculator-session",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    resetProtocol: (state) => {
      state.protocol = initialState().protocol;
    },
    resetStack: (state) => {
      state.stack = initialState().stack;
    },
    resetOutput: (state) => {
      state.output = emptyTextOutput;
    },
    resetInput: (state) => {
      state.input = "";
    },
    resetDefinitions: (state) => {
      state.stack = getDefaultContext().stack;
    },
    resetAll: (state) => {
      state.stack = getDefaultContext().stack;
      state.input = "";
      state.output = emptyTextOutput;
      state.protocol = initialState().protocol;
    },
    moveBackInHistory: (state) => {
      state.historyIndex = Math.max(0, state.historyIndex - 1);
      const item = state.protocol[0];

      if (!item) {
        state.input = "";
        state.output = emptyTextOutput;
        return;
      }

      state.input = item.input;
      state.output = item.output;
    },
    moveForwardInHistory: (state) => {
      state.historyIndex = Math.min(
        state.protocol.length,
        state.historyIndex + 1
      );

      const item = state.protocol[state.historyIndex];

      if (!item) {
        state.input = "";
        state.output = emptyTextOutput;
      }

      state.input = item.input;
      state.output = item.output;
    },
    evaluate: (state, action: PayloadAction<Context>) => {
      if (state.input === "") {
        return;
      }

      const result = evaluateInput(state.input, action.payload);
      const output = {
        ...result,
        input: state.input,
      };

      state.historyIndex = state.protocol.length;
      state.stack = result.context.stack;
      state.output = output;
      state.protocol.push({
        input: state.input,
        output: output,
      });
    },
  },
});

export const {
  resetProtocol,
  resetStack,
  setInput,
  evaluate,
  moveBackInHistory,
  moveForwardInHistory,
  resetInput,
  resetOutput,
  resetDefinitions,
  resetAll,
} = calculatorSessionSlice.actions;

export default calculatorSessionSlice;
