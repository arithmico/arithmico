import { SyntaxTreeNode, Power } from '../../types';

export default function createPower(left: SyntaxTreeNode, right: SyntaxTreeNode): Power {
    return {
        type: 'power',
        left,
        right,
    };
}
