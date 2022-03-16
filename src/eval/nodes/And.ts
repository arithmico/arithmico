import evaluate from '..';
import createBooleanNode from '../../create/BooleanNode';
import { And, Context, SyntaxTreeNode } from '../../types';

export default function evaluateAnd(node: And, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'boolean' && rightChild.type === 'boolean') {
        return createBooleanNode(leftChild.value && rightChild.value);
    }

    throw `TypeError: <${leftChild.type}> & <${rightChild.type}> is not defined`;
}
