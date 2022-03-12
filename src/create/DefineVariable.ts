import { DefineVariable, SyntaxTreeNode } from '../types';

export default function createDefineVariable(name: string, value: SyntaxTreeNode): DefineVariable {
    return {
        type: 'defineVariable',
        name,
        value,
    };
}
