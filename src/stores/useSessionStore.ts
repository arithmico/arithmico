import evaluate, { init } from '@behrenle/number-cruncher';
import create from 'zustand';

init();

interface HistoryItem {
  input: string;
  output: string;
}

interface SessionState {
  history: HistoryItem[];
  lastOutput: string;
  evaluate: (input: string) => void;
}

const useSessionStore = create<SessionState>((set) => ({
  history: [],
  lastOutput: '',
  evaluate: (input) => {
    const output = evaluate(input);
    return set((state) => ({
      history: [...state.history, { input, output }],
      lastOutput: output
    }));
  }
}));

export default useSessionStore;
