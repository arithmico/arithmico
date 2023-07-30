import { Negate, SyntaxTreeNode } from '../../types';

export default function createNegate(value: SyntaxTreeNode): Negate {
    return {
        type: 'negate',
        value,
    };
}
