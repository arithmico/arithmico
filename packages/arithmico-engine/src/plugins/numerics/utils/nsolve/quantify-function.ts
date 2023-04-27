import { Context, SyntaxTreeNode } from '../../../../types';
import { Point } from './nsolve-types';
import { evaluateExpressionWithValue } from '../evaluate-function-utils';

const QUANTIFY_STEPS = 128;

export default function quantifyFunction(
    expression: SyntaxTreeNode,
    variableName: string,
    leftLimit: number,
    rightLimit: number,
    context: Context,
): Point[] {
    const results: Point[] = [];

    for (let i = 0; i < QUANTIFY_STEPS + 2; i++) {
        const x = leftLimit + ((rightLimit - leftLimit) / QUANTIFY_STEPS) * (i - 1);
        try {
            const result = evaluateExpressionWithValue(expression, variableName, x, context);
            results.push([x, Math.abs(result)]);
            // eslint-disable-next-line no-empty
        } catch (_e) {}
    }

    return results;
}
