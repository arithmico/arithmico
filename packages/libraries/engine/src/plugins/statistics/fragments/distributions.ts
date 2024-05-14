import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { calculateCNormal, calculateNormal } from '../utils/normal';
import { calculateBinom, calculateCBinom, calculateQuantileOfBinomialCDF } from '../utils/binomial';
import { PluginFragment } from '../../../utils/plugin-builder';
import { calculateQuantileOfStandardNormalCDF } from '../utils/quantile-standard-normal';
import { isInClosedInterval, isInOpenInterval } from '../utils/check-intervals-util';

const normalHeader: FunctionHeaderItem[] = [
    {
        name: 'x',
        type: 'number',
        evaluate: true,
    },
    { name: 'expectation', type: 'number', evaluate: true, optional: true },
    { name: 'sd', type: 'number', evaluate: true, optional: true },
];

const qnormalHeader: FunctionHeaderItem[] = [
    {
        name: 'p',
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

const qbinomHeader: FunctionHeaderItem[] = [
    {
        name: 'p_q',
        type: 'number',
        evaluate: true,
    },
    { name: 'n', type: 'number', evaluate: true },
    { name: 'p', type: 'number', evaluate: true },
];

const distributionFragment = new PluginFragment();

__FUNCTIONS.normal &&
    distributionFragment.addFunction(
        'normal',
        normalHeader,
        'Normal distribution. The default values are: for expectation 0 and for sd 1 (standard normal distribution).',
        'Normalverteilung. Die Standardwerte sind: für expectation 0 und für sd 1 (Standardnormalverteilung).',
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
        'Cumulative normal distribution. The default values are: for expectation 0 and for sd 1 (standard cumulative normal distribution).',
        'Kumulierte Normalverteilung. Die Standardwerte sind: für expectation 0 und für sd 1 (kumulierte Standardnormalverteilung).',
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

__FUNCTIONS.qnormal &&
    distributionFragment.addFunction(
        'qnormal',
        qnormalHeader,
        'Quantile function of the cumulative normal distribution. Calculate the corresponding random variable for the given quantile p. The default values are: for expectation 0 and for sd 1 (cumulative standard normal distribution).',
        'Quantilsfunktion der kumulierten Normalverteilung. Berechnet zu gegebenen Quantil p die entsprechende Zufallsvariable. Die Standardwerte sind: für expectation 0 und für sd 1 (kumulierte Standardnormalverteilung).',
        ({ getParameter, runtimeError }) => {
            const p = (<NumberNode>getParameter('p')).value;
            const expectation = (<NumberNode>getParameter('expectation', createNumberNode(0))).value;
            const sd = (<NumberNode>getParameter('sd', createNumberNode(1))).value;

            if (!isInOpenInterval(p, 0, 1)) {
                throw runtimeError('p is not between 0 and 1');
            }

            if (sd < 0) {
                throw runtimeError('sd must be greater than or equal to 0');
            }

            return createNumberNode(expectation + sd * calculateQuantileOfStandardNormalCDF(p));
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

            if (!isInClosedInterval(p, 0, 1)) {
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

            if (!isInClosedInterval(p, 0, 1)) {
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

__FUNCTIONS.qbinom &&
    distributionFragment.addFunction(
        'qbinom',
        qbinomHeader,
        'Quantile function of the cumulative binomial distribution. Calculate the corresponding k for the given quantile p_q.',
        'Quantilsfunktion der kumulierten Binomialverteilung. Berechnet zum gegebenen Quantil p_q das entsprechende k.',
        ({ getParameter, runtimeError }) => {
            const p_q = (<NumberNode>getParameter('p_q')).value;
            const n = (<NumberNode>getParameter('n')).value;
            const p_success = (<NumberNode>getParameter('p')).value;

            if (!isInClosedInterval(p_q, 0, 1)) {
                throw runtimeError('p_q is not between 0 and 1');
            }
            if (n < 0) {
                throw runtimeError('n must be greater than or equal to 0');
            }
            if (n % 1 !== 0) {
                throw runtimeError('n has to be an integer');
            }
            if (!isInClosedInterval(p_success, 0, 1)) {
                throw runtimeError('p_q is not between 0 and 1');
            }

            return createNumberNode(calculateQuantileOfBinomialCDF(p_q, n, p_success));
        },
    );

export default distributionFragment;
