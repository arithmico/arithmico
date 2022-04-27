import { createNormalizeResult, NormalizeResult } from './../index';
import createNegate from '../../create/Negate';
import createNumberNode from '../../create/NumberNode';
import { NumberNode } from '../../types';

export default function normalizeNumber(node: NumberNode): NormalizeResult {
    if (node.value < 0) {
        createNormalizeResult(createNegate(createNumberNode(Math.abs(node.value))), true);
    }

    return createNormalizeResult(node, false);
}
