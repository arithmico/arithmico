import { FunctionNode, FunctionHeaderItem } from '../../types/nodes.types';
import { Context, SyntaxTreeNode } from '../../types';

export default function createFunction(
    evaluator: (params: SyntaxTreeNode[], context: Context) => SyntaxTreeNode,
    header: FunctionHeaderItem[],
    expression: SyntaxTreeNode,
): FunctionNode {
    return {
        type: 'function',
        evaluator,
        header,
        expression,
    };
}
