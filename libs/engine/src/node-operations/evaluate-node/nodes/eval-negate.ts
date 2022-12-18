import evaluate from '..';
import createBooleanNode from '../../create-node/create-boolean-node';
import createFunctionCall from '../../create-node/create-function-call';
import createLambda from '../../create-node/create-lambda';
import createNegate from '../../create-node/create-negate';
import createNumberNode from '../../create-node/create-number-node';
import createSymbolNode from '../../create-node/create-symbol-node';
import { Negate, Context, SyntaxTreeNode } from '../../../types';

export default function evaluateNegate(node: Negate, context: Context): SyntaxTreeNode {
    const value = evaluate(node.value, context);

    if (value.type === 'boolean' && context.options.operators.negateBoolean) {
        return createBooleanNode(!value.value);
    } else if (value.type === 'number' && context.options.operators.negateNumber) {
        return createNumberNode(-value.value);
    } else if (value.type === 'function' && context.options.operators.negateFunction) {
        return evaluate(
            createLambda(
                value.header,
                createNegate(
                    createFunctionCall(
                        value,
                        value.header.map((headerItem) => createSymbolNode(headerItem.name)),
                    ),
                ),
            ),
            context,
        );
    }

    throw `TypeError: - <${value.type}> is not defined`;
}
