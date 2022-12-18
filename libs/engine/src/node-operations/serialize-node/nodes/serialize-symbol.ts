import { SymbolNode } from '../../../types';

export default function serializeSymbol(node: SymbolNode) {
    return node.name;
}
