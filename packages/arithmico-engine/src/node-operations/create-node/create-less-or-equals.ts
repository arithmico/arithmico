import { SyntaxTreeNode, LessOrEquals } from '../../types';

export default function createLessOrEquals(left: SyntaxTreeNode, right: SyntaxTreeNode): LessOrEquals {
    return {
        type: 'lessOrEquals',
        left,
        right,
    };
}
