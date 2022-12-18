import evaluate from '../../node-operations/evaluate-node';
import { Context, SyntaxTreeNode } from '../../types';

export function evaluateNode({ node, context }: { node: SyntaxTreeNode; context: Context }) {
    const evaluatedNode = evaluate(node, context);
    return {
        node: evaluatedNode,
        context,
    };
}
