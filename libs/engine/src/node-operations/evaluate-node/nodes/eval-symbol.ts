import { Context, SymbolNode, SyntaxTreeNode } from '../../../types';
import { existsOnStack, getStackObject } from '../../../utils/context-utils';

export default function evaluateSymbol(node: SymbolNode, context: Context): SyntaxTreeNode {
    if (!__OBJECTS.symbol) {
        throw `RuntimeError: symbols are disabled in this configuration`;
    }

    const name = node.name;

    if (!existsOnStack(name, context)) {
        throw `ReferenceError: ${name} is not defined`;
    }

    return getStackObject(name, context);
}
