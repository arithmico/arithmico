import { Context } from '../../../../types/context.types';
import { SyntaxTreeNode } from '../../../../types';
import { CandidateInterval } from './nsolve-types';
import { evaluateWithSymbolValue } from '../evaluate-function-utils';

const NEWTON_MAX_ITERATIONS = 32;
const BISECTION_MAX_ITERATIONS = Math.pow(2, 7);
const EPSILON_Y_COEFFICIENT = Math.pow(2, 7);

function findSolutionsWithNewton(
    node: SyntaxTreeNode,
    symbolName: string,
    candidate: CandidateInterval,
    context: Context,
) {
    let [leftLimit, rightLimit] = candidate;
    let position = leftLimit + (rightLimit - leftLimit) / 2;
    const epsilonY =
        Math.max(
            Math.abs(evaluateWithSymbolValue(node, symbolName, leftLimit, context)),
            Math.abs(evaluateWithSymbolValue(node, symbolName, rightLimit, context)),
        ) *
        Number.EPSILON *
        EPSILON_Y_COEFFICIENT;

    for (let i = 0; i < NEWTON_MAX_ITERATIONS; i++) {
        const y1 = evaluateWithSymbolValue(node, symbolName, position, context);

        if (Math.abs(y1) <= epsilonY) {
            return position;
        }

        const x2 = position + Math.max(Math.abs(y1), Math.abs(position)) * 16 * Number.EPSILON;
        const y2 = evaluateWithSymbolValue(node, symbolName, x2, context);
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

function findSolutionsWithBisection(
    node: SyntaxTreeNode,
    symbolName: string,
    candidate: CandidateInterval,
    context: Context,
) {
    let [leftX, rightX] = candidate;
    let leftY = Math.abs(evaluateWithSymbolValue(node, symbolName, leftX, context));
    let rightY = Math.abs(evaluateWithSymbolValue(node, symbolName, rightX, context));
    const epsilonY = Math.max(leftY, rightY) * Number.EPSILON * EPSILON_Y_COEFFICIENT;

    for (let i = 0; i < BISECTION_MAX_ITERATIONS; i++) {
        const newX = leftX + (rightX - leftX) / 2;
        const newY = Math.abs(evaluateWithSymbolValue(node, symbolName, newX, context));

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

export default function findSolutionsFromCandidateIntervals(
    expression: SyntaxTreeNode,
    variableName: string,
    candidates: CandidateInterval[],
    context: Context,
): number[] {
    const results: number[] = [];

    for (const candidate of candidates) {
        const newtonResult = findSolutionsWithNewton(expression, variableName, candidate, context);
        if (Number.isFinite(newtonResult)) {
            results.push(newtonResult);
            continue;
        }

        const bisectionResult = findSolutionsWithBisection(expression, variableName, candidate, context);
        if (Number.isFinite(bisectionResult)) {
            results.push(bisectionResult);
        }
    }

    return results;
}
