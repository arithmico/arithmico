import { FunctionHeaderItem, NumberNode, SyntaxTreeNode, Vector } from '../../../../types/nodes.types';
import createNumberNode from '../../../../node-operations/create-node/create-number-node';
import { calculateAvg } from '../utils/avg';
import { calculateBiasedSampleVariance, calculateUnbiasedSampleVariance } from '../utils/var';
import { calculateBiasedStandartDeviation, calculateUnbiasedStandardDeviation } from '../utils/sd';
import { calculateQuantile } from '../utils/quantile';
import { isEveryElementNumber } from '../../../../utils/tensor-utils';
import { calculateCovariance } from '../utils/covariance';
import { calculateCorrelationCoefficient } from '../utils/corr';
import { PluginFragment } from '../../../../utils/plugin-builder';

const numberSeriesHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true, repeat: true }];
const quantileHeader: FunctionHeaderItem[] = [
    { name: 'p', type: 'number', evaluate: true },
    { name: 'xs', type: 'vector', evaluate: true },
];
const doubleVectorHeader: FunctionHeaderItem[] = [
    { name: 'xs', type: 'vector', evaluate: true },
    { name: 'ys', type: 'vector', evaluate: true },
];

const samplingStatisticsFragment = new PluginFragment()
    .addFunction(
        'avg',
        numberSeriesHeader,
        'Calculates the arithmetic mean',
        'Berechnet das arithmetische Mittel',
        ({ getParameter }) => {
            const xs = (<SyntaxTreeNode[]>getParameter('x')).map((x) => (<NumberNode>x).value);
            return createNumberNode(calculateAvg(xs));
        },
    )
    .addFunction(
        'var',
        numberSeriesHeader,
        'Calculates the biased sample variance divided by n.',
        'Berechnet die Stichprobenvarianz (geteilt durch n)',
        ({ getParameter }) => {
            const xs = (<SyntaxTreeNode[]>getParameter('x')).map((x) => (<NumberNode>x).value);
            return createNumberNode(calculateBiasedSampleVariance(xs));
        },
    )
    .addFunction(
        'unbiased:var',
        numberSeriesHeader,
        'Calculates the unbiased sample variance divided by n - 1.',
        'Berechnet die normierte Stichprobenvarianz (geteilt durch n - 1)',
        ({ getParameter }) => {
            const xs = (<SyntaxTreeNode[]>getParameter('x')).map((x) => (<NumberNode>x).value);
            return createNumberNode(calculateUnbiasedSampleVariance(xs));
        },
    )
    .addFunction(
        'sd',
        numberSeriesHeader,
        'Calculates the standard deviation based on biased sample variance',
        'Berechnet die Standardabweichung basierend auf der Stichprobenvarianz.',
        ({ getParameter }) => {
            const xs = (<SyntaxTreeNode[]>getParameter('x')).map((x) => (<NumberNode>x).value);
            return createNumberNode(calculateBiasedStandartDeviation(xs));
        },
    )
    .addFunction(
        'unbiased:sd',
        numberSeriesHeader,
        'Calculates the standard deviation based on unbiased sample variance',
        'Berechnet die Standardabweichung basierend auf der normierten Stichprobenvarianz.',
        ({ getParameter }) => {
            const xs = (<SyntaxTreeNode[]>getParameter('x')).map((x) => (<NumberNode>x).value);
            return createNumberNode(calculateUnbiasedStandardDeviation(xs));
        },
    )
    .addFunction(
        'median',
        numberSeriesHeader,
        'Calculates the median.',
        'Berechnet den Median.',
        ({ getParameter, runtimeError }) => {
            const xs = (<SyntaxTreeNode[]>getParameter('x')).map((x) => (<NumberNode>x).value);

            if (xs.length < 2) {
                throw runtimeError('At least two parameters are required.');
            }

            return createNumberNode(calculateQuantile(0.5, xs));
        },
    )
    .addFunction(
        'quantile',
        quantileHeader,
        'Calculates the p-quantile, i.e. p (between 0 and 1) divides the quantity into a part p less than or equal to and another part 1-p is greater than or equal to the quantile.',
        'Berechnet das p-Quantil, d. h. p (zwischen 0 und 1) teilt die Menge auf in einen Teil p kleiner oder gleich und einen anderen Teil 1-p größer oder gleich dem Quantil ist.',
        ({ getParameter, runtimeError }) => {
            const p = (<NumberNode>getParameter('p')).value;
            const xs = <Vector>getParameter('xs');

            if (!isEveryElementNumber(xs)) {
                throw runtimeError('All elements of xs must be numbers.');
            }

            if (p < 0 || p > 1) {
                throw runtimeError('Value p has to be between 0 and 1.');
            }

            if (xs.values.length < 2) {
                throw runtimeError('At least two parameters are required.');
            }

            return createNumberNode(
                calculateQuantile(
                    p,
                    xs.values.map((x) => (<NumberNode>x).value),
                ),
            );
        },
    )
    .addFunction(
        'cov',
        doubleVectorHeader,
        'Calculates the covariance of two vectors of the same size.',
        'Berechnet die Kovarianz zweier gleichgroßer Vektoren',
        ({ getParameter, runtimeError }) => {
            const xs = <Vector>getParameter('xs');
            const ys = <Vector>getParameter('ys');

            if (!isEveryElementNumber(xs)) {
                throw runtimeError('All elements of xs must be numbers.');
            }

            if (!isEveryElementNumber(ys)) {
                throw runtimeError('All elements of ys must be numbers.');
            }

            const xValues = xs.values.map((v) => (<NumberNode>v).value);
            const yValues = ys.values.map((v) => (<NumberNode>v).value);

            if (xValues.length !== yValues.length) {
                throw runtimeError('Both vectors must have the same length.');
            }

            return createNumberNode(calculateCovariance(xValues, yValues));
        },
    )
    .addFunction(
        'corr',
        doubleVectorHeader,
        'Calculates the Pearson correlation coefficient of two vectors of the same size.',
        'Berechnet den Korrelationskoeffizienten (Pearson) zweier gleichgroßer Vektoren',
        ({ getParameter, runtimeError }) => {
            const xs = <Vector>getParameter('xs');
            const ys = <Vector>getParameter('ys');

            if (!isEveryElementNumber(xs)) {
                throw runtimeError('All elements of xs must be numbers.');
            }

            if (!isEveryElementNumber(ys)) {
                throw runtimeError('All elements of ys must be numbers.');
            }

            const xValues = xs.values.map((v) => (<NumberNode>v).value);
            const yValues = ys.values.map((v) => (<NumberNode>v).value);

            if (xValues.length !== yValues.length) {
                throw runtimeError('Both vectors must have the same length.');
            }

            return createNumberNode(calculateCorrelationCoefficient(xValues, yValues));
        },
    );

export default samplingStatisticsFragment;
