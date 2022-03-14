import serialize, { needsBrackets } from '..';
import { Options, Plus } from '../../types';

export default function serializePlus(node: Plus, options: Options): string {
    const leftChild = needsBrackets(node.type, node.left.type)
        ? `(${serialize(node.left, options)})`
        : serialize(node.left, options);

    const rightChild = needsBrackets(node.type, node.right.type)
        ? `(${serialize(node.right, options)})`
        : serialize(node.right, options);

    return `${leftChild} + ${rightChild}`;
}
