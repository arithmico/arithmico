import evaluate from '..';
import createNumberNode from '../../create/NumberNode';
import createPlus from '../../create/Plus';
import createTimes from '../../create/Times';
import createVector from '../../create/Vector';
import { Times, Context, SyntaxTreeNode } from '../../types';
import { getVectorDimensions } from '../../utils/vector-utils';

export default function evaluateTimes(node: Times, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number') {
        return createNumberNode(leftChild.value * rightChild.value);
    }

    if (leftChild.type === 'number' && rightChild.type === 'vector') {
        return createVector(rightChild.values.map((value) => evaluate(createTimes(leftChild, value), context)));
    }

    if (leftChild.type === 'vector' && rightChild.type === 'number') {
        return createVector(leftChild.values.map((value) => evaluate(createTimes(rightChild, value), context)));
    }

    if (leftChild.type === 'vector' && rightChild.type === 'vector') {
        const leftDims = getVectorDimensions(leftChild);
        const rightDims = getVectorDimensions(rightChild);
        const leftRank = leftDims.length;
        const rightRank = rightDims.length;

        // vector scalar product
        if (leftRank === 1 && rightRank === 1) {
            if (leftDims[0] !== rightDims[0]) {
                throw 'ShapeError: incompatible vector shapes';
            }

            if (leftDims[0] === 0) {
                throw 'ShapeError: empty vector';
            }

            const components: SyntaxTreeNode[] = leftChild.values.map((_, index) =>
                createTimes(leftChild.values[index], rightChild.values[index]),
            );

            return evaluate(
                components.reduceRight((right, left) => createPlus(left, right)),
                context,
            );
        }
    }

    throw `TypeError: <${leftChild.type}> * <${rightChild.type}> is not defined`;
}
