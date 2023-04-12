import evaluate from '..';
import createBooleanNode from '../../create-node/create-boolean-node';
import createEquals from '../../create-node/create-equals';
import { Equals, Context, SyntaxTreeNode } from '../../../types';
import { createBinaryOperatorFunctionComposition } from '../../../utils/compose-function-utils';

export default function evaluateEquals(node: Equals, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (
        (leftChild.type === 'boolean' && rightChild.type === 'boolean' && __OPERATORS.equalsBooleanBoolean) ||
        (leftChild.type === 'number' && rightChild.type === 'number' && __OPERATORS.equalsNumberNumber)
    ) {
        return createBooleanNode(leftChild.value === rightChild.value);
    } else if (leftChild.type === 'function' && rightChild.type === 'function' && __OPERATORS.equalsFunctionFunction) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createEquals, context);
    }

    throw `TypeError: <${leftChild.type}> = <${rightChild.type}> is not defined`;
}
