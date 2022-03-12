import { DefineFunction, SyntaxTreeNode, DefineFunctionParameter } from '../types';

export default function createDefineFunction(
    name: string,
    parameters: DefineFunctionParameter[],
    value: SyntaxTreeNode,
): DefineFunction {
    return {
        type: 'defineFunction',
        name,
        parameters,
        value,
    };
}
