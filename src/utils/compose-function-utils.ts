import createFunctionCall from '../create/FunctionCall';
import createLambda from '../create/Lambda';
import createSymbolNode from '../create/SymbolNode';
import evaluate from '../eval';
import { Context, FunctionNode, SyntaxTreeNode } from '../types';
import { compareFunctionHeaders } from './parameter-utils';

export function createBinaryOperatorFunctionComposition(
    leftFunc: FunctionNode,
    rightFunc: FunctionNode,
    binaryOperatorCreator: (left: SyntaxTreeNode, right: SyntaxTreeNode) => SyntaxTreeNode,
    context: Context,
) {
    if (!compareFunctionHeaders(leftFunc.header, rightFunc.header)) {
        throw `TypeError: incompatible function signatures`;
    }

    return evaluate(
        createLambda(
            leftFunc.header,
            binaryOperatorCreator(
                createFunctionCall(
                    leftFunc,
                    leftFunc.header.map((headerItem) => createSymbolNode(headerItem.name)),
                ),
                createFunctionCall(
                    rightFunc,
                    leftFunc.header.map((headerItem) => createSymbolNode(headerItem.name)),
                ),
            ),
        ),
        context,
    );
}
