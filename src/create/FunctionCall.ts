import { SyntaxTreeNode, FunctionCall } from '../types';

export default function createFunctionCall(name: string, parameters: SyntaxTreeNode[]): FunctionCall {
    return {
        type: 'functionCall',
        name,
        parameters,
    };
}
