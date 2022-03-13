import evaluate from '..';
import { DefineVariable, Context, SyntaxTreeNode } from '../../types';

export default function evaluateDefineVariable(node: DefineVariable, context: Context): SyntaxTreeNode {
    const value = evaluate(node.value, context);

    if (context.stack.length === 0) {
        throw 'ContextError: No stackframes available';
    }

    context.stack[context.stack.length - 1][node.name] = {
        type: 'value',
        value,
    };

    return node;
}
