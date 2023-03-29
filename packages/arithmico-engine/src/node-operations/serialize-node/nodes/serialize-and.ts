import serialize, { needsBrackets } from '..';
import { And, Options } from '../../../types';

export default function serializeAnd(node: And, options: Options): string {
    const leftChild = needsBrackets(node.type, node.left.type)
        ? `(${serialize(node.left, options)})`
        : serialize(node.left, options);

    const rightChild = needsBrackets(node.type, node.right.type)
        ? `(${serialize(node.right, options)})`
        : serialize(node.right, options);

    return `${leftChild} & ${rightChild}`;
}
