import { Context } from '../../../types/context.types';
import { StackFrame } from '../../../types/context.types';
import evaluate from '..';
import { SyntaxTreeNode, Lambda } from '../../../types';
import createFunction from '../../create-node/create-function';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';

export default function evaluateLambda(node: Lambda): SyntaxTreeNode {
    if (!__OPERATORS.lambda) {
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
