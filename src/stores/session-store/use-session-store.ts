import { init, getDefaultContext } from '@behrenle/number-cruncher';
import create from 'zustand';
import { evaluateInput, resetDefinitions } from './actions';
import { SessionState } from './types';

init();

const useSessionStore = create<SessionState>((set) => ({
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
}));

export default useSessionStore;
