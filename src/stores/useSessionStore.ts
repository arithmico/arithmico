import evaluate, { EvaluateResult, init, getDefaultContext } from '@behrenle/number-cruncher';
import { Context } from '@behrenle/number-cruncher/lib/types';
import create from 'zustand';

init();
interface HistoryItem {
  input: string;
  output: string;
}

interface SessionState {
  history: HistoryItem[];
  context: Context;
  evaluate: (input: string) => void;
}

const useSessionStore = create<SessionState>((set) => ({
  history: [],
  context: getDefaultContext(),
  evaluate: (input) => {
    const evaluateInput = (context: Context): EvaluateResult => {
      try {
        return evaluate(input, context);
      } catch (error) {
        return {
          context,
          result: error as string
        };
      }
    };
    return set((state) => {
      const result = evaluateInput(state.context);
      return {
        history: [...state.history, { input, output: result.result }],
        context: result.context
      };
    });
  }
}));

export default useSessionStore;
