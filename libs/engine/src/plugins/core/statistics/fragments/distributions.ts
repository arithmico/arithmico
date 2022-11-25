import { FunctionHeaderItem, NumberNode } from '../../../../types/SyntaxTreeNodes';
import createNumberNode from '../../../../create/create-number-node';
import { calculateErf } from '../utils/erf';
import { calculateFact } from '../utils/fact';
import { calculateCNormal, calculateNormal } from '../utils/normal';
import { calculateBinom, calculateCBinom } from '../utils/binomial';
import { binco } from '../../../../utils/binco';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];
const bincoHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'number', evaluate: true },
    { name: 'k', type: 'number', evaluate: true },
];
const binomHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'number', evaluate: true },
    { name: 'p', type: 'number', evaluate: true },
    { name: 'k', type: 'number', evaluate: true },
];

const distributionFragment = new PluginFragment()
    .addFunction(
        'fact',
        singleNumberHeader,
        'Calculates the factorial of x.',
        'Berechnet die Fakultät von x.',
        ({ getParameter }) => {
            const x = (<NumberNode>getParameter('x')).value;
            return createNumberNode(calculateFact(x));
        },
    )
    .addFunction(
        'normal',
        singleNumberHeader,
        'standard normal distribution',
        'Standartnormalverteilung',
        ({ getParameter }) => {
            const x = (<NumberNode>getParameter('x')).value;
            return createNumberNode(calculateNormal(x));
        },
    )
    .addFunction(
        'cnormal',
        singleNumberHeader,
        'Cumulative standard normal distribution',
        'Kumulative Standartnormalverteilung',
        ({ getParameter }) => {
            const x = (<NumberNode>getParameter('x')).value;
            return createNumberNode(calculateCNormal(x));
        },
    )
    .addFunction(
        'binco',
        bincoHeader,
        'Computes n choose k (binomial coefficient)',
        'Berechnet n über k (Binomialkoeffizient)',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;
            const k = (<NumberNode>getParameter('k')).value;

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

            return createNumberNode(binco(n, k));
        },
    )
    .addFunction(
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
    )
    .addFunction(
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
