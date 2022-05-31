import serialize from '../serialize';
import { Context, Options, SyntaxTreeNode } from '../types';

export const defaultOptions: Options = {
    decimalPlaces: 6,
    decimalSeparator: '.',
    magnitudeThresholdForScientificNotation: 6,
    angleUnit: 'degrees',
};

export function createOptions(options?: Partial<Options>): Options {
    return { ...defaultOptions, ...options };
}

export function useStrictContextValidator(name: string, context: Context) {
    if (context.stack.length === 0) {
        throw 'ContextError: no stackframes available';
    }
}

export function existsOnStack(name: string, context: Context) {
    for (let i = context.stack.length - 1; i >= 0; i--) {
        const stackFrame = context.stack[i];

        if (stackFrame[name]) {
            return true;
        }
    }

    return false;
}

export function getStackObject(name: string, context: Context) {
    for (let i = context.stack.length - 1; i >= 0; i--) {
        const stackFrame = context.stack[i];

        if (stackFrame[name]) {
            return stackFrame[name];
        }
    }
}

export function insertStackObject(name: string, stackObject: SyntaxTreeNode, context: Context): Context {
    useStrictContextValidator(name, context);
    const stackFrameIndex = context.stack.length - 1;
    return {
        ...context,
        stack: context.stack.map((stackFrame, index) =>
            index === stackFrameIndex
                ? {
                      ...context.stack[stackFrameIndex],
                      [name]: stackObject,
                  }
                : stackFrame,
        ),
    };
}

export function serializeStack(context: Context): Record<string, string> {
    if (context.stack.length === 0) {
        return {};
    }

    return Object.fromEntries(
        Object.entries(context.stack[context.stack.length - 1]).map(([name, node]) => [
            name,
            serialize(node, context.options),
        ]),
    );
}
