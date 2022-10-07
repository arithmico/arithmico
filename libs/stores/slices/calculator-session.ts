import evaluateInput, { getDefaultContext } from "@arithmico/engine";
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
  output: string;
  error: boolean;
  stack: Context["stack"];
  historyIndex: number;
  protocol: Protocol;
}

const initialState = (): CalculatorSessionState => ({
  input: "",
  output: "",
  error: false,
  stack: getDefaultContext().stack,
  historyIndex: 0,
  protocol: [],
});

const getMathAndErrorItems = (items: Protocol) =>
  items.filter((item) => item.type === "math" || item.type === "error") as (
    | MathProtocolItem
    | ErrorProtocolItem
  )[];

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
      state.protocol = initialState().protocol;
    },
    setStack: (state, action: PayloadAction<Context["stack"]>) => {
      state.stack = action.payload;
    },
    resetStack: (state) => {
      state.stack = initialState().stack;
    },
    resetOutput: (state) => {
      state.output = "";
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
      state.output = "";
      state.protocol = initialState().protocol;
    },
    moveBackInHistory: (state) => {
      const mathItems = getMathAndErrorItems(state.protocol);
      state.historyIndex = Math.max(0, state.historyIndex - 1);
      const item = mathItems[0];
      state.input = item?.input ?? "";
      state.output = (item?.type === "math" ? item.output : item.error) ?? "";
      state.error = item && item.type === "error";
    },
    moveForwardInHistory: (state) => {
      const mathItems = getMathAndErrorItems(state.protocol);
      state.historyIndex = Math.min(
        mathItems.length - 1,
        state.historyIndex - 1
      );
      const item = mathItems[state.historyIndex];
      state.input = item?.input ?? "";
      state.output = (item?.type === "math" ? item?.output : item?.error) ?? "";
      state.error = item && item.type === "error";
    },
    evaluate: (state, action: PayloadAction<Context>) => {
      console.log("evaluate");
      if (state.input === "") {
        return;
      }

      const newIndex = getMathAndErrorItems(state.protocol).length;
      state.historyIndex = newIndex;

      try {
        const result = evaluateInput(state.input, action.payload);
        state.stack = result.context.stack;
        state.protocol.push({
          type: "math",
          input: state.input,
          output: result.result,
        });
        state.output = result.result;
        state.error = false;
      } catch (e) {
        state.protocol.push({
          type: "error",
          input: state.input,
          error: e as string,
        });
        state.error = true;
        state.output = e as string;
      }
    },
  },
});

export const {
  addProtocolItem,
  resetProtocol,
  resetStack,
  setInput,
  setStack,
  evaluate,
  moveBackInHistory,
  moveForwardInHistory,
  resetInput,
  resetOutput,
  resetDefinitions,
  resetAll,
} = calculatorSessionSlice.actions;

export default calculatorSessionSlice;
