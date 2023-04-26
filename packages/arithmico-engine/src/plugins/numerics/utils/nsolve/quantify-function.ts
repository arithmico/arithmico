import { NumberNode } from '../../../../types/nodes.types';
import { Context, SyntaxTreeNode } from '../../../../types';
import { Point } from './nsolve-types';
import { evaluateSyntaxTreeNodeWithPosition } from '../evaluate-function-utils';

const QUANTIFY_STEPS = 128;

export default function quantifyFunction(
    expression: SyntaxTreeNode,
    leftLimit: number,
    rightLimit: number,
    value: NumberNode,
    context: Context,
): Point[] {
    const results: Point[] = [];

    for (let i = 0; i < QUANTIFY_STEPS + 2; i++) {
        const x = leftLimit + ((rightLimit - leftLimit) / QUANTIFY_STEPS) * (i - 1);
        value.value = x;
        try {
            const result = evaluateSyntaxTreeNodeWithPosition(expression, value, context, x);
            results.push([x, Math.abs(result)]);
            // eslint-disable-next-line no-empty
        } catch (_e) {}
    }

    return results;
}
