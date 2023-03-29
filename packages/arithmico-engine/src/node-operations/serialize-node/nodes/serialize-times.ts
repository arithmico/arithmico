import serialize, { needsBrackets } from '..';
import { Options, Times } from '../../../types';

export default function serializeTimes(node: Times, options: Options): string {
    const leftChild =
        needsBrackets(node.type, node.left.type) || (node.left.type === 'number' && node.left.value < 0)
            ? `(${serialize(node.left, options)})`
            : serialize(node.left, options);

    const rightChild =
        needsBrackets(node.type, node.right.type) || (node.right.type === 'number' && node.right.value < 0)
            ? `(${serialize(node.right, options)})`
            : serialize(node.right, options);

    return `${leftChild} * ${rightChild}`;
}
