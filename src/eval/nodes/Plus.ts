import evaluate from '..';
import createFunctionCall from '../../create/FunctionCall';
import createLambda from '../../create/Lambda';
import createNumberNode from '../../create/NumberNode';
import createPlus from '../../create/Plus';
import createSymbolNode from '../../create/SymbolNode';
import createVector from '../../create/Vector';
import { Plus, Context, SyntaxTreeNode } from '../../types';
import { compareFunctionHeaders } from '../../utils/parameter-utils';
import { compareShapesOfVectors } from '../../utils/vector-utils';

export default function evaluatePlus(node: Plus, context: Context): SyntaxTreeNode {
    const leftChild = evaluate(node.left, context);
    const rightChild = evaluate(node.right, context);

    if (leftChild.type === 'number' && rightChild.type === 'number') {
        return createNumberNode(leftChild.value + rightChild.value);
    } else if (leftChild.type === 'vector' && rightChild.type === 'vector') {
        if (!compareShapesOfVectors(leftChild, rightChild)) {
            throw `ArithmeticError: can not add vectors of incompatible shapes`;
        }

        return evaluate(
            createVector(
                leftChild.values.map((_, index) => createPlus(leftChild.values[index], rightChild.values[index])),
            ),
            context,
        );
    } else if (leftChild.type === 'function' && rightChild.type === 'function') {
        if (!compareFunctionHeaders(leftChild.header, rightChild.header)) {
            throw `TypeError: incompatible function signatures`;
        }

        return evaluate(
            createLambda(
                leftChild.header,
                createPlus(
                    createFunctionCall(
                        leftChild,
                        leftChild.header.map((headerItem) => createSymbolNode(headerItem.name)),
                    ),
                    createFunctionCall(
                        rightChild,
                        leftChild.header.map((headerItem) => createSymbolNode(headerItem.name)),
                    ),
                ),
            ),
            context,
        );
    }

    throw `TypeError: <${leftChild.type}> + <${rightChild.type}> is not defined`;
}
