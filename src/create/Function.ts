import { FunctionNode, FunctionHeaderItem } from './../types/SyntaxTreeNodes';
import { Context, SyntaxTreeNode } from '../types';

export default function createFunction(
    evaluateParametersBefore: boolean,
    evaluator: (params: SyntaxTreeNode[], context: Context) => SyntaxTreeNode,
    header: FunctionHeaderItem[],
    serialized: string,
): FunctionNode {
    return {
        type: 'function',
        evaluateParametersBefore,
        evaluator,
        header,
        serialized,
    };
}
