import { FunctionNode } from './../types/SyntaxTreeNodes';
import { Context, SyntaxTreeNode } from '../types';

export default function createFunction(
    evaluateParametersBefore: boolean,
    evaluator: (params: SyntaxTreeNode[], context: Context) => SyntaxTreeNode,
): FunctionNode {
    return {
        type: 'function',
        evaluateParametersBefore,
        evaluator,
    };
}
