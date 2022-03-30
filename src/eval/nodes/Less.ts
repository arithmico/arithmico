import evaluate from '..';
import createBooleanNode from '../../create/BooleanNode';
import createLess from '../../create/Less';
import { Less, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';

export default function evaluateLess(node: Less, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number') {
        return createBooleanNode(leftChild.value < rightChild.value);
    } else if (leftChild.type === 'function' && rightChild.type === 'function') {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createLess, context);
    }

    throw `TypeError: <${leftChild.type}> < <${rightChild.type}> is not defined`;
}
