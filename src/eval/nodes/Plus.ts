import evaluate from '..';
import createNumberNode from '../../create/NumberNode';
import createPlus from '../../create/Plus';
import createVector from '../../create/Vector';
import { Plus, Context, SyntaxTreeNode } from '../../types';
import { compareShapesOfVectors } from '../../utils/vector-utils';

export default function evaluatePlus(node: Plus, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);
    console.log('plus');

    if (leftChild.type === 'number' && rightChild.type === 'number') {
        return createNumberNode(leftChild.value + rightChild.value);
    } else if (leftChild.type === 'vector' && rightChild.type === 'vector') {
        if (!compareShapesOfVectors(leftChild, rightChild)) {
            throw `ArithmeticError: can not add vectors of incompatible shapes`;
        }

        return evaluate(
            createVector(
                leftChild.values.map((_, index) => createPlus(leftChild.values[index], rightChild.values[index])),
            ),
            context,
        );
    }

    throw `TypeError: <${leftChild.type}> + <${rightChild.type}> is not defined`;
}
