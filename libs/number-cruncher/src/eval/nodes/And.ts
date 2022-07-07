import evaluate from '..';
import createAnd from '../../create/create-and';
import createBooleanNode from '../../create/create-boolean-node';
import { And, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';

export default function evaluateAnd(node: And, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (
        leftChild.type === 'boolean' &&
        rightChild.type === 'boolean' &&
        context.options.config.operators.andBooleanBoolean
    ) {
        return createBooleanNode(leftChild.value && rightChild.value);
    } else if (
        leftChild.type === 'function' &&
        rightChild.type === 'function' &&
        context.options.config.operators.andFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createAnd, context);
    }

    throw `TypeError: <${leftChild.type}> & <${rightChild.type}> is not defined`;
}
