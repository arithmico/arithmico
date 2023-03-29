import { BooleanNode, SyntaxTreeNode } from '../../../types';

export default function evaluateBoolean(node: BooleanNode): SyntaxTreeNode {
    if (!__OBJECTS.boolean) {
        throw `RuntimeError: booleans are disabled in this configuration`;
    }

    return node;
}
