import evaluate from '..';
import createNumberNode from '../../create-node/create-number-node';
import createPlus from '../../create-node/create-plus';
import createVector from '../../create-node/create-vector';
import { Plus, Context, SyntaxTreeNode } from '../../../types';
import { createBinaryOperatorFunctionComposition } from '../../../utils/compose-function-utils';
import { compareShapesOfVectors } from '../../../utils/tensor-utils';

export default function evaluatePlus(node: Plus, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number' && __OPERATORS.plusNumberNumber) {
        return createNumberNode(leftChild.value + rightChild.value);
    } else if (leftChild.type === 'vector' && rightChild.type === 'vector' && __OPERATORS.plusVectorVector) {
        if (!compareShapesOfVectors(leftChild, rightChild)) {
            throw `ArithmeticError: can not add vectors of incompatible shapes`;
        }

        return evaluate(
            createVector(
                leftChild.values.map((_, index) => createPlus(leftChild.values[index], rightChild.values[index])),
            ),
            context,
        );
    } else if (leftChild.type === 'function' && rightChild.type === 'function' && __OPERATORS.plusFunctionFunction) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createPlus, context);
    }

    throw `TypeError: <${leftChild.type}> + <${rightChild.type}> is not defined`;
}
