import evaluate from '..';
import createNumberNode from '../../create/NumberNode';
import createTimes from '../../create/Times';
import createVector from '../../create/Vector';
import { Times, Context, SyntaxTreeNode } from '../../types';

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

    throw `TypeError: <${leftChild.type}> * <${rightChild.type}> is not defined`;
}
