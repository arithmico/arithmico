import { Context, SyntaxTreeNode } from '../types';
import normalizeBoolean from './nodes/normalize-boolean';
import normalizeNumber from './nodes/normalize-number';
import normalizeSymbol from './nodes/normalize-symbol';

export type NormalizeResult = [SyntaxTreeNode, boolean];

export function createNormalizeResult(result: SyntaxTreeNode, changed: boolean): NormalizeResult {
    return [result, changed];
}

export default function normalize(node: SyntaxTreeNode, context: Context): NormalizeResult {
    switch (node.type) {
        case 'number':
            return normalizeNumber(node);

        case 'symbol':
            return normalizeSymbol(node, context);

        case 'boolean':
            return normalizeBoolean(node);

        default:
            throw `NormalizationError: unsupported node type "${node.type}"`;
    }
}
