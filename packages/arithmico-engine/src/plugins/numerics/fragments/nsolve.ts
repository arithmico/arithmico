import createMinus from '../../../node-operations/create-node/create-minus';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import createVector from '../../../node-operations/create-node/create-vector';
import { Equals, NumberNode } from '../../../types';
import { FunctionHeaderItem } from '../../../types/nodes.types';
import { getVariableNames } from '../../../utils/symbolic-utils';
import findSolutionCandidateIntervals from '../utils/nsolve/find-solution-candidate-intervals';
import findDirectHits from '../utils/nsolve/find-direct-hits';
import refineResults from '../utils/nsolve/refine-results';
import createPointsFromExpression from '../utils/nsolve/create-points-from-expression';
import { PluginFragment } from '../../../utils/plugin-builder';
import evaluateZeroSolutionsFromCandidateIntervals from '../utils/nsolve/evaluate-zero-solutions-from-candidate-intervals';

const nsolveHeader: FunctionHeaderItem[] = [
    { type: 'equals', name: 'equation', evaluate: false },
    { type: 'number', name: 'start', evaluate: true, optional: true },
    { type: 'number', name: 'stop', evaluate: true, optional: true },
];

const nsolveFragment = new PluginFragment();

__FUNCTIONS.nsolve &&
    nsolveFragment.addFunction(
        'nsolve',
        nsolveHeader,
        'If possible, solve the equation within the limits.',
        'Sucht nach Lösungen für die gegebene Gleichung in den Grenzen start und stop.',
        ({ getParameter, runtimeError, context }) => {
            const leftLimit = (<NumberNode>getParameter('start', createNumberNode(-20))).value;
            const rightLimit = (<NumberNode>getParameter('stop', createNumberNode(20))).value;
            const equation = <Equals>getParameter('equation');
            const expression = createMinus(equation.left, equation.right);
            const variableNames = getVariableNames(expression, context);

            if (variableNames.length !== 1) {
                throw runtimeError(`Invalid number of variables expected 1 got ${variableNames.length}`);
            }

            const points = createPointsFromExpression(expression, variableNames[0], leftLimit, rightLimit, context);
            const directHits = findDirectHits(points);
            const candidateIntervals = findSolutionCandidateIntervals(points);
            const solutions = evaluateZeroSolutionsFromCandidateIntervals(expression, variableNames[0], candidateIntervals, context);

            const results: number[] = [];
            refineResults([...directHits, ...solutions], leftLimit, rightLimit).forEach((solution) => {
                if (!results.includes(solution)) {
                    results.push(solution);
                }
            });

            return createVector(results.sort((a, b) => a - b).map((solution) => createNumberNode(solution)));
        },
    );

export default nsolveFragment;
