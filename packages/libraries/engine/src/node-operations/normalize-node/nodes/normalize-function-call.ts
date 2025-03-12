import normalize from '..';
import { Context, FunctionCall } from '../../../types';
import { containsVariables } from '../../../utils/symbolic-utils';
import createFunctionCall from '../../create-node/create-function-call';
import evaluate from '../../evaluate-node';

export default function normalizeFunctionCall(node: FunctionCall, context: Context) {
    if (!containsVariables(node, context)) {
        return evaluate(node, context);
    }

    const parameters = node.parameters.map((parameter) => normalize(parameter, context));
    return createFunctionCall(node.function, parameters);
}
