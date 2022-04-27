import { createNormalizeResult } from '..';
import { Context, SymbolNode } from '../../types';
import { existsOnStack, getStackObject } from '../../utils/context-utils';

export default function normalizeSymbol(node: SymbolNode, context: Context) {
    if (existsOnStack(node.name, context)) {
        return createNormalizeResult(getStackObject(node.name, context), true);
    }

    return createNormalizeResult(node, false);
}
