import { SyntaxTreeNode, Equals } from '../types';

export default function createEquals(left: SyntaxTreeNode, right: SyntaxTreeNode): Equals {
    return {
        type: 'equals',
        left,
        right,
    };
}
