import evaluate from '..';
import createDivided from '../../create/Divided';
import createNumberNode from '../../create/NumberNode';
import createVector from '../../create/Vector';
import { Divided, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';

export default function evaluateDivided(node: Divided, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number') {
        if (rightChild.value === 0) {
            throw `ArithmeticError: division by zero is not allowed`;
        }

        return createNumberNode(leftChild.value / rightChild.value);
    } else if (leftChild.type === 'function' && rightChild.type === 'function') {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createDivided, context);
    } else if (leftChild.type === 'vector' && rightChild.type === 'number') {
        return createVector(leftChild.values.map((value) => evaluate(createDivided(value, rightChild), context)));
    }

    throw `TypeError: <${leftChild.type}> / <${rightChild.type}> is not defined`;
}
