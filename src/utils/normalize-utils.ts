import { Context, SyntaxTreeNode } from '../types';

export type Normalizer = (node: SyntaxTreeNode, context: Context) => SyntaxTreeNode;
export type PartialNormalizer = (node: SyntaxTreeNode, context: Context) => SyntaxTreeNode | void;

export function combineNormalizers(normalizers: PartialNormalizer[]): Normalizer {
    return (node: SyntaxTreeNode, context: Context) =>
        normalizers.reduce((currentNode, normalizer) => {
            const normalizedNode = normalizer(currentNode, context);
            return normalizedNode ? normalizedNode : currentNode;
        }, node);
}
