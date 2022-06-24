import evaluate, { init, getDefaultContext } from '@behrenle/number-cruncher';
import create, { SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import { MathItem, Session, SessionState, Settings } from './types';
import { createOptions } from '@behrenle/number-cruncher/lib/utils/context-utils';
import { Options } from '@behrenle/number-cruncher/lib/types';

init();

const defaultSettings: Settings = {
  decimalPlaces: getDefaultContext().options.decimalPlaces,
  interfaceFontSize: 'medium',
  theme: 'light',
  language: 'de',
  numberFormat: 'default',
  excludeInfoInProtocol: true as boolean,
  copySynopsisOnClick: true as boolean,
  angleUnit: 'degrees',
  boldFont: false as boolean
};

const defaultSession: Session = {
  input: '',
  historyIndex: 0,
  outputResetted: false,
  protocol: [],
  stack: getDefaultContext().stack
};

function getDecimalSeparator(language: string, numberFormat: string) {
  if (numberFormat === 'default') {
    if (language === 'de') {
      return ',';
    }
    return '.';
  } else {
    if (numberFormat === 'de') {
      return ',';
    }
    return '.';
  }
}

export function setSessionAttribute(set: SetState<SessionState>, partialSession: Partial<Session>) {
  return set((state) => ({ ...state, session: { ...state.session, ...partialSession } }));
}

export function setSettingsAttribute(
  set: SetState<SessionState>,
  partialSettings: Partial<Settings>
) {
  return set((state) => ({ ...state, settings: { ...state.settings, ...partialSettings } }));
}

const useSessionStore = create<SessionState>(
  persist(
    (set) => ({
      settings: defaultSettings,
      session: defaultSession,
      dispatch: (action) => {
        switch (action.type) {
          case 'setLanguage':
            setSettingsAttribute(set, { language: action.language });
            break;

          case 'setNumberFormat':
            setSettingsAttribute(set, { numberFormat: action.numberFormat });
            break;

          case 'setInterfaceFontSize':
            setSettingsAttribute(set, { interfaceFontSize: action.interfaceFontSize });
            break;

          case 'setExcludeInfoInProtocol':
            setSettingsAttribute(set, { excludeInfoInProtocol: action.excludeInfoInProtocol });
            break;

          case 'setCopySynopsisOnClick':
            setSettingsAttribute(set, { copySynopsisOnClick: action.copySynopsisOnClick });
            break;

          case 'setAngleUnit':
            setSettingsAttribute(set, { angleUnit: action.angleUnit });
            break;

          case 'setBoldFont':
            setSettingsAttribute(set, { boldFont: action.boldFont });
            break;

          case 'setTheme':
            setSettingsAttribute(set, { theme: action.theme });
            break;

          case 'setDecimalPlaces':
            setSettingsAttribute(set, { decimalPlaces: action.decimalPlaces });
            break;

          case 'resetSettings':
            set((state) => ({ ...state, settings: defaultSettings }));
            break;

          case 'setInput':
            setSessionAttribute(set, { input: action.input });
            break;

          case 'resetInput':
            setSessionAttribute(set, { input: '' });
            break;

          case 'evaluate':
            set((state) => {
              if (state.session.input === '') return state;

              const newIndex = state.session.protocol.filter((item) => item.type === 'math').length;

              try {
                const result = evaluate(state.session.input, {
                  stack: state.session.stack,
                  options: createOptions({
                    decimalSeparator: getDecimalSeparator(
                      state.settings.language,
                      state.settings.numberFormat
                    ),
                    magnitudeThresholdForScientificNotation: state.settings.decimalPlaces,
                    decimalPlaces: state.settings.decimalPlaces,
                    angleUnit: state.settings.angleUnit as Options['angleUnit']
                  })
                });

                return {
                  ...state,
                  session: {
                    ...state.session,
                    historyIndex: newIndex,
                    outputResetted: false,
                    protocol: [
                      ...state.session.protocol,
                      {
                        type: 'math',
                        error: false,
                        input: state.session.input,
                        output: result.result
                      }
                    ],
                    stack: result.context.stack
                  }
                };
              } catch (error) {
                return {
                  ...state,
                  session: {
                    ...state.session,
                    historyIndex: newIndex,
                    outputResetted: false,
                    protocol: [
                      ...state.session.protocol,
                      {
                        type: 'math',
                        error: true,
                        input: state.session.input,
                        output: error as string
                      }
                    ]
                  }
                };
              }
            });
            break;

          case 'goBackInInputHistory':
            set((state) => {
              const mathItems = <MathItem[]>(
                state.session.protocol.filter((item) => item.type === 'math')
              );
              const newIndex = state.session.historyIndex - 1;
              if (newIndex < 0) {
                return state;
              }

              return {
                ...state,
                session: {
                  ...state.session,
                  historyIndex: newIndex,
                  input: mathItems[newIndex].input
                }
              };
            });
            break;

          case 'goForwardInInputHistory':
            set((state) => {
              const mathItems = <MathItem[]>(
                state.session.protocol.filter((item) => item.type === 'math')
              );
              const newIndex = state.session.historyIndex + 1;
              if (newIndex > mathItems.length) {
                return state;
              }

              return {
                ...state,
                session: {
                  ...state.session,
                  historyIndex: newIndex,
                  input: newIndex === mathItems.length ? '' : mathItems[newIndex].input
                }
              };
            });
            break;

          case 'resetDefinitions':
            set((state) => {
              return {
                ...state,
                session: {
                  ...state.session,
                  stack: getDefaultContext().stack,
                  protocol: [...state.session.protocol, { type: 'info', info: 'reset definitions' }]
                }
              };
            });
            break;

          case 'resetOutput':
            setSessionAttribute(set, { outputResetted: true });
            break;

          case 'resetProtocol':
            setSessionAttribute(set, { protocol: [] });
            break;
        }
      }
    }),
    {
      name: 'settings',
      version: 4,
      partialize: (state) => ({
        settings: state.settings
      })
    }
  )
);

export function useDispatch() {
  return useSessionStore((state) => state.dispatch);
}

export default useSessionStore;
