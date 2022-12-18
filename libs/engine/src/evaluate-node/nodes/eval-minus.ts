import evaluate from '..';
import createMinus from '../../create-node/create-minus';
import createNumberNode from '../../create-node/create-number-node';
import createVector from '../../create-node/create-vector';
import { Minus, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';
import { compareShapesOfVectors } from '../../utils/tensor-utils';

export default function evaluateMinus(node: Minus, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number' && context.options.operators.minusNumberNumber) {
        return createNumberNode(leftChild.value - rightChild.value);
    } else if (
        leftChild.type === 'vector' &&
        rightChild.type === 'vector' &&
        context.options.operators.minusVectorVector
    ) {
        if (!compareShapesOfVectors(leftChild, rightChild)) {
            throw `ArithmeticError: can not add vectors of incompatible shapes`;
        }

        return evaluate(
            createVector(
                leftChild.values.map((_, index) => createMinus(leftChild.values[index], rightChild.values[index])),
            ),
            context,
        );
    } else if (
        leftChild.type === 'function' &&
        rightChild.type === 'function' &&
        context.options.operators.minusFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createMinus, context);
    }

    throw `TypeError: <${leftChild.type}> - <${rightChild.type}> is not defined`;
}
