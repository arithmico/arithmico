import evaluate from '..';
import createBooleanNode from '../../create/BooleanNode';
import createOr from '../../create/Or';
import { Or, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';

export default function evaluateOr(node: Or, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'boolean' && rightChild.type === 'boolean') {
        return createBooleanNode(leftChild.value || rightChild.value);
    } else if (leftChild.type === 'function' && rightChild.type === 'function') {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createOr, context);
    }

    throw `TypeError: <${leftChild.type}> | <${rightChild.type}> is not defined`;
}
