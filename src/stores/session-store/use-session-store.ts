import { init, getDefaultContext } from '@behrenle/number-cruncher';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { evaluateInput, resetDefinitions } from './actions';
import { SessionState } from './types';

init();

const useSessionStore = create<SessionState>(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, _get) => ({
      input: '',
      outputResetted: false,
      protocol: [],
      stack: getDefaultContext().stack,
      decimalPlaces: getDefaultContext().options.decimalPlaces,

      evaluate: () => set(evaluateInput),
      resetDefinitions: () => set(resetDefinitions),
      setInput: (input: string) => set(() => ({ input })),
      resetInput: () => set(() => ({ input: '' })),
      resetOutput: () => set(() => ({ outputResetted: true })),
      resetProtocol: () => set(() => ({ protocol: [] })),
      setDecimalPlaces: (n: number) => set(() => ({ decimalPlaces: n }))
    }),
    {
      name: 'settings',
      version: 1,
      partialize: (state) => ({ decimalPlaces: state.decimalPlaces })
    }
  )
);

export default useSessionStore;
