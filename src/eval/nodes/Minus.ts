import evaluate from '..';
import createMinus from '../../create/Minus';
import createNumberNode from '../../create/NumberNode';
import createVector from '../../create/Vector';
import { Minus, Context, SyntaxTreeNode } from '../../types';
import { compareShapesOfVectors } from '../../utils/vector-utils';

export default function evaluateMinus(node: Minus, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number') {
        return createNumberNode(leftChild.value - rightChild.value);
    } else if (leftChild.type === 'vector' && rightChild.type === 'vector') {
        if (!compareShapesOfVectors(leftChild, rightChild)) {
            throw `ArithmeticError: can not add vectors of incompatible shapes`;
        }

        return evaluate(
            createVector(
                leftChild.values.map((_, index) => createMinus(leftChild.values[index], rightChild.values[index])),
            ),
            context,
        );
    }

    throw `TypeError: <${leftChild.type}> - <${rightChild.type}> is not defined`;
}
