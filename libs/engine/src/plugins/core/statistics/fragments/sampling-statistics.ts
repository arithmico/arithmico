import { FunctionHeaderItem, NumberNode, SyntaxTreeNode, Vector } from '../../../../types/SyntaxTreeNodes';
import createNumberNode from '../../../../create/create-number-node';
import { calculateAvg } from '../utils/avg';
import { calculateVar } from '../utils/var';
import { calculateSd } from '../utils/sd';
import { calculateQuantile } from '../utils/quantile';
import { isEveryElementNumber } from '../../../../utils/tensor-utils';
import { calculateCovariance } from '../utils/covariance';
import { calculateCorrelationCoefficient } from '../utils/corr';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';

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
    .addFunction('var', numberSeriesHeader, 'Calculates the variance', 'Berechnet die Varianz', ({ getParameter }) => {
        const xs = (<SyntaxTreeNode[]>getParameter('x')).map((x) => (<NumberNode>x).value);
        return createNumberNode(calculateVar(xs));
    })
    .addFunction(
        'sd',
        numberSeriesHeader,
        'Calculates the standard deviation',
        'Berechnet die Standardabweichung',
        ({ getParameter }) => {
            const xs = (<SyntaxTreeNode[]>getParameter('x')).map((x) => (<NumberNode>x).value);
            return createNumberNode(calculateSd(xs));
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
                throw runtimeError('Needs 2 or more parameters.');
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
                throw runtimeError('Needs 2 or more parameters.');
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

            const xsValue = xs.values;
            const ysValue = ys.values;

            if (xsValue.length !== ysValue.length) {
                throw runtimeError('Both vectors must have the same length.');
            }

            return createNumberNode(
                calculateCovariance(
                    xsValue.map((v) => (<NumberNode>v).value),
                    ysValue.map((v) => (<NumberNode>v).value),
                ),
            );
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

            const xsValue = xs.values.map((v) => (<NumberNode>v).value);
            const ysValue = ys.values.map((v) => (<NumberNode>v).value);

            if (xsValue.length !== ysValue.length) {
                throw runtimeError('Both vectors must have the same length.');
            }

            return createNumberNode(calculateCorrelationCoefficient(xsValue, ysValue));
        },
    );

export default samplingStatisticsFragment;
