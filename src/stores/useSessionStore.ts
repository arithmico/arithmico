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
    let output: string;
    try {
      output = evaluate(input);
    } catch (error) {
      output = error as string;
    }
    return set((state) => ({
      history: [...state.history, { input, output }],
      lastOutput: output
    }));
  }
}));

export default useSessionStore;
