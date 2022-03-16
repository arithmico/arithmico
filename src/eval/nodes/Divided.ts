import evaluate from '..';
import createNumberNode from '../../create/NumberNode';
import { Divided, Context, SyntaxTreeNode } from '../../types';

export default function evaluateDivided(node: Divided, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number') {
        if (rightChild.value === 0) {
            throw `ArithmeticError: division by zero is not allowed`;
        }

        return createNumberNode(leftChild.value / rightChild.value);
    }

    throw `TypeError: <${leftChild.type}> / <${rightChild.type}> is not defined`;
}
