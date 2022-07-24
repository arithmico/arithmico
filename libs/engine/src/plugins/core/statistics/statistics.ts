import createNumberNode from '../../../create/create-number-node';
import { FunctionHeaderItem, NumberNode, Vector } from '../../../types/SyntaxTreeNodes';
import { binco } from '../../../utils/binco';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { calculateAvg } from './utils/avg';
import { calculateBinom, calculateCBinom, checkNK } from './utils/binomial';
import { calculateErf } from './utils/erf';
import { calculateFact } from './utils/fact';
import { calculateCNormal, calculateNormal } from './utils/normal';
import { calculateSd } from './utils/sd';
import { calculateVar } from './utils/var';
import { calculateQuantile } from './utils/quantile';
import { isEveryElementNumber } from '../../../utils/tensor-utils';
import { calculateCovariance } from './utils/covariance';
import { calculateCorrelationCoefficient } from './utils/corr';

const statisticsPlugin = createPlugin('core/statistics');

addPluginDescription(
    statisticsPlugin,
    'adds erf, normal, cnormal, binco, binom, cbinom and another statistical functions',
);
addPluginAuthor(statisticsPlugin, 'core');

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];
const numberSeriesHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true, repeat: true }];

const bincoHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'number', evaluate: true },
    { name: 'k', type: 'number', evaluate: true },
];

const binomHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'number', evaluate: true },
    { name: 'p', type: 'number', evaluate: true },
    { name: 'k', type: 'number', evaluate: true },
];

const quantileHeader: FunctionHeaderItem[] = [
    { name: 'p', type: 'number', evaluate: true },
    { name: 'xs', type: 'vector', evaluate: true },
];

const doubleVectorHeader: FunctionHeaderItem[] = [
    { name: 'xs', type: 'vector', evaluate: true },
    { name: 'ys', type: 'vector', evaluate: true },
];

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'erf',
        singleNumberHeader,
        'Gaussian error function',
        'Gaußsche Fehlerfunktion',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('erf', parameters, singleNumberHeader, context);
            const x = (<NumberNode>parameterStackFrame['x']).value;
            return createNumberNode(calculateErf(x));
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'fact',
        singleNumberHeader,
        'Calculates the factorial of x',
        'Berechnet die Fakultät von x.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('fact', parameters, singleNumberHeader, context);
            const x = (<NumberNode>parameterStackFrame['x']).value;
            return createNumberNode(calculateFact(x));
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'normal',
        singleNumberHeader,
        'normal distribution',
        'Normalverteilung',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('normal', parameters, singleNumberHeader, context);
            const x = (<NumberNode>parameterStackFrame['x']).value;
            return createNumberNode(calculateNormal(x));
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'cnormal',
        singleNumberHeader,
        'Cumulative normal distribution',
        'Kumulative Normalverteilung',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('cnormal', parameters, singleNumberHeader, context);
            const x = (<NumberNode>parameterStackFrame['x']).value;
            return createNumberNode(calculateCNormal(x));
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'binco',
        bincoHeader,
        'Computes n over k (binomial coefficient)',
        'Berechnet n über k (Binomialkoeffizient)',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('binco', parameters, bincoHeader, context);
            const n = (<NumberNode>parameterStackFrame['n']).value;
            const k = (<NumberNode>parameterStackFrame['k']).value;
            checkNK('binco', n, k);
            return createNumberNode(binco(n, k));
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction('binom', binomHeader, 'Binomial distribution', 'Binomialverteilung', (parameters, context) => {
        const parameterStackFrame = mapParametersToStackFrame('binom', parameters, binomHeader, context);
        const n = (<NumberNode>parameterStackFrame['n']).value;
        const p = (<NumberNode>parameterStackFrame['p']).value;
        const k = (<NumberNode>parameterStackFrame['k']).value;
        return createNumberNode(calculateBinom(n, p, k));
    }),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'cbinom',
        binomHeader,

        'Cumulative binomial distribution',
        'Kumulative Binomialverteilung',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('cbinom', parameters, binomHeader, context);
            const n = (<NumberNode>parameterStackFrame['n']).value;
            const p = (<NumberNode>parameterStackFrame['p']).value;
            const k = (<NumberNode>parameterStackFrame['k']).value;
            return createNumberNode(calculateCBinom(n, p, k));
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'avg',
        numberSeriesHeader,
        'Calculates the arithmetic mean',
        'Berechnet das arithmetische Mittel',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('avg', parameters, numberSeriesHeader, context);
            const xs = Object.values(parameterStackFrame).map((x) => (<NumberNode>x).value);
            return createNumberNode(calculateAvg(xs));
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'var',
        numberSeriesHeader,
        'Calculates the variance',
        'Berechnet die Varianz',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('var', parameters, numberSeriesHeader, context);
            const xs = Object.values(parameterStackFrame).map((x) => (<NumberNode>x).value);
            return createNumberNode(calculateVar(xs));
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'sd',
        numberSeriesHeader,
        'Calculates the standard deviation',
        'Berechnet die Standardabweichung',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('sd', parameters, numberSeriesHeader, context);
            const xs = Object.values(parameterStackFrame).map((x) => (<NumberNode>x).value);
            return createNumberNode(calculateSd(xs));
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'median',
        numberSeriesHeader,
        'Calculates the median.',
        'Berechnet den Median.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('median', parameters, numberSeriesHeader, context);
            const xs = Object.values(parameterStackFrame).map((x) => (<NumberNode>x).value);
            return createNumberNode(calculateQuantile(0.5, xs));
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'quantile',
        quantileHeader,
        'Calculates the p-quantile, i.e. p (between 0 and 1) divides the quantity into a part p less than or equal to and another part 1-p is greater than or equal to the quantile.',
        'Berechnet das p-Quantil, d. h. p (zwischen 0 und 1) teilt die Menge auf in einen Teil p kleiner oder gleich und einen anderen Teil 1-p größer oder gleich dem Quantil ist.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('quantile', parameters, quantileHeader, context);
            const p = (<NumberNode>parameterStackFrame['p']).value;
            const xs = <Vector>parameterStackFrame['xs'];

            if (!isEveryElementNumber(xs)) {
                throw 'RuntimeError: quantile: all elements of xs must be numbers.';
            }

            if (p < 0 || p > 1) {
                throw 'RuntimeError: quantile: p has to be between 0 and 1.';
            }

            return createNumberNode(
                calculateQuantile(
                    p,
                    xs.values.map((x) => (<NumberNode>x).value),
                ),
            );
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'cov',
        doubleVectorHeader,
        'Calculates the covariance of two vectors of the same size.',
        'Berechnet die Kovarianz zweier gleichgroßer Vektoren',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('cov', parameters, doubleVectorHeader, context);
            const xs = <Vector>parameterStackFrame['xs'];
            const ys = <Vector>parameterStackFrame['ys'];

            if (!isEveryElementNumber(xs)) {
                throw 'RuntimeError: cov: All elements of xs must be numbers.';
            }

            if (!isEveryElementNumber(ys)) {
                throw 'RuntimeError: cov: All elements of ys must be numbers.';
            }

            const xsValue = xs.values;
            const ysValue = ys.values;

            if (xsValue.length !== ysValue.length) {
                throw 'RuntimeError: cov: Both vectors must have the same length.';
            }

            return createNumberNode(
                calculateCovariance(
                    xsValue.map((v) => (<NumberNode>v).value),
                    ysValue.map((v) => (<NumberNode>v).value),
                ),
            );
        },
    ),
);

addPluginFunction(
    statisticsPlugin,
    createPluginFunction(
        'corr',
        doubleVectorHeader,
        'Calculates the Pearson correlation coefficient of two vectors of the same size.',
        'Berechnet den Korrelationskoeffizienten (Pearson) zweier gleichgroßer Vektoren',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('corr', parameters, doubleVectorHeader, context);
            const xs = <Vector>parameterStackFrame['xs'];
            const ys = <Vector>parameterStackFrame['ys'];

            if (!isEveryElementNumber(xs)) {
                throw 'RuntimeError: corr: All elements of xs must be numbers.';
            }

            if (!isEveryElementNumber(ys)) {
                throw 'RuntimeError: corr: All elements of ys must be numbers.';
            }

            const xsValue = xs.values.map((v) => (<NumberNode>v).value);
            const ysValue = ys.values.map((v) => (<NumberNode>v).value);

            if (xsValue.length !== ysValue.length) {
                throw 'RuntimeError: corr: Both vectors must have the same length.';
            }

            return createNumberNode(calculateCorrelationCoefficient(xsValue, ysValue));
        },
    ),
);

export default statisticsPlugin;
