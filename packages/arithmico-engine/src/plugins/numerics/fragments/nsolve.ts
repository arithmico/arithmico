import createMinus from '../../../node-operations/create-node/create-minus';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import createVector from '../../../node-operations/create-node/create-vector';
import { Equals, NumberNode } from '../../../types';
import { FunctionHeaderItem } from '../../../types/nodes.types';
import { getVariableNames } from '../../../utils/symbolic-utils';
import findCandidateIntervals from '../utils/nsolve/find-candidate-intervals';
import findDirectHits from '../utils/nsolve/find-direct-hits';
import refineResults from '../utils/nsolve/refine-results';
import scan from '../utils/nsolve/scan';
import { PluginFragment } from '../../../utils/plugin-builder';
import findSolutionsFromCandidateIntervals from '../utils/nsolve/find-solutions-from-candidate-intervals';

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

            const points = scan(expression, variableNames[0], leftLimit, rightLimit, context);
            const directHits = findDirectHits(points);
            const candidateIntervals = findCandidateIntervals(points);
            const solutions = findSolutionsFromCandidateIntervals(
                expression,
                variableNames[0],
                candidateIntervals,
                context,
            );

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
