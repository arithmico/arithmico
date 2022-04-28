import { Context, SyntaxTreeNode } from '../types';
import normalizeBoolean from './nodes/normalize-boolean';
import normalizeNumber from './nodes/normalize-number';
import normalizePlus from './nodes/normalize-plus';
import normalizeSymbol from './nodes/normalize-symbol';

export default function normalize(node: SyntaxTreeNode, context: Context): SyntaxTreeNode {
    switch (node.type) {
        case 'number':
            return normalizeNumber(node);

        case 'symbol':
            return normalizeSymbol(node, context);

        case 'boolean':
            return normalizeBoolean(node);

        case 'plus':
            return normalizePlus(node, context);

        default:
            throw `NormalizationError: unsupported node type "${node.type}"`;
    }
}
