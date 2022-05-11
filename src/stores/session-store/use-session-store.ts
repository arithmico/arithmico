import { init, getDefaultContext } from '@behrenle/number-cruncher';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import {
  evaluateInput,
  goBackInInputHistory,
  goForwardInInputHistory,
  resetDefinitions
} from './actions';
import { SessionState } from './types';

init();

const useSessionStore = create<SessionState>(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, _get) => ({
      input: '',
      historyIndex: 0,
      outputResetted: false,
      protocol: [],
      stack: getDefaultContext().stack,
      decimalPlaces: getDefaultContext().options.decimalPlaces,
      interfaceFontSize: 'medium',
      theme: 'light',
      language: 'en',
      excludeInfoInProtocol: true as boolean,

      evaluate: () => set(evaluateInput),
      resetDefinitions: () => set(resetDefinitions),
      setInput: (input) => set(() => ({ input: input.replace('->', '→') })),
      resetInput: () => set(() => ({ input: '' })),
      resetOutput: () => set(() => ({ outputResetted: true })),
      resetProtocol: () => set(() => ({ protocol: [] })),
      setDecimalPlaces: (n) => set(() => ({ decimalPlaces: n })),
      setLanguage: (language) => set(() => ({ language: language === 'de' ? 'de' : 'en' })),
      setInterfaceFontSize: (interfaceFontSize: SessionState['interfaceFontSize']) =>
        set(() => ({ interfaceFontSize })),
      setTheme: (theme) => set(() => ({ theme })),
      setExcludeInfoInProtocol: (value: boolean) => set(() => ({ excludeInfoInProtocol: value })),
      goBackInInputHistory: () => set(goBackInInputHistory),
      goForwardInInputHistory: () => set(goForwardInInputHistory)
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
