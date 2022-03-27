import evaluate, { init, getDefaultContext } from '@behrenle/number-cruncher';
import create from 'zustand';
import { SessionState } from './types';

init();

const useSessionStore = create<SessionState>((set) => ({
  input: '',
  outputResetted: false,
  protocol: [],
  context: getDefaultContext(),

  evaluate: () =>
    set((state) => {
      if (state.input === '') {
        return { ...state };
      }

      try {
        const result = evaluate(state.input, state.context);
        return {
          ...state,
          outputResetted: false,
          protocol: [
            ...state.protocol,
            {
              type: 'math',
              error: false,
              input: state.input,
              output: result.result
            }
          ],
          context: result.context
        };
      } catch (error) {
        return {
          ...state,
          outputResetted: false,
          protocol: [
            ...state.protocol,
            {
              type: 'math',
              error: true,
              input: state.input,
              output: error as string
            }
          ]
        };
      }
    }),

  resetDefinitions: () =>
    set((state) => ({
      context: getDefaultContext(),
      protocol: [...state.protocol, { type: 'info', info: 'reset definitions' }]
    })),

  setInput: (input: string) => set(() => ({ input })),

  resetInput: () => set(() => ({ input: '' })),

  resetOutput: () => set(() => ({ outputResetted: true })),

  resetProtocol: () => set(() => ({ protocol: [] }))
}));

export default useSessionStore;
