import evaluate from '../index';
import createNumberNode from '../../create-node/create-number-node';
import createLambda from '../../create-node/create-lambda';
import createFunctionCall from '../../create-node/create-function-call';
import createSymbolNode from '../../create-node/create-symbol-node';
import { Context, Factorial, SyntaxTreeNode } from '../../../types';
import createFactorial from '../../create-node/create-factorial';
import { calculateFactorial } from '../../../utils/math-utils/factorial-utils';

export default function evaluateFactorial(node: Factorial, context: Context): SyntaxTreeNode {
    const value = evaluate(node.value, context);

    if (value.type === 'number' && __OPERATORS.factorialNumber) {
        return createNumberNode(calculateFactorial(value.value));
    } else if (value.type === 'function' && __OPERATORS.factorialFunction) {
        return evaluate(
            createLambda(
                value.header,
                createFactorial(
                    createFunctionCall(
                        value,
                        value.header.map((headerItem) => createSymbolNode(headerItem.name)),
                    ),
                ),
            ),
            context,
        );
    }

    throw `TypeError: <${value.type}>! is not defined`;
}
