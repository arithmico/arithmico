import evaluate from '..';
import createBooleanNode from '../../create/create-boolean-node';
import createFunctionCall from '../../create/create-function-call';
import createLambda from '../../create/create-lambda';
import createNegate from '../../create/create-negate';
import createNumberNode from '../../create/create-number-node';
import createSymbolNode from '../../create/create-symbol-node';
import { Negate, Context, SyntaxTreeNode } from '../../types';

export default function evaluateNegate(node: Negate, context: Context): SyntaxTreeNode {
    const value = evaluate(node.value, context);

    if (value.type === 'boolean' && context.options.config.operators.negateBoolean) {
        return createBooleanNode(!value.value);
    } else if (value.type === 'number' && context.options.config.operators.negateNumber) {
        return createNumberNode(-value.value);
    } else if (value.type === 'function' && context.options.config.operators.negateFunction) {
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
