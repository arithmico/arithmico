import createMinus from '../../../node-operations/create-node/create-minus';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import createVector from '../../../node-operations/create-node/create-vector';
import { Context, Equals, NumberNode } from '../../../types';
import { FunctionHeaderItem } from '../../../types/nodes.types';
import { getVariableNames } from '../../../utils/symbolic-utils';
import getSubIntervals from '../utils/nsolve/get-sub-intervals';
import findDirectHits from '../utils/nsolve/find-direct-hits';
import refineResults from '../utils/nsolve/refine-results';
import quantifyFunction from '../utils/nsolve/quantify-function';
import { PluginFragment } from '../../../utils/plugin-builder';
import evaluateZeroPositions from "../utils/nsolve/evaluate-zero-positions";

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

            const value = createNumberNode(leftLimit);
            const localStackFrame = new Map<string, NumberNode>();
            localStackFrame.set(variableNames[0], value);
            const localContext: Context = {
                ...context,
                stack: [...context.stack, localStackFrame],
            };

            const points = quantifyFunction(expression, leftLimit, rightLimit, value, localContext);
            const directHits = findDirectHits(points);
            const candidates = getSubIntervals(points);
            const solutions = evaluateZeroPositions(expression, candidates, value, localContext);

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
