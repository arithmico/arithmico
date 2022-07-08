import { SyntaxTreeNode, Less } from '../types';

export default function createLess(left: SyntaxTreeNode, right: SyntaxTreeNode): Less {
    return {
        type: 'less',
        left,
        right,
    };
}
