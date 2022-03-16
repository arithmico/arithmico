import evaluate from '..';
import createBooleanNode from '../../create/BooleanNode';
import { Greater, Context, SyntaxTreeNode } from '../../types';

export default function evaluateGreater(node: Greater, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number') {
        return createBooleanNode(leftChild.value > rightChild.value);
    }

    throw `TypeError: <${leftChild.type}> > <${rightChild.type}> is not defined`;
}
