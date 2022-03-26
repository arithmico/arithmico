import evaluate, { init, getDefaultContext } from '@behrenle/number-cruncher';
import { Context } from '@behrenle/number-cruncher/lib/types';
import create from 'zustand';

init();
export interface MathItem {
  type: 'math';
  error: boolean;
  input: string;
  output: string;
}

export interface InfoItem {
  type: 'info';
  info: string;
}

type History = (MathItem | InfoItem)[];

interface SessionState {
  history: History;
  context: Context;
  evaluate: (input: string) => void;
  resetDefinitions: () => void;
}

const useSessionStore = create<SessionState>((set) => ({
  history: [],
  context: getDefaultContext(),
  evaluate: (input) =>
    input !== '' &&
    set((state) => {
      try {
        const result = evaluate(input, state.context);
        return {
          history: [
            ...state.history,
            {
              type: 'math',
              error: false,
              input,
              output: result.result
            }
          ],
          context: result.context
        };
      } catch (error) {
        return {
          history: [
            ...state.history,
            {
              type: 'math',
              error: true,
              input,
              output: error as string
            }
          ],
          context: state.context
        };
      }
    }),
  resetDefinitions: () =>
    set((state) => ({
      context: getDefaultContext(),
      history: [...state.history, { type: 'info', info: 'reset definitions' }]
    }))
}));

export default useSessionStore;
