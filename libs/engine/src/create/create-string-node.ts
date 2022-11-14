import { StringNode } from '../types/SyntaxTreeNodes';

export default function createStingNode(value: string): StringNode {
    return {
        type: 'string',
        value,
    };
}
