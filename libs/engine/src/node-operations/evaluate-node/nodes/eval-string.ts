import { StringNode, SyntaxTreeNode } from '../../../types/nodes.types';

export default function evaluateString(node: StringNode): SyntaxTreeNode {
    if (!__TYPES.string) {
        throw `RuntimeError: strings are disabled in this configuration`;
    }

    return node;
}
