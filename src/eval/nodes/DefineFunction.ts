import { StackFrame } from './../../types/Context';
import evaluate from '..';
import { DefineFunction, Context, SyntaxTreeNode } from '../../types';

export default function evaluateDefineFunction(node: DefineFunction, context: Context): SyntaxTreeNode {
    if (context.stack.length === 0) {
        throw 'ContextError: No stackframes available';
    }

    const evaluator = (parameters: SyntaxTreeNode[], context: Context) => {
        if (parameters.length !== node.parameters.length) {
            throw `RuntimeError: ${node.name}: invalid number of arguments expected ${node.parameters.length} got ${parameters.length}`;
        }

        node.parameters
            .map((parameter) => parameter.type)
            .forEach((pType, index) => {
                let valid = false;

                switch (pType) {
                    case 'vector':
                        valid = parameters[index].type === 'vector';
                        break;

                    case 'boolean':
                        valid = parameters[index].type === 'boolean';
                        break;

                    case 'number':
                        valid = parameters[index].type === 'number';
                        break;

                    case 'any':
                        valid = true;
                }

                if (!valid) {
                    throw `TypeError: ${node.name}: at argument #${index}: expected ${pType} got ${parameters[index].type}`;
                }
            });

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
