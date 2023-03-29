import evaluate from '..';
import createDivided from '../../create-node/create-divided';
import createNumberNode from '../../create-node/create-number-node';
import createVector from '../../create-node/create-vector';
import { Divided, Context, SyntaxTreeNode } from '../../../types';
import { createBinaryOperatorFunctionComposition } from '../../../utils/compose-function-utils';

export default function evaluateDivided(node: Divided, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number' && __OPERATORS.dividedNumberNumber) {
        if (rightChild.value === 0) {
            throw `ArithmeticError: division by zero is not allowed`;
        }

        return createNumberNode(leftChild.value / rightChild.value);
    } else if (leftChild.type === 'function' && rightChild.type === 'function' && __OPERATORS.dividedFunctionFunction) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createDivided, context);
    } else if (leftChild.type === 'vector' && rightChild.type === 'number' && __OPERATORS.dividedVectorNumber) {
        return createVector(leftChild.values.map((value) => evaluate(createDivided(value, rightChild), context)));
    }

    throw `TypeError: <${leftChild.type}> / <${rightChild.type}> is not defined`;
}
