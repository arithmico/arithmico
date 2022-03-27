import evaluate, { getDefaultContext } from '@behrenle/number-cruncher';
import { SessionState } from './types';

export function evaluateInput(state: SessionState): SessionState {
  if (state.input === '') {
    return { ...state };
  }

  try {
    const result = evaluate(state.input, {
      stack: state.stack,
      options: {
        decimalSeparator: '.',
        magnitudeThresholdForScientificNotation: state.decimalPlaces,
        decimalPlaces: state.decimalPlaces
      }
    });
    return {
      ...state,
      outputResetted: false,
      protocol: [
        ...state.protocol,
        {
          type: 'math',
          error: false,
          input: state.input,
          output: result.result
        }
      ],
      stack: result.context.stack
    };
  } catch (error) {
    return {
      ...state,
      outputResetted: false,
      protocol: [
        ...state.protocol,
        {
          type: 'math',
          error: true,
          input: state.input,
          output: error as string
        }
      ]
    };
  }
}

export function resetDefinitions(state: SessionState): SessionState {
  return {
    ...state,
    stack: getDefaultContext().stack,
    protocol: [...state.protocol, { type: 'info', info: 'reset definitions' }]
  };
}
