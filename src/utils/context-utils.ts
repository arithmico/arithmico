import { Context, SyntaxTreeNode } from '../types';

function isNameAlreadyTaken(name: string, context: Context) {
    return context.stack.some((stackFrame) => !!stackFrame[name]);
}

export function useStrictContextValidator(name: string, context: Context) {
    if (context.stack.length === 0) {
        throw 'ContextError: no stackframes available';
    }

    if (isNameAlreadyTaken(name, context)) {
        throw `ContextError: ${name} is already defined`;
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
