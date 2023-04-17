import evaluate from '..';
import createBooleanNode from '../../create-node/create-boolean-node';
import createGreater from '../../create-node/create-greater';
import { Greater, Context, SyntaxTreeNode } from '../../../types';
import { createBinaryOperatorFunctionComposition } from '../../../utils/compose-function-utils';

export default function evaluateGreater(node: Greater, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number' && __OPERATORS.greaterNumberNumber) {
        return createBooleanNode(leftChild.value > rightChild.value);
    } else if (leftChild.type === 'function' && rightChild.type === 'function' && __OPERATORS.greaterFunctionFunction) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createGreater, context);
    }

    throw `TypeError: <${leftChild.type}> > <${rightChild.type}> is not defined`;
}
