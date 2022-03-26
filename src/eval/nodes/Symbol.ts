import { Context, SymbolNode, SyntaxTreeNode } from '../../types';

export default function evaluateSymbol(node: SymbolNode, context: Context): SyntaxTreeNode {
    const name = node.name;

    for (let i = context.stack.length - 1; i >= 0; i--) {
        const stackFrame = context.stack[i];

        if (stackFrame[name]) {
            return stackFrame[name];
        }
    }

    throw `ReferenceError: ${name} is not defined`;
}
