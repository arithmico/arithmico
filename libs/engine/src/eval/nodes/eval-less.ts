import evaluate from '..';
import createBooleanNode from '../../create-node/create-boolean-node';
import createLess from '../../create-node/create-less';
import { Less, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';

export default function evaluateLess(node: Less, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number' && context.options.operators.lessNumberNumber) {
        return createBooleanNode(leftChild.value < rightChild.value);
    } else if (
        leftChild.type === 'function' &&
        rightChild.type === 'function' &&
        context.options.operators.lessFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createLess, context);
    }

    throw `TypeError: <${leftChild.type}> < <${rightChild.type}> is not defined`;
}
