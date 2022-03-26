import evaluate from '..';
import createDefine from '../../create/Define';
import { DefineVariable, Context, SyntaxTreeNode } from '../../types';

export default function evaluateDefineVariable(node: DefineVariable, context: Context): SyntaxTreeNode {
    const value = evaluate(node.value, context);

    if (context.stack.length === 0) {
        throw 'ContextError: No stackframes available';
    }

    return createDefine(node.name, value);
}
