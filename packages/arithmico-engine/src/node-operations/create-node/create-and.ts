import { SyntaxTreeNode, And } from '../../types';

export default function createAnd(left: SyntaxTreeNode, right: SyntaxTreeNode): And {
    return {
        type: 'and',
        left,
        right,
    };
}
