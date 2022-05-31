import { Context, Options } from '@behrenle/number-cruncher/lib/types';

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

export interface SessionState {
  input: string;
  historyIndex: number;
  outputResetted: boolean;
  protocol: History;
  stack: Context['stack'];
  decimalPlaces: number;
  interfaceFontSize: string;
  language: string;
  numberFormat: string;
  theme: string;
  excludeInfoInProtocol: boolean;
  copySynopsisOnClick: boolean;
  angleUnit: Options['angleUnit'];

  evaluate: () => void;
  goBackInInputHistory: () => void;
  goForwardInInputHistory: () => void;
  resetDefinitions: () => void;
  setInput: (input: string) => void;
  resetInput: () => void;
  resetOutput: () => void;
  resetProtocol: () => void;
  setDecimalPlaces: (n: number) => void;
  setAngleUnit: (unit: string) => void;
  setInterfaceFontSize: (size: string) => void;
  setNumberFormat: (numberFormat: string) => void;
  setTheme: (theme: string) => void;
  setExcludeInfoInProtocol: (value: boolean) => void;
  setLanguage: (language: string) => void;
  setCopySynopsisOnClick: (v: boolean) => void;
}
