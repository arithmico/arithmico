import { SyntaxTreeNode, Minus } from '../../types';

export default function createMinus(left: SyntaxTreeNode, right: SyntaxTreeNode): Minus {
    return {
        type: 'minus',
        left,
        right,
    };
}
