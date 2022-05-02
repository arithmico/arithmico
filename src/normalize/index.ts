import { Context, SyntaxTreeNode } from '../types';
import normalizeBoolean from './nodes/normalize-boolean';
import normalizeDivided from './nodes/normalize-divided';
import normalizeMinus from './nodes/normalize-minus';
import normalizeNegate from './nodes/normalize-negate';
import normalizeNumber from './nodes/normalize-number';
import normalizePlus from './nodes/normalize-plus';
import normalizePower from './nodes/normalize-power';
import normalizeSymbol from './nodes/normalize-symbol';
import normalizeTimes from './nodes/normalize-times';

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

        case 'minus':
            return normalizeMinus(node, context);

        case 'negate':
            return normalizeNegate(node, context);

        case 'times':
            return normalizeTimes(node, context);

        case 'divided':
            return normalizeDivided(node, context);

        case 'power':
            return normalizePower(node, context);

        default:
            throw `NormalizationError: unsupported node type "${node.type}"`;
    }
}
