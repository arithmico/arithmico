import { SyntaxTreeNode } from '../types';

export type NormalizeResult = [SyntaxTreeNode, boolean];

export type Normalizer = (node: SyntaxTreeNode) => SyntaxTreeNode | null;

export function normalize(node: SyntaxTreeNode, normalizers: Normalizer[]): SyntaxTreeNode {
    return normalizers.reduce((currentNode, normalizer) => {
        const normalizedNode = normalizer(currentNode);
        return normalizedNode ? normalizedNode : currentNode;
    }, node);
}
