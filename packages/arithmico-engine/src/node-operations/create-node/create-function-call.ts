import { SyntaxTreeNode, FunctionCall } from '../../types';

export default function createFunctionCall(func: SyntaxTreeNode, parameters: SyntaxTreeNode[]): FunctionCall {
    return {
        type: 'functionCall',
        function: func,
        parameters,
    };
}
