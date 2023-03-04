import evaluate from '..';
import createBooleanNode from '../../create-node/create-boolean-node';
import createGreaterOrEquals from '../../create-node/create-greater-or-equals';
import { GreaterOrEquals, Context, SyntaxTreeNode } from '../../../types';
import { createBinaryOperatorFunctionComposition } from '../../../utils/compose-function-utils';

export default function evaluateGreaterOrEquals(node: GreaterOrEquals, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number' && __OPERATORS.greaterOrEqualsNumberNumber) {
        return createBooleanNode(leftChild.value >= rightChild.value);
    } else if (
        leftChild.type === 'function' &&
        rightChild.type === 'function' &&
        __OPERATORS.greaterOrEqualsFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createGreaterOrEquals, context);
    }

    throw `TypeError: <${leftChild.type}> >= <${rightChild.type}> is not defined`;
}
