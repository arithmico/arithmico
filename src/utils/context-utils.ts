import serialize from '../serialize';
import { Context, SyntaxTreeNode } from '../types';

export function useStrictContextValidator(name: string, context: Context) {
    if (context.stack.length === 0) {
        throw 'ContextError: no stackframes available';
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
