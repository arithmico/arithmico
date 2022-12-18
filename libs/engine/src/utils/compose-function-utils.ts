import createLambda from '../node-operations/create-node/create-lambda';
import createSymbolNode from '../node-operations/create-node/create-symbol-node';
import evaluate from '../node-operations/evaluate-node';
import { Context, FunctionNode, SyntaxTreeNode } from '../types';
import { compareFunctionHeaders } from './parameter-utils';
import { replace, resolveNameConflicts } from './symbolic-utils';

export function createBinaryOperatorFunctionComposition(
    leftFunc: FunctionNode,
    rightFunc: FunctionNode,
    binaryOperatorCreator: (left: SyntaxTreeNode, right: SyntaxTreeNode) => SyntaxTreeNode,
    context: Context,
) {
    if (!compareFunctionHeaders(leftFunc.header, rightFunc.header)) {
        throw `TypeError: incompatible function signatures`;
    }

    const rightExpression = leftFunc.header.reduce((expr, headerItem, index) => {
        const exprWithoutNameConflicts =
            headerItem.name !== rightFunc.header[index].name ? resolveNameConflicts(expr, headerItem.name) : expr;

        return replace(
            exprWithoutNameConflicts,
            (node: SyntaxTreeNode) => node.type === 'symbol' && node.name === rightFunc.header[index].name,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_node: SyntaxTreeNode) => createSymbolNode(headerItem.name),
        );
    }, rightFunc.expression);

    return evaluate(
        createLambda(leftFunc.header, binaryOperatorCreator(leftFunc.expression, rightExpression)),
        context,
    );
}
