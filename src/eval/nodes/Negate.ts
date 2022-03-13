import evaluate from '..';
import createBooleanNode from '../../create/BooleanNode';
import createNumberNode from '../../create/NumberNode';
import { Negate, Context, SyntaxTreeNode } from '../../types';

export default function evaluateNegate(node: Negate, context: Context): SyntaxTreeNode {
    const value = evaluate(node.value, context);

    if (value.type === 'boolean') {
        return createBooleanNode(!value.value);
    } else if (value.type === 'number') {
        return createNumberNode(-value.value);
    }

    throw `TypeError: - <${value.type}> is not defined`;
}
