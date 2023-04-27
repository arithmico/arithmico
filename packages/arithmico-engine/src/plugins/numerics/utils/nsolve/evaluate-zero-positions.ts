import { Context } from '../../../../types/context.types';
import { NumberNode } from '../../../../types/nodes.types';
import { SyntaxTreeNode } from '../../../../types';
import { CandidateIntervall } from './nsolve-types';
import { evaluateExpressionWithValue } from '../evaluate-function-utils';

const NEWTON_MAX_ITERATIONS = 32;
const BISECTION_MAX_ITERATIONS = Math.pow(2, 7);
const EPSILON_Y_COEFFICIENT = Math.pow(2, 7);

function checkCandidateWithNewton(
    expression: SyntaxTreeNode,
    variableName:string,
    candidate: CandidateIntervall,
    context: Context,
) {
    let [leftLimit, rightLimit] = candidate;
    let position = leftLimit + (rightLimit - leftLimit) / 2;
    const epsilonY =
        Math.max(
            Math.abs(evaluateExpressionWithValue(expression, variableName, leftLimit, context)),
            Math.abs(evaluateExpressionWithValue(expression, variableName, rightLimit, context)),
        ) *
        Number.EPSILON *
        EPSILON_Y_COEFFICIENT;

    for (let i = 0; i < NEWTON_MAX_ITERATIONS; i++) {
        const y1 = evaluateExpressionWithValue(expression, variableName, position, context);

        if (Math.abs(y1) <= epsilonY) {
            return position;
        }

        const x2 = position + Math.max(Math.abs(y1), Math.abs(position)) * 16 * Number.EPSILON;
        const y2 = evaluateExpressionWithValue(expression, variableName, x2, context);
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
    variableName: string,
    candidate: CandidateIntervall,
    context: Context,
) {
    let [leftX, rightX] = candidate;
    let leftY = Math.abs(evaluateExpressionWithValue(expression, variableName, leftX, context));
    let rightY = Math.abs(evaluateExpressionWithValue(expression, variableName, rightX, context));
    const epsilonY = Math.max(leftY, rightY) * Number.EPSILON * EPSILON_Y_COEFFICIENT;

    for (let i = 0; i < BISECTION_MAX_ITERATIONS; i++) {
        const newX = leftX + (rightX - leftX) / 2;
        const newY = Math.abs(evaluateExpressionWithValue(expression, variableName, newX, context));

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

export default function evaluateZeroPositions(
    expression: SyntaxTreeNode,
    variableName: string,
    candidates: CandidateIntervall[],
    context: Context,
): number[] {
    const results: number[] = [];

    for (const candidate of candidates) {
        const newtonResult = checkCandidateWithNewton(expression, variableName, candidate, context);
        if (Number.isFinite(newtonResult)) {
            results.push(newtonResult);
            continue;
        }

        const bisectionResult = checkCandidateWithBisection(expression, variableName, candidate, context);
        if (Number.isFinite(bisectionResult)) {
            results.push(bisectionResult);
        }
    }

    return results;
}
