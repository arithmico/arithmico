import { NumberNode } from '../../../../types/nodes.types';
import evaluate from '../../../../node-operations/evaluate-node';
import { Context, SyntaxTreeNode } from '../../../../types';
import { Point } from './nsolve-types';

const SCAN_COUNT = 1000;

export default function scan(
    expression: SyntaxTreeNode,
    leftLimit: number,
    rightLimit: number,
    value: NumberNode,
    context: Context,
): Point[] {
    const results: Point[] = [];

    for (let i = 0; i < SCAN_COUNT + 3; i++) {
        const x = leftLimit + ((rightLimit - leftLimit) / SCAN_COUNT) * (i - 1);
        value.value = x;
        try {
            const result = evaluate(expression, context);
            if (result.type === 'number') {
                results.push([x, Math.abs(result.value)]);
            }
            // eslint-disable-next-line no-empty
        } catch (_e) {}
    }

    return results;
}
