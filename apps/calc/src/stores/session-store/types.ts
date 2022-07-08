import { Context } from "@arithmico/engine/lib/types";
import { Action } from "./action-types";

export interface MathItem {
  type: "math";
  error: boolean;
  input: string;
  output: string;
}

export interface InfoItem {
  type: "info";
  info: string;
}

type History = (MathItem | InfoItem)[];

export interface Settings {
  language: string;
  numberFormat: string;
  interfaceFontSize: string;
  excludeInfoInProtocol: boolean;
  copySynopsisOnClick: boolean;
  angleUnit: string;
  boldFont: boolean;
  theme: string;
  decimalPlaces: number;
}

export interface Session {
  input: string;
  historyIndex: number;
  outputResetted: boolean;
  protocol: History;
  stack: Context["stack"];
}

export interface SessionState {
  settings: Settings;
  session: Session;
  dispatch: (action: Action) => void;
}
