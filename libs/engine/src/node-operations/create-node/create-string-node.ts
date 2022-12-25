import { StringNode } from '../../types/nodes.types';

export default function createStringNode(value: string): StringNode {
    return {
        type: 'string',
        value,
    };
}
