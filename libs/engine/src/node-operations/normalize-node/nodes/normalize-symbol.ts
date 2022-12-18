import normalize from '..';
import { Context, SymbolNode } from '../../../types';
import { existsOnStack, getStackObject } from '../../../utils/context-utils';

export default function normalizeSymbol(node: SymbolNode, context: Context) {
    if (existsOnStack(node.name, context)) {
        return normalize(getStackObject(node.name, context), context);
    }

    return node;
}
