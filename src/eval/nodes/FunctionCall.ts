import evaluate from '..';
import { FunctionCall, Context, SyntaxTreeNode } from '../../types';

export default function evaluateFunctionCall(node: FunctionCall, context: Context): SyntaxTreeNode {
    const name = node.name;

    for (let i = context.stack.length - 1; i >= 0; i--) {
        const stackFrame = context.stack[i];

        if (stackFrame[name]) {
            const stackObject = stackFrame[name];

            if (stackObject.type === 'function') {
                const parameters = stackObject.evaluateParametersBefore
                    ? node.parameters.map((parameter) => evaluate(parameter, context))
                    : node.parameters;

                return stackObject.evaluator(parameters, context);
            } else {
                throw `TypeError: ${name} is not a function`;
            }
        }
    }

    throw `ReferenceError: ${name} is not defined`;
}
