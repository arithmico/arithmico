import evaluate from '..';
import { Context, Define, SyntaxTreeNode } from '../../types';

export default function evaluateDefine(node: Define, context: Context): SyntaxTreeNode {
    return {
        type: 'define',
        name: node.name,
        value: evaluate(node.value, context),
    };
}
