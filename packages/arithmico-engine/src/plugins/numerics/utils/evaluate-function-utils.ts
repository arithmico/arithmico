import { NumberNode, SyntaxTreeNode } from '../../../types/nodes.types';
import { Context } from '../../../types/context.types';
import evaluate from '../../../node-operations/evaluate-node';
import createFunctionCall from '../../../node-operations/create-node/create-function-call';
import createNumberNode from '../../../node-operations/create-node/create-number-node';

export function evaluateSyntaxTreeNodeWithPosition(
    expression: SyntaxTreeNode,
    value: NumberNode,
    context: Context,
    position: number,
) {
    let result: SyntaxTreeNode;

    if (expression.type === 'function') {
        result = evaluate(createFunctionCall(expression, [createNumberNode(position)]), context);
    } else {
        value.value = position;
        result = evaluate(expression, context);
    }

    if (result.type === 'number') {
        return result.value;
    } else {
        throw 'EvalError: invalid result: not a number';
    }
}
