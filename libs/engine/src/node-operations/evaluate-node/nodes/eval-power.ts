import evaluate from '..';
import createNumberNode from '../../create-node/create-number-node';
import createPower from '../../create-node/create-power';
import { Power, Context, SyntaxTreeNode } from '../../../types';
import { createBinaryOperatorFunctionComposition } from '../../../utils/compose-function-utils';
import { convertListToOperatorChain } from '../../../utils/symbolic-utils';
import { createIdentityMatrix, getTensorDimensions, getTensorRank, isSquareMatrix } from '../../../utils/tensor-utils';

export default function evaluatePower(node: Power, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number' && context.options.operators.powerNumberNumber) {
        if (leftChild.value === 0 && rightChild.value < 0) {
            throw `ArithmeticError: division by zero is not allowed`;
        }

        return createNumberNode(Math.pow(leftChild.value, rightChild.value));
    } else if (
        leftChild.type === 'function' &&
        rightChild.type === 'function' &&
        context.options.operators.powerFunctionFunction
    ) {
        return createBinaryOperatorFunctionComposition(leftChild, rightChild, createPower, context);
    } else if (leftChild.type === 'vector' && rightChild.type === 'number') {
        const exponent = rightChild.value;
        const rank = (() => {
            try {
                return getTensorRank(leftChild);
            } catch (e) {
                throw 'ArithmeticError: tensor ^ number: invalid tensor shape';
            }
        })();

        if (exponent < 0) {
            throw 'ArithmeticError: tensor ^ number: only positive exponents are allowed';
        }

        if (exponent % 1 !== 0) {
            throw 'ArithmeticError: tensor ^ number: only integer exponents are allowed';
        }

        if (rank !== 1 && rank !== 2) {
            throw 'ArithmeticError: tensor ^ number: only tensors of rank 1 or 2 are allowed';
        }

        if (rank === 2 && !isSquareMatrix(leftChild)) {
            throw 'ArithmeticError: matrix ^ number: not a square matrix';
        }

        if (exponent === 1) {
            return leftChild;
        }

        if (exponent === 0 && rank === 1) {
            throw 'ArithmeticError: vector ^ 0: not defined';
        }

        if (exponent === 0 && rank === 2) {
            return createIdentityMatrix(getTensorDimensions(leftChild)[0]);
        }

        return evaluate(convertListToOperatorChain('times', new Array(exponent).fill(leftChild)), context);
    }
    throw `TypeError: <${leftChild.type}> ^ <${rightChild.type}> is not defined`;
}
