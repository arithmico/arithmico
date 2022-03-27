import { DefineFunctionParameterType } from './../../types/SyntaxTreeNodes';
import { StackFrame } from './../../types/Context';
import evaluate from '..';
import { Context, SyntaxTreeNode, DefineLambdaFunction } from '../../types';
import createFunction from '../../create/Function';

export default function evaluateDefineLambdaFunction(node: DefineLambdaFunction, context: Context): SyntaxTreeNode {
    if (context.stack.length === 0) {
        throw 'ContextError: No stackframes available';
    }

    const evaluator = (parameters: SyntaxTreeNode[], context: Context) => {
        if (parameters.length !== node.parameters.length) {
            throw `RuntimeError: lambda: invalid number of arguments expected ${node.parameters.length} got ${parameters.length}`;
        }

        node.parameters
            .map((parameter) => parameter.type)
            .forEach((pType, index) => {
                let valid = false;

                if (pType === DefineFunctionParameterType.Any) {
                    valid = true;
                } else if (pType === parameters[index].type) {
                    valid = true;
                }

                if (!valid) {
                    throw `TypeError: lambda: at argument #${index}: expected ${pType} got ${parameters[index].type}`;
                }
            });

        const localStackFrame: StackFrame = Object.fromEntries(
            node.parameters.map((parameter, index) => [parameter.name, parameters[index]]),
        );

        const localContext = {
            ...context,
            stack: [...context.stack, localStackFrame],
        };

        return evaluate(node.value, localContext);
    };

    return createFunction(true, evaluator);
}
