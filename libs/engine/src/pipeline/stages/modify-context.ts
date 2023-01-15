import { Context, SyntaxTreeNode } from '../../types';
import { insertStackObject } from '../../utils/context-utils';

export function modifyContext({ node, context }: { node: SyntaxTreeNode; context: Context }) {
    if (node.type !== 'define') {
        return { node, context };
    }

    return {
        node,
        context: insertStackObject(node.name, node.value, context),
    };
}
