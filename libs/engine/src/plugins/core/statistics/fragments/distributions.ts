import { FunctionHeaderItem, NumberNode } from '../../../../types/SyntaxTreeNodes';
import createNumberNode from '../../../../create/create-number-node';
import { calculateErf } from '../utils/erf';
import { calculateFact } from '../utils/fact';
import { calculateCNormal, calculateNormal } from '../utils/normal';
import { calculateBinom, calculateCBinom, checkNK } from '../utils/binomial';
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
        'erf',
        singleNumberHeader,
        'Gaussian error function',
        'Gaußsche Fehlerfunktion',
        ({ getParameter }) => {
            const x = (<NumberNode>getParameter('x')).value;
            return createNumberNode(calculateErf(x));
        },
    )
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
        'Computes n over k (binomial coefficient)',
        'Berechnet n über k (Binomialkoeffizient)',
        ({ getParameter }) => {
            const n = (<NumberNode>getParameter('n')).value;
            const k = (<NumberNode>getParameter('k')).value;
            checkNK('binco', n, k);
            return createNumberNode(binco(n, k));
        },
    )
    .addFunction('binom', binomHeader, 'Binomial distribution', 'Binomialverteilung', ({ getParameter }) => {
        const n = (<NumberNode>getParameter('n')).value;
        const p = (<NumberNode>getParameter('p')).value;
        const k = (<NumberNode>getParameter('k')).value;
        return createNumberNode(calculateBinom(n, p, k));
    })
    .addFunction(
        'cbinom',
        binomHeader,
        'Cumulative binomial distribution',
        'Kumulative Binomialverteilung',
        ({ getParameter }) => {
            const n = (<NumberNode>getParameter('n')).value;
            const p = (<NumberNode>getParameter('p')).value;
            const k = (<NumberNode>getParameter('k')).value;
            return createNumberNode(calculateCBinom(n, p, k));
        },
    );

export default distributionFragment;
