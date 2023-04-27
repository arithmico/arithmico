import { FunctionNode, NumberNode, SyntaxTreeNode } from '../../../types/nodes.types';
import { Context } from '../../../types/context.types';
import evaluate from '../../../node-operations/evaluate-node';
import createFunctionCall from '../../../node-operations/create-node/create-function-call';
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

export function evaluateFunctionNodeOnPosition(f: FunctionNode, value: number, context: Context) {
    const result = evaluate(createFunctionCall(f, [createNumberNode(value)]), context);

    if (result.type === 'number') {
        return result.value;
    } else {
        throw 'not a number';
    }
}
