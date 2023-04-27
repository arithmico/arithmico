import {NumberNode, SyntaxTreeNode} from '../../../types/nodes.types';
import {Context} from '../../../types/context.types';
import evaluate from '../../../node-operations/evaluate-node';
import createNumberNode from '../../../node-operations/create-node/create-number-node';

export function evaluateExpressionWithValue(
    expression: SyntaxTreeNode,
    variableName: string,
    position: number,
    context: Context,
) {
    const value = createNumberNode(position);
    const localStackFrame = new Map<string, NumberNode>();
    localStackFrame.set(variableName, value);
    const localContext: Context = {
        ...context,
        stack: [...context.stack, localStackFrame],
    };

    value.value = position;
    const result = evaluate(expression, localContext);

    if (result.type === 'number') {
        return result.value;
    }

    throw 'invalid result';
}

