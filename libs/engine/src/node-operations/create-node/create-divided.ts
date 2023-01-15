import { SyntaxTreeNode, Divided } from '../../types';

export default function createDivided(left: SyntaxTreeNode, right: SyntaxTreeNode): Divided {
    return {
        type: 'divided',
        left,
        right,
    };
}
