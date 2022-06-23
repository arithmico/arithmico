import evaluate from '..';
import createBooleanNode from '../../create/BooleanNode';
import createGreater from '../../create/Greater';
import { Greater, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';

export default function evaluateGreater(node: Greater, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (
        leftChild.type === 'number' &&
        rightChild.type === 'number' &&
        context.options.config.operators.greaterNumberNumber
    ) {
        return createBooleanNode(leftChild.value > rightChild.value);
    } else if (
        leftChild.type === 'function' &&
        rightChild.type === 'function' &&
        context.options.config.operators.greaterFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createGreater, context);
    }

    throw `TypeError: <${leftChild.type}> > <${rightChild.type}> is not defined`;
}
