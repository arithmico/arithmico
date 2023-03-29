import evaluate from '..';
import createBooleanNode from '../../create-node/create-boolean-node';
import createLessOrEquals from '../../create-node/create-less-or-equals';
import { LessOrEquals, Context, SyntaxTreeNode } from '../../../types';
import { createBinaryOperatorFunctionComposition } from '../../../utils/compose-function-utils';

export default function evaluateLessOrEquals(node: LessOrEquals, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number' && __OPERATORS.lessOrEqualsNumberNumber) {
        return createBooleanNode(leftChild.value <= rightChild.value);
    } else if (
        leftChild.type === 'function' &&
        rightChild.type === 'function' &&
        __OPERATORS.lessOrEqualsFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createLessOrEquals, context);
    }

    throw `TypeError: <${leftChild.type}> <= <${rightChild.type}> is not defined`;
}
