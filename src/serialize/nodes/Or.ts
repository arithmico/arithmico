import serialize, { needsBrackets } from '..';
import { Options, Or } from '../../types';

export default function serializeOr(node: Or, options: Options): string {
    const leftChild = needsBrackets(node.type, node.left.type)
        ? `(${serialize(node.left, options)})`
        : serialize(node.left, options);

    const rightChild = needsBrackets(node.type, node.right.type)
        ? `(${serialize(node.right, options)})`
        : serialize(node.right, options);

    return `${leftChild} | ${rightChild}`;
}
