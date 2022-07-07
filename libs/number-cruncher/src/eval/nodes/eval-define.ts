import evaluate from '..';
import { Context, Define, SyntaxTreeNode } from '../../types';

export default function evaluateDefine(node: Define, context: Context): SyntaxTreeNode {
    if (!context.options.config.operators.define) {
        throw `RuntimeError: definitions are disabled in this configuration`;
    }

    return {
        type: 'define',
        name: node.name,
        value: evaluate(node.value, context),
    };
}
