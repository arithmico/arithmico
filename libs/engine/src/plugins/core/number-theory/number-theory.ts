import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { FunctionHeaderItem, NumberNode } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import createNumberNode from '../../../create/create-number-node';
import createVector from '../../../create/create-vector';
<<<<<<< HEAD
import { getNthPrimeNumber, isPrime, isPrimeNumber, sieveOfEratosthenes } from './utils/prime-number-utils';
import createBooleanNode from '../../../create/create-boolean-node';
import { greatestCommonDivisor } from '../../../utils/float-utils';
import { extendedEuclideanGreatestCommonDivisor } from './utils/gcd-extended';
import createEquals from '../../../create/create-equals';
import createPlus from '../../../create/create-plus';
import createTimes from '../../../create/create-times';
import { getNthPrimeNumber, isPrimeNumber, sieveOfEratosthenes } from './utils/prime-number-utils';
import createBooleanNode from '../../../create/create-boolean-node';

const numberTheoryPlugin = createPlugin('core/number-theory');
addPluginDescription(numberTheoryPlugin, 'brings many functions for calculation on integers and in number theory');
addPluginAuthor(numberTheoryPlugin, 'core');

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];
const doubleNumberHeader: FunctionHeaderItem[] = [
    { name: 'a', type: 'number', evaluate: true },
    { name: 'b', type: 'number', evaluate: true },
];

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'prime:range',
        singleNumberHeader,
        'Returns all prime numbers in the interval (1, n].',
        'Gibt alle Primzahlen im Intervall (1, n] zurück.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'prime:range',
                parameters,
                singleNumberHeader,
                context,
            );
            const n = (<NumberNode>parameterStackFrame.get('n')).value;

            if (n % 1 !== 0) {
                throw 'RuntimeError: prime:range: Only integers are allowed.';
            }
            if (n < 2) {
                throw 'RuntimeError: prime:range: Numbers smaller than 2 are not allowed.';
            }
            return createVector(sieveOfEratosthenes(n).map((value) => createNumberNode(value)));
        },
    ),
);

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'prime:nth',
        singleNumberHeader,
        'Returns the nth prime number.',
        'Gibt die nte Primzahl zurück.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('prime:nth', parameters, singleNumberHeader, context);
            const n = (<NumberNode>parameterStackFrame.get('n')).value;

            if (n % 1 !== 0) {
                throw 'RuntimeError: prime:nth: Only integers are allowed.';
            }
            if (n < 1) {
                throw 'RuntimeError: prime:nth: Numbers smaller than 1 are not allowed.';
            }
            return createNumberNode(getNthPrimeNumber(n));
        },
    ),
);

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'prime:is',
        singleNumberHeader,
        'Returns true if the given number is a prime number, otherwise returns false.',
        'Gibt true zurück, wenn die gegebene Zahl eine Primzahl ist, ansonsten wird false zurückgegeben.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('prime:is', parameters, singleNumberHeader, context);
            const n = (<NumberNode>parameterStackFrame.get('n')).value;
            return createBooleanNode(isPrimeNumber(n));
        },
    ),
);

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'prime:pi',
        singleNumberHeader,
        'The pi function specifies the number of prime numbers in the interval (1, n].',
        'Die Pi Funktion gibt die Anzahl der Primzahlen im Intervall (1, n] an.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('prime:pi', parameters, singleNumberHeader, context);
            const n = (<NumberNode>parameterStackFrame.get('n')).value;

            if (n % 1 !== 0) {
                throw 'RuntimeError: prime:pi: Only integers are allowed.';
            }
            if (n < 2) {
                throw 'RuntimeError: prime:pi: Numbers smaller than 2 are not allowed.';
            }

            return createNumberNode(sieveOfEratosthenes(n).length);
        },
    ),
);

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'gcd',
        doubleNumberHeader,
        'Calculates the greatest common divisor (gcd).',
        'Berechnet den größten gemeinsamen Teiler (ggT).',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('gcd', parameters, doubleNumberHeader, context);
            const a = (<NumberNode>parameterStackFrame.get('a')).value;
            const b = (<NumberNode>parameterStackFrame.get('b')).value;

            if (a % 1 !== 0 || b % 1 !== 0) {
                throw 'RuntimeError: gcd: Only integers are allowed.';
            }
            if (a < 1 || b < 1) {
                throw 'RuntimeError: gcd: Numbers smaller than 1 are not allowed.';
            }

            return createNumberNode(greatestCommonDivisor(a, b));
        },
    ),
);

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'gcdExtended',
        doubleNumberHeader,
        'Calculates the greatest common divisor (gcd) with extended euclidean algorithm.',
        'Berechnet den größten gemeinsamen Teiler (ggT) mit dem erweitertem euklidischen Algorithmus.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'gcdExtended',
                parameters,
                doubleNumberHeader,
                context,
            );
            const a = (<NumberNode>parameterStackFrame.get('a')).value;
            const b = (<NumberNode>parameterStackFrame.get('b')).value;

            if (a % 1 !== 0 || b % 1 !== 0) {
                throw 'RuntimeError: gcdExtended: Only integers are allowed.';
            }
            if (a < 1 || b < 1) {
                throw 'RuntimeError: gcdExtended: Numbers smaller than 1 are not allowed.';
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
    ),
);

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'prime:is',
        singleNumberHeader,
        'Returns true if the given number is a prime number, otherwise returns false.',
        'Gibt true zurück, wenn die gegebene Zahl eine Primzahl ist, ansonsten wird false zurückgegeben.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('prime:is', parameters, singleNumberHeader, context);
            const n = (<NumberNode>parameterStackFrame.get('n')).value;
            return createBooleanNode(isPrime(n));
        },
    ),
);

export default numberTheoryPlugin;
