import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { fib } from '../utils/fib-utils';
import { PluginFragment } from '../../../utils/plugin-builder';
import { binco } from '../../../utils/math-utils/binco';
import { getLowestFraction } from '../utils/fraction-utils';
import createDivided from '../../../node-operations/create-node/create-divided';
import { euclideanDivision } from '../utils/euclidean-division';
import createPlus from '../../../node-operations/create-node/create-plus';
import { calculateFactorial } from '../../../utils/math-utils/factorial-utils';

const bincoHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'number', evaluate: true },
    { name: 'k', type: 'number', evaluate: true },
];
const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const miscellaneousDiscreteMathFragment = new PluginFragment();

__FUNCTIONS.binco &&
    miscellaneousDiscreteMathFragment.addFunction(
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
    );

__FUNCTIONS.fact &&
    miscellaneousDiscreteMathFragment.addFunction(
        'fact',
        singleNumberHeader,
        'Calculates the factorial of n.',
        'Berechnet die Fakultät von n.',
        ({ getParameter }) => {
            const n = (<NumberNode>getParameter('n')).value;
            return createNumberNode(calculateFactorial(n));
        },
    );

__FUNCTIONS.fraction &&
    miscellaneousDiscreteMathFragment.addFunction(
        'fraction',
        singleNumberHeader,
        'Calculates the nearest fraction',
        'Berechnet den nächsten Bruch zu n.',
        ({ getParameter }) => {
            const value = (<NumberNode>getParameter('n')).value;

            if (value === 0) {
                return createNumberNode(0);
            }

            const [left, right] = getLowestFraction(value);
            return createDivided(createNumberNode(left), createNumberNode(right));
        },
    );

__FUNCTIONS.mfraction &&
    miscellaneousDiscreteMathFragment.addFunction(
        'mfraction',
        singleNumberHeader,
        'Calculates the nearest mixed fraction if possible',
        'Berechnet den nächsten gemischten Bruch falls möglich.',
        ({ getParameter }) => {
            const value = (<NumberNode>getParameter('n')).value;

            if (value === 0) {
                return createNumberNode(0);
            }

            const [numerator, denominator] = getLowestFraction(value);
            const integer = euclideanDivision(numerator, denominator);

            if (integer === 0) {
                return createDivided(createNumberNode(numerator), createNumberNode(denominator));
            }

            if (numerator % denominator === 0) {
                return createNumberNode(integer);
            }

            const correctedNumerator = numerator - integer * denominator;

            return createPlus(
                createNumberNode(integer),
                createDivided(createNumberNode(correctedNumerator), createNumberNode(denominator)),
            );
        },
    );

__FUNCTIONS.fib &&
    miscellaneousDiscreteMathFragment.addFunction(
        'fib',
        singleNumberHeader,
        'calculates the n-th fibonacci number',
        'Berechnet die n-te Fibonacci Zahl.',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;

            if (n % 1 !== 0) {
                throw runtimeError('Only integers are allowed');
            }

            if (n <= 0) {
                throw runtimeError('Number has to be 1 or greater');
            }

            return createNumberNode(fib(n));
        },
    );

export default miscellaneousDiscreteMathFragment;
