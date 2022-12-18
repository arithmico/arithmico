import serialize, { needsBrackets } from '..';
import { Minus, Options } from '../../types';

export default function serializeMinus(node: Minus, options: Options): string {
    const leftChild =
        needsBrackets(node.type, node.left.type) && node.left.type !== 'plus'
            ? `(${serialize(node.left, options)})`
            : serialize(node.left, options);

    const rightChild = needsBrackets(node.type, node.right.type, true)
        ? `(${serialize(node.right, options)})`
        : serialize(node.right, options);

    return `${leftChild} - ${rightChild}`;
}
