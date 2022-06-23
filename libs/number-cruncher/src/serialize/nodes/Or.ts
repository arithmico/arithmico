import serialize from '..';
import { Options, Or } from '../../types';

export default function serializeOr(node: Or, options: Options): string {
    const leftChild = serialize(node.left, options);
    const rightChild = serialize(node.right, options);

    return `${leftChild} | ${rightChild}`;
}
