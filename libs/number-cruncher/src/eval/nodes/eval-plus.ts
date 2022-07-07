import evaluate from '..';
import createNumberNode from '../../create/create-number-node';
import createPlus from '../../create/create-plus';
import createVector from '../../create/create-vector';
import { Plus, Context, SyntaxTreeNode } from '../../types';
import { createBinaryOperatorFunctionComposition } from '../../utils/compose-function-utils';
import { compareShapesOfVectors } from '../../utils/tensor-utils';

export default function evaluatePlus(node: Plus, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (
        leftChild.type === 'number' &&
        rightChild.type === 'number' &&
        context.options.config.operators.plusNumberNumber
    ) {
        return createNumberNode(leftChild.value + rightChild.value);
    } else if (
        leftChild.type === 'vector' &&
        rightChild.type === 'vector' &&
        context.options.config.operators.plusVectorVector
    ) {
        if (!compareShapesOfVectors(leftChild, rightChild)) {
            throw `ArithmeticError: can not add vectors of incompatible shapes`;
        }

        return evaluate(
            createVector(
                leftChild.values.map((_, index) => createPlus(leftChild.values[index], rightChild.values[index])),
            ),
            context,
        );
    } else if (
        leftChild.type === 'function' &&
        rightChild.type === 'function' &&
        context.options.config.operators.plusFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createPlus, context);
    }

    throw `TypeError: <${leftChild.type}> + <${rightChild.type}> is not defined`;
}
