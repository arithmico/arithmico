import { Context, MethodCall, SyntaxTreeNode } from '../../types';
import { existsMethod } from '../../utils/context-utils';

export default function evaluateMethodCall(node: MethodCall, context: Context): SyntaxTreeNode {
    if (!existsMethod(node.method, node.object.type, context)) {
        throw `RuntimeError: a method with name "${node.method}" does not exist for type "${node.object.type}"`;
    }

    return context.methods.get(node.object.type).get(node.method)(node.object, node.parameters, context);
}
