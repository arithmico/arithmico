import evaluate from '..';
import serialize from '../../serialize-node';
import { FunctionCall, Context, SyntaxTreeNode } from '../../types';

export default function evaluateFunctionCall(node: FunctionCall, context: Context): SyntaxTreeNode {
    const func = evaluate(node.function, context);

    if (func.type !== 'function') {
        throw `TypeError: ${serialize(node.function, context.options)} is not a function`;
    }

    return func.evaluator(node.parameters, context);
}
