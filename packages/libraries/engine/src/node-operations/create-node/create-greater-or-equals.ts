import { SyntaxTreeNode, GreaterOrEquals } from '../../types';

export default function createGreaterOrEquals(left: SyntaxTreeNode, right: SyntaxTreeNode): GreaterOrEquals {
    return {
        type: 'greaterOrEquals',
        left,
        right,
    };
}
