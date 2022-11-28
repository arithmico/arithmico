import { FunctionHeaderItem, NumberNode } from '../../../../types/SyntaxTreeNodes';
import createNumberNode from '../../../../create/create-number-node';
import { greatestCommonDivisor } from '../../../../utils/float-utils';
import { extendedEuclideanGreatestCommonDivisor } from '../utils/gcd-extended-utils';
import createEquals from '../../../../create/create-equals';
import createPlus from '../../../../create/create-plus';
import createTimes from '../../../../create/create-times';
import { PluginFragment } from '../../../../utils/plugin-builder';

const doubleNumberHeader: FunctionHeaderItem[] = [
    { name: 'a', type: 'number', evaluate: true },
    { name: 'b', type: 'number', evaluate: true },
];

const gcdLcmFragment = new PluginFragment()
    .addFunction(
        'gcd',
        doubleNumberHeader,
        'Calculates the greatest common divisor (gcd).',
        'Berechnet den größten gemeinsamen Teiler (ggT).',
        ({ getParameter, runtimeError }) => {
            const a = (<NumberNode>getParameter('a')).value;
            const b = (<NumberNode>getParameter('b')).value;

            if (a % 1 !== 0 || b % 1 !== 0) {
                throw runtimeError('Only integers are allowed.');
            }
            if (a < 1 || b < 1) {
                throw runtimeError('Numbers smaller than 1 are not allowed.');
            }

            return createNumberNode(greatestCommonDivisor(a, b));
        },
    )
    .addFunction(
        'gcd:extended',
        doubleNumberHeader,
        'Calculates the greatest common divisor (gcd) with extended euclidean algorithm.',
        'Berechnet den größten gemeinsamen Teiler (ggT) mit dem erweitertem euklidischen Algorithmus.',
        ({ getParameter, runtimeError }) => {
            const a = (<NumberNode>getParameter('a')).value;
            const b = (<NumberNode>getParameter('b')).value;

            if (a % 1 !== 0 || b % 1 !== 0) {
                throw runtimeError('Only integers are allowed.');
            }
            if (a < 1 || b < 1) {
                throw runtimeError('Numbers smaller than 1 are not allowed.');
            }

            const resultExtGCD = extendedEuclideanGreatestCommonDivisor(a, b);
            const gcd = resultExtGCD[0];
            const bezoutFactorA = resultExtGCD[1];
            const bezoutFactorB = resultExtGCD[2];

            return createEquals(
                createNumberNode(gcd),
                createPlus(
                    createTimes(createNumberNode(bezoutFactorA), createNumberNode(a)),
                    createTimes(createNumberNode(bezoutFactorB), createNumberNode(b)),
                ),
            );
        },
    )
    .addFunction(
        'lcm',
        doubleNumberHeader,
        'Calculates the least common multiple (lcm).',
        'Berechnet das kleinste gemeinsame Vielfache (kgV).',
        ({ getParameter, runtimeError }) => {
            const a = (<NumberNode>getParameter('a')).value;
            const b = (<NumberNode>getParameter('b')).value;

            if (a % 1 !== 0 || b % 1 !== 0) {
                throw runtimeError('Only integers are allowed.');
            }
            if (a < 1 || b < 1) {
                throw runtimeError('Numbers smaller than 1 are not allowed.');
            }

            return createNumberNode((a * b) / greatestCommonDivisor(a, b));
        },
    );

export default gcdLcmFragment;
