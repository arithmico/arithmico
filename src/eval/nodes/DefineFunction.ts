import { StackFrame } from './../../types/Context';
import evaluate from '..';
import { DefineFunction, Context, SyntaxTreeNode } from '../../types';

export default function evaluateDefineFunction(node: DefineFunction, context: Context): SyntaxTreeNode {
    if (context.stack.length === 0) {
        throw 'ContextError: No stackframes available';
    }

    const evaluator = (parameters: SyntaxTreeNode[], context: Context) => {
        const localStackFrame: StackFrame = Object.fromEntries(
            node.parameters.map((parameter, index) => [
                parameter.name,
                {
                    type: 'value',
                    value: parameters[index],
                },
            ]),
        );

        const localContext = {
            ...context,
            stack: [...context.stack, localStackFrame],
        };

        return evaluate(node.value, localContext);
    };

    context.stack[context.stack.length - 1][node.name] = {
        type: 'function',
        evaluateParametersBefore: true,
        evaluator,
    };

    return node;
}
