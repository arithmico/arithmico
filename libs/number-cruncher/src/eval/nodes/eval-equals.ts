import evaluate from '..';
import createBooleanNode from '../../create/create-boolean-node';
import createEquals from '../../create/create-equals';
import { Equals, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';

export default function evaluateEquals(node: Equals, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (
        (leftChild.type === 'boolean' &&
            rightChild.type === 'boolean' &&
            context.options.config.operators.equalsBooleanBoolean) ||
        (leftChild.type === 'number' &&
            rightChild.type === 'number' &&
            context.options.config.operators.equalsNumberNumber)
    ) {
        return createBooleanNode(leftChild.value === rightChild.value);
    } else if (
        leftChild.type === 'function' &&
        rightChild.type === 'function' &&
        context.options.config.operators.equalsFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createEquals, context);
    }

    throw `TypeError: <${leftChild.type}> & <${rightChild.type}> is not defined`;
}
