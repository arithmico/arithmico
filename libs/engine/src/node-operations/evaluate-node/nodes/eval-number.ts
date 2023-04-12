import { NumberNode, SyntaxTreeNode } from '../../../types';

export default function evaluateNumber(node: NumberNode): SyntaxTreeNode {
    if (!__OBJECTS.number) {
        throw `RuntimeError: numbers are disabled in this configuration`;
    }

    return node;
}
