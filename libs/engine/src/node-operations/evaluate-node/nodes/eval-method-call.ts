import evaluate from '..';
import { Context, MethodCall, SyntaxTreeNode } from '../../../types';
import { existsMethod } from '../../../utils/context-utils';

export default function evaluateMethodCall(node: MethodCall, context: Context): SyntaxTreeNode {
    const object = evaluate(node.object, context);

    if (!existsMethod(node.method, object.type, context)) {
        throw `RuntimeError: a method with name "${node.method}" does not exist for type "${object.type}"`;
    }

    return context.methods.get(object.type).get(node.method)(object, node.parameters, context);
}
