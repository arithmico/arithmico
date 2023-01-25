import { FunctionNode, Define, SyntaxTreeNode } from '../../types/nodes.types';

export default function createDefine(name: string, value: SyntaxTreeNode | FunctionNode): Define {
    return {
        type: 'define',
        name,
        value,
    };
}
