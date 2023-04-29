import { Context, SyntaxTreeNode } from '../../../../types';
import { Point } from './nsolve-types';
import { evaluateExpressionWithValue } from '../evaluate-function-utils';

const SCAN_RESOLUTION = 128;

export default function createPointsFromExpression(
    expression: SyntaxTreeNode,
    variableName: string,
    leftLimit: number,
    rightLimit: number,
    context: Context,
): Point[] {
    const results: Point[] = [];

    for (let i = 0; i < SCAN_RESOLUTION + 2; i++) {
        const x = leftLimit + ((rightLimit - leftLimit) / SCAN_RESOLUTION) * (i - 1);
        try {
            const result = evaluateExpressionWithValue(expression, variableName, x, context);
            results.push([x, Math.abs(result)]);
            // eslint-disable-next-line no-empty
        } catch (_e) {}
    }

    return results;
}
