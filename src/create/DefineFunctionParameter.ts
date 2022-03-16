import { DefineFunctionParameter, DefineFunctionParameterType } from '../types';

export default function createDefineFunctionParameter(
    name: string,
    type: DefineFunctionParameterType,
): DefineFunctionParameter {
    return {
        name,
        type,
    };
}
