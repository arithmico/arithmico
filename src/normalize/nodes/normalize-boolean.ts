import { createNormalizeResult } from '..';
import { BooleanNode } from '../../types';

export default function normalizeBoolean(node: BooleanNode) {
    return createNormalizeResult(node, false);
}
