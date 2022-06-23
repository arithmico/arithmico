import evaluate from '..';
import createMinus from '../../create/Minus';
import createNumberNode from '../../create/NumberNode';
import createVector from '../../create/Vector';
import { Minus, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';
import { compareShapesOfVectors } from '../../utils/vector-utils';

export default function evaluateMinus(node: Minus, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (
        leftChild.type === 'number' &&
        rightChild.type === 'number' &&
        context.options.config.operators.minusNumberNumber
    ) {
        return createNumberNode(leftChild.value - rightChild.value);
    } else if (
        leftChild.type === 'vector' &&
        rightChild.type === 'vector' &&
        context.options.config.operators.minusVectorVector
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
        context.options.config.operators.minusFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createMinus, context);
    }

    throw `TypeError: <${leftChild.type}> - <${rightChild.type}> is not defined`;
}
