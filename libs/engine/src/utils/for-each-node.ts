import { SyntaxTreeNode } from '../types';

type ForEachNodeLookupTable<T extends unknown[], R> = {
    [key in SyntaxTreeNode['type']]: (node: SyntaxTreeNode, ...args: T) => R;
};

export function forEachNode<T extends unknown[], R>(table: ForEachNodeLookupTable<T, R>) {
    return (node: SyntaxTreeNode, ...args: T): R => table[node.type](node, ...args);
}
