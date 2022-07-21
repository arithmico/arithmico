import createNumberNode from '../../../create/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../types/SyntaxTreeNodes';
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
const statisticsPlugin = createPlugin('core/statistics');
addPluginDescription(statisticsPlugin, 'adds erf, normal, cnormal, binco, binom, cbinom functions');
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

export default statisticsPlugin;
