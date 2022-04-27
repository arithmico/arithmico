import normalize, { createNormalizeResult } from '..';
import evaluate from '../../eval';
import { Context, Plus } from '../../types';
import { containsSymbols } from '../../utils/symbolic-utils';

export default function normalizePlus(node: Plus, context: Context) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [leftNode, leftChanged] = normalize(node.left, context);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rightNode, rightChanged] = normalize(node.right, context);

    if (!containsSymbols(leftNode) && !containsSymbols(rightNode)) {
        return createNormalizeResult(evaluate(node, context), true);
    }

    return createNormalizeResult(node, false);
}
