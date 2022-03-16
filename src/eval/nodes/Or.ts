import evaluate from '..';
import createBooleanNode from '../../create/BooleanNode';
import { Or, Context, SyntaxTreeNode } from '../../types';

export default function evaluateOr(node: Or, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'boolean' && rightChild.type === 'boolean') {
        return createBooleanNode(leftChild.value || rightChild.value);
    }

    throw `TypeError: <${leftChild.type}> | <${rightChild.type}> is not defined`;
}
