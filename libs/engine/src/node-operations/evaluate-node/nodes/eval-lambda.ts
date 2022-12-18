import { Context } from '../../../types/Context';
import { StackFrame } from '../../../types/Context';
import evaluate from '..';
import { SyntaxTreeNode, Lambda } from '../../../types';
import createFunction from '../../create-node/create-function';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';

export default function evaluateLambda(node: Lambda, context: Context): SyntaxTreeNode {
    if (!context.options.operators.lambda) {
        throw `RuntimeError: lambdas are disabled in this configuration`;
    }

    const evaluator = (parameters: SyntaxTreeNode[], context: Context) => {
        const localStackFrame: StackFrame = mapParametersToStackFrame('lambda', parameters, node.header, context);

        const localContext = {
            ...context,
            stack: [...context.stack, localStackFrame],
        };

        return evaluate(node.expression, localContext);
    };

    return createFunction(evaluator, node.header, node.expression);
}
