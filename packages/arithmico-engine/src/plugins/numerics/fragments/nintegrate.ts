import createFunctionCall from '../../../node-operations/create-node/create-function-call';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import {FunctionHeaderItem, FunctionNode, NumberNode} from '../../../types/nodes.types';
import {closeTo} from '../../../utils/float-utils';
import {integrateIntervall} from '../utils/nintegrate-utils';
import {PluginFragment} from '../../../utils/plugin-builder';

const INTERVALLS = 128;

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
            const intervallIntegrals: number[] = [];
            const leftLimit = Math.min(start.value, stop.value);
            const rightLimit = Math.max(start.value, stop.value);
            const intervallWidth = (rightLimit - leftLimit) / INTERVALLS;

            for (let i = 0; i < INTERVALLS; i++) {
                intervallIntegrals.push(
                    integrateIntervall(
                        intervallWidth * i + leftLimit,
                        intervallWidth * (i + 1) + leftLimit,
                        expression,
                        value,
                        context,
                    ),
                );
            }

            const result = intervallIntegrals.reduce((a, b) => a + b);

            if (closeTo(result, 0)) {
                return createNumberNode(0);
            }

            return createNumberNode(result);
        },
    );

export default nintegrateFragment;
