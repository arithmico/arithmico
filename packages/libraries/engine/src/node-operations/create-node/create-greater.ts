import { SyntaxTreeNode, Greater } from '../../types';

export default function createGreater(left: SyntaxTreeNode, right: SyntaxTreeNode): Greater {
    return {
        type: 'greater',
        left,
        right,
    };
}
