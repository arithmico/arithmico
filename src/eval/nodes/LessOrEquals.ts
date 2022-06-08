import evaluate from '..';
import createBooleanNode from '../../create/BooleanNode';
import createLessOrEquals from '../../create/LessOrEquals';
import { LessOrEquals, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';

export default function evaluateLessOrEquals(node: LessOrEquals, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (
        leftChild.type === 'number' &&
        rightChild.type === 'number' &&
        context.options.config.operators.lessOrEqualsNumberNumber
    ) {
        return createBooleanNode(leftChild.value <= rightChild.value);
    } else if (
        leftChild.type === 'function' &&
        rightChild.type === 'function' &&
        context.options.config.operators.lessOrEqualsFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createLessOrEquals, context);
    }

    throw `TypeError: <${leftChild.type}> <= <${rightChild.type}> is not defined`;
}
