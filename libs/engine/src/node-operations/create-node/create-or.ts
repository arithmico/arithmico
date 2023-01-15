import { SyntaxTreeNode, Or } from '../../types';

export default function createOr(left: SyntaxTreeNode, right: SyntaxTreeNode): Or {
    return {
        type: 'or',
        left,
        right,
    };
}
