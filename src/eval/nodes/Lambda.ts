import { Context } from './../../types/Context';
import { StackFrame } from '../../types/Context';
import evaluate from '..';
import { SyntaxTreeNode, Lambda } from '../../types';
import createFunction from '../../create/Function';
import { mapParametersToStackFrame } from '../../utils/parameter-utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function evaluateLambda(node: Lambda, _context: Context): SyntaxTreeNode {
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
