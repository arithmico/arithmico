import { SyntaxTreeNode, Times } from '../../types';

export default function createTimes(left: SyntaxTreeNode, right: SyntaxTreeNode): Times {
    return {
        type: 'times',
        left,
        right,
    };
}
