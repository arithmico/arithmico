import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { calculateCNormal, calculateNormal } from '../utils/normal';
import { calculateBinom, calculateCBinom } from '../utils/binomial';
import { PluginFragment } from '../../../utils/plugin-builder';

const normalHeader: FunctionHeaderItem[] = [
    {
        name: 'x',
        type: 'number',
        evaluate: true,
    },
    { name: 'expectation', type: 'number', evaluate: true, optional: true },
    { name: 'sd', type: 'number', evaluate: true, optional: true },
];
const binomHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'number', evaluate: true },
    { name: 'p', type: 'number', evaluate: true },
    { name: 'k', type: 'number', evaluate: true },
];

const distributionFragment = new PluginFragment();

__FUNCTIONS.normal &&
    distributionFragment.addFunction(
        'normal',
        normalHeader,
        'Normal distribution. The default values are: for expactation 0 and for sd 1 (standard normal distribution).)',
        'Normalverteilung. Die Standardwerte sind: für expactation 0 und für sd 1 (Standardnormalverteilung).',
        ({ getParameter, runtimeError }) => {
            const x = (<NumberNode>getParameter('x')).value;
            const expectation = (<NumberNode>getParameter('expectation', createNumberNode(0))).value;
            const sd = (<NumberNode>getParameter('sd', createNumberNode(1))).value;

            if (sd < 0) {
                throw runtimeError('sd must be greater than or equal to 0');
            }

            return createNumberNode(calculateNormal(x, expectation, sd));
        },
    );

__FUNCTIONS.cnormal &&
    distributionFragment.addFunction(
        'cnormal',
        normalHeader,
        'Cumulative normal distribution. The default values are: for expactation 0 and for sd 1 (standard cumulative normal distribution).',
        'Kumulierte Normalverteilung. Die Standardwerte sind: für expactation 0 und für sd 1 (kumulierte Standardnormalverteilung).',
        ({ getParameter, runtimeError }) => {
            const x = (<NumberNode>getParameter('x')).value;
            const expectation = (<NumberNode>getParameter('expectation', createNumberNode(0))).value;
            const sd = (<NumberNode>getParameter('sd', createNumberNode(1))).value;

            if (sd < 0) {
                throw runtimeError('sd must be greater than or equal to 0');
            }

            return createNumberNode(calculateCNormal(x, expectation, sd));
        },
    );

__FUNCTIONS.binom &&
    distributionFragment.addFunction(
        'binom',
        binomHeader,
        'Binomial distribution',
        'Binomialverteilung',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;
            const p = (<NumberNode>getParameter('p')).value;
            const k = (<NumberNode>getParameter('k')).value;

            if (p < 0 || p > 1) {
                throw runtimeError('p is not between 0 and 1');
            }
            if (n < 0) {
                throw runtimeError('n must be greater than or equal to 0');
            }
            if (k < 0) {
                throw runtimeError('k must be greater than or equal to 0');
            }
            if (n % 1 !== 0) {
                throw runtimeError('n has to be an integer');
            }
            if (k % 1 !== 0) {
                throw runtimeError('k has to be an integer.');
            }
            if (n < k) {
                throw runtimeError('n must be greater than or equal to n');
            }

            return createNumberNode(calculateBinom(n, p, k));
        },
    );

__FUNCTIONS.cbinom &&
    distributionFragment.addFunction(
        'cbinom',
        binomHeader,
        'Cumulative binomial distribution',
        'Kumulative Binomialverteilung',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;
            const p = (<NumberNode>getParameter('p')).value;
            const k = (<NumberNode>getParameter('k')).value;

            if (p < 0 || p > 1) {
                throw runtimeError('p is not between 0 and 1');
            }
            if (n < 0) {
                throw runtimeError('n must be greater than or equal to 0');
            }
            if (k < 0) {
                throw runtimeError('k must be greater than or equal to 0');
            }
            if (n % 1 !== 0) {
                throw runtimeError('n has to be an integer');
            }
            if (k % 1 !== 0) {
                throw runtimeError('k has to be an integer.');
            }
            if (n < k) {
                throw runtimeError('n must be greater than or equal to n');
            }

            return createNumberNode(calculateCBinom(n, p, k));
        },
    );

export default distributionFragment;
