export interface SetLanguageAction {
  type: 'setLanguage';
  language: string;
}

export interface SetNumberFormatAction {
  type: 'setNumberFormat';
  numberFormat: string;
}

export interface SetInterfaceFontSizeAction {
  type: 'setInterfaceFontSize';
  interfaceFontSize: string;
}

export interface SetExcludeInfoInProtocolAction {
  type: 'setExcludeInfoInProtocol';
  excludeInfoInProtocol: boolean;
}

export interface SetCopySynopsisOnClickAction {
  type: 'setCopySynopsisOnClick';
  copySynopsisOnClick: boolean;
}

export interface SetAngleUnitAction {
  type: 'setAngleUnit';
  angleUnit: string;
}

export interface SetBoldFontAction {
  type: 'setBoldFont';
  boldFont: boolean;
}

export interface SetThemeAction {
  type: 'setTheme';
  theme: string;
}

export interface SetDecimalPlacesAction {
  type: 'setDecimalPlaces';
  decimalPlaces: number;
}

export interface ResetSettingsAction {
  type: 'resetSettings';
}

export interface SetInputAction {
  type: 'setInput';
  input: string;
}

export interface ResetInputAction {
  type: 'resetInput';
}

export interface EvaluateAction {
  type: 'evaluate';
}

export interface GoBackInInputHistoryAction {
  type: 'goBackInInputHistory';
}

export interface GoForwardInInputHistoryAction {
  type: 'goForwardInInputHistory';
}

export interface ResetDefinitionsAction {
  type: 'resetDefinitions';
}

export interface ResetOutputAction {
  type: 'resetOutput';
}

export interface ResetProtocolAction {
  type: 'resetProtocol';
}

export type Action =
  | SetLanguageAction
  | SetNumberFormatAction
  | SetInterfaceFontSizeAction
  | SetExcludeInfoInProtocolAction
  | SetCopySynopsisOnClickAction
  | SetAngleUnitAction
  | SetBoldFontAction
  | SetThemeAction
  | SetDecimalPlacesAction
  | ResetSettingsAction
  | SetInputAction
  | EvaluateAction
  | GoBackInInputHistoryAction
  | GoForwardInInputHistoryAction
  | ResetInputAction
  | ResetDefinitionsAction
  | ResetOutputAction
  | ResetProtocolAction;
