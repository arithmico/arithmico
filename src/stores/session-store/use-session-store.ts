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
      interfaceFontSize: 'medium',
      theme: 'light',
      excludeInfoInProtocol: true as boolean,

      evaluate: () => set(evaluateInput),
      resetDefinitions: () => set(resetDefinitions),
      setInput: (input) => set(() => ({ input: input.replace('->', '→') })),
      resetInput: () => set(() => ({ input: '' })),
      resetOutput: () => set(() => ({ outputResetted: true })),
      resetProtocol: () => set(() => ({ protocol: [] })),
      setDecimalPlaces: (n) => set(() => ({ decimalPlaces: n })),
      setInterfaceFontSize: (interfaceFontSize: SessionState['interfaceFontSize']) =>
        set(() => ({ interfaceFontSize })),
      setTheme: (theme) => set(() => ({ theme })),
      setExcludeInfoInProtocol: (value: boolean) => set(() => ({ excludeInfoInProtocol: value }))
    }),
    {
      name: 'settings',
      version: 3,
      partialize: (state) => ({
        decimalPlaces: state.decimalPlaces,
        interfaceFontSize: state.interfaceFontSize,
        theme: state.theme,
        excludeInfoInProtocol: state.excludeInfoInProtocol
      })
    }
  )
);

export default useSessionStore;
