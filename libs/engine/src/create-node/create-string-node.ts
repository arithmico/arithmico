import { StringNode } from '../types/SyntaxTreeNodes';

export default function createStringNode(value: string): StringNode {
    return {
        type: 'string',
        value,
    };
}
