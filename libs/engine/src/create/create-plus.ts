import { SyntaxTreeNode, Plus } from '../types';

export default function createPlus(left: SyntaxTreeNode, right: SyntaxTreeNode): Plus {
    return {
        type: 'plus',
        left,
        right,
    };
}
