import createFunctionCall from '../../../node-operations/create-node/create-function-call';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { FunctionHeaderItem, FunctionNode, NumberNode } from '../../../types/nodes.types';
import { closeTo } from '../../../utils/math-utils/float-utils';
import { integrateInterval } from '../utils/nintegrate-utils';
import { PluginFragment } from '../../../utils/plugin-builder';

const INTERVALS = 128;

const nintegrateHeader: FunctionHeaderItem[] = [
    { type: 'function', name: 'f', evaluate: true },
    { type: 'number', name: 'start', evaluate: true },
    { type: 'number', name: 'stop', evaluate: true },
];

const nintegrateFragment = new PluginFragment();

__FUNCTIONS.nintegrate &&
    nintegrateFragment.addFunction(
        'nintegrate',
        nintegrateHeader,
        'Calculates the definite integral of the function for the given limits.',
        'Berechnet das bestimmte Integral von f zwischen u und v.',
        ({ getParameter, runtimeError, context }) => {
            const f = <FunctionNode>getParameter('f');
            const start = <NumberNode>getParameter('start');
            const stop = <NumberNode>getParameter('stop');

            if (f.header.length !== 1 || (f.header[0].type !== 'number' && f.header[0].type !== 'any')) {
                throw runtimeError('Invalid function header.');
            }

            const value = createNumberNode(0);
            const expression = createFunctionCall(f, [value]);
            const intervalIntegrals: number[] = [];
            const leftLimit = Math.min(start.value, stop.value);
            const rightLimit = Math.max(start.value, stop.value);
            const intervalWidth = (rightLimit - leftLimit) / INTERVALS;

            for (let i = 0; i < INTERVALS; i++) {
                intervalIntegrals.push(
                    integrateInterval(
                        intervalWidth * i + leftLimit,
                        intervalWidth * (i + 1) + leftLimit,
                        expression,
                        value,
                        context,
                    ),
                );
            }

            const result = intervalIntegrals.reduce((a, b) => a + b);

            if (closeTo(result, 0)) {
                return createNumberNode(0);
            }

            return createNumberNode(result);
        },
    );

export default nintegrateFragment;
