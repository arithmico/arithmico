import serialize, { needsBrackets } from '..';
import { Greater, Options } from '../../types';

export default function serializeGreater(node: Greater, options: Options): string {
    const leftChild = needsBrackets(node.type, node.left.type)
        ? `(${serialize(node.left, options)})`
        : serialize(node.left, options);

    const rightChild = needsBrackets(node.type, node.right.type)
        ? `(${serialize(node.right, options)})`
        : serialize(node.right, options);

    return `${leftChild} > ${rightChild}`;
}
