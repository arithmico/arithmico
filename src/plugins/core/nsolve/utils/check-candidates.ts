import { Context } from './../../../../types/Context';
import { NumberNode } from './../../../../types/SyntaxTreeNodes';
import { SyntaxTreeNode } from '../../../../types';
import { CandidateIntervall } from './../types';
import evaluate from '../../../../eval';

const MAX_ITERATIONS = 32;

function evaluatePosition(expression: SyntaxTreeNode, value: NumberNode, context: Context, position: number) {
    value.value = position;
    const result = evaluate(expression, context);

    if (result.type === 'number') return result.value;

    throw 'invalid result';
}

export default function checkCandidates(
    expression: SyntaxTreeNode,
    candidates: CandidateIntervall[],
    value: NumberNode,
    context: Context,
): number[] {
    const results: number[] = [];

    for (const candidate of candidates) {
        let [leftLimit, rightLimit] = candidate;
        let currentPosition = (leftLimit + rightLimit) / 2;
        const maxY = Math.max(
            Math.abs(evaluatePosition(expression, value, context, leftLimit)),
            Math.abs(evaluatePosition(expression, value, context, rightLimit)),
        );

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            const y1 = evaluatePosition(expression, value, context, currentPosition);

            if (Math.abs(y1) <= maxY * Number.EPSILON) {
                results.push(currentPosition);
                break;
            }

            const x2 = currentPosition + Math.max(Math.abs(y1), Math.abs(currentPosition)) * 16 * Number.EPSILON;
            const y2 = evaluatePosition(expression, value, context, x2);
            const derivative = (y2 - y1) / (x2 - currentPosition);
            const nextPosition = currentPosition - y1 / derivative;

            if (!Number.isFinite(derivative)) {
                break;
            }

            if (nextPosition < leftLimit || nextPosition > rightLimit) {
                console.log('out of bounds');
                break;
            }

            if (nextPosition >= leftLimit && nextPosition <= currentPosition) {
                rightLimit = currentPosition;
                currentPosition = nextPosition;
            } else if (nextPosition > currentPosition && nextPosition <= rightLimit) {
                leftLimit = currentPosition;
                currentPosition = nextPosition;
            }
        }
    }

    return results;
}
