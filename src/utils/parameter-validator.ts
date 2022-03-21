import { SyntaxTreeNode } from './../types/SyntaxTreeNodes';

export function createParameterValidator(name: string, parameterTypes: SyntaxTreeNode['type'][]) {
    return (parameters: SyntaxTreeNode[]) => {
        if (parameters.length !== parameterTypes.length) {
            throw `RuntimeError: ${name}: invalid number of arguments expected ${parameterTypes.length} got ${parameters.length}`;
        }

        parameters.forEach((parameter, index) => {
            if (parameter.type !== parameterTypes[index]) {
                throw `TypeError: ${name}: argument ${index + 1}: expected ${parameterTypes[index]} got ${
                    parameter.type
                }`;
            }
        });
    };
}
