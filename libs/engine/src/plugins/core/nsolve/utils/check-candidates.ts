import { Context } from '../../../../types/Context';
import { NumberNode } from '../../../../types/SyntaxTreeNodes';
import { SyntaxTreeNode } from '../../../../types';
import { CandidateIntervall } from '../types';
import evaluate from '../../../../eval';

const NEWTON_MAX_ITERATIONS = 32;
const BISECTION_MAX_ITERATIONS = Math.pow(2, 7);
const EPSILON_Y_COEFFICIENT = Math.pow(2, 7);

function evaluatePosition(expression: SyntaxTreeNode, value: NumberNode, context: Context, position: number) {
    value.value = position;
    const result = evaluate(expression, context);

    if (result.type === 'number') return result.value;

    throw 'invalid result';
}

function checkCandidateWithNewton(
    expression: SyntaxTreeNode,
    candidate: CandidateIntervall,
    value: NumberNode,
    context: Context,
) {
    let [leftLimit, rightLimit] = candidate;
    let position = leftLimit + (rightLimit - leftLimit) / 2;
    const epsilonY =
        Math.max(
            Math.abs(evaluatePosition(expression, value, context, leftLimit)),
            Math.abs(evaluatePosition(expression, value, context, rightLimit)),
        ) *
        Number.EPSILON *
        EPSILON_Y_COEFFICIENT;

    for (let i = 0; i < NEWTON_MAX_ITERATIONS; i++) {
        const y1 = evaluatePosition(expression, value, context, position);

        if (Math.abs(y1) <= epsilonY) {
            return position;
        }

        const x2 = position + Math.max(Math.abs(y1), Math.abs(position)) * 16 * Number.EPSILON;
        const y2 = evaluatePosition(expression, value, context, x2);
        const derivative = (y2 - y1) / (x2 - position);
        const nextPosition = position - y1 / derivative;

        if (
            !Number.isFinite(derivative) ||
            nextPosition < leftLimit ||
            nextPosition > rightLimit ||
            nextPosition === leftLimit ||
            nextPosition === rightLimit
        ) {
            return;
        }

        if (nextPosition >= leftLimit && nextPosition <= position) {
            rightLimit = position;
            position = nextPosition;
        } else if (nextPosition > position && nextPosition <= rightLimit) {
            leftLimit = position;
            position = nextPosition;
        }
    }
}

function checkCandidateWithBisection(
    expression: SyntaxTreeNode,
    candidate: CandidateIntervall,
    value: NumberNode,
    context: Context,
) {
    let [leftX, rightX] = candidate;
    let leftY = Math.abs(evaluatePosition(expression, value, context, leftX));
    let rightY = Math.abs(evaluatePosition(expression, value, context, rightX));
    const epsilonY = Math.max(leftY, rightY) * Number.EPSILON * EPSILON_Y_COEFFICIENT;

    for (let i = 0; i < BISECTION_MAX_ITERATIONS; i++) {
        const newX = leftX + (rightX - leftX) / 2;
        const newY = Math.abs(evaluatePosition(expression, value, context, newX));

        if (newY <= epsilonY) {
            return newX;
        }

        if (newY > leftY && newY > rightY) {
            return;
        }

        if (leftY < rightY) {
            rightX = newX;
            rightY = newY;
        } else {
            leftX = newX;
            leftY = newY;
        }
    }
}

export default function checkCandidates(
    expression: SyntaxTreeNode,
    candidates: CandidateIntervall[],
    value: NumberNode,
    context: Context,
): number[] {
    const results: number[] = [];

    for (const candidate of candidates) {
        const newtonResult = checkCandidateWithNewton(expression, candidate, value, context);
        if (Number.isFinite(newtonResult)) {
            results.push(newtonResult);
            continue;
        }

        const bisectionResult = checkCandidateWithBisection(expression, candidate, value, context);
        if (Number.isFinite(bisectionResult)) {
            results.push(bisectionResult);
        }
    }

    return results;
}
