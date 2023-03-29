import evaluate from '..';
import createBooleanNode from '../../create-node/create-boolean-node';
import createOr from '../../create-node/create-or';
import { Or, Context, SyntaxTreeNode } from '../../../types';
import { createBinaryOperatorFunctionComposition } from '../../../utils/compose-function-utils';

export default function evaluateOr(node: Or, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'boolean' && rightChild.type === 'boolean' && __OPERATORS.orBooleanBoolean) {
        return createBooleanNode(leftChild.value || rightChild.value);
    } else if (leftChild.type === 'function' && rightChild.type === 'function' && __OPERATORS.orFunctionFunction) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createOr, context);
    }

    throw `TypeError: <${leftChild.type}> | <${rightChild.type}> is not defined`;
}
