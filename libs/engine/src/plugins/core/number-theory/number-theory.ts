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
import { getNthPrimeNumber, isPrimeNumber, sieveOfEratosthenes } from './utils/prime-number-utils';
import createBooleanNode from '../../../create/create-boolean-node';

const numberTheoryPlugin = createPlugin('core/number-theory');
addPluginDescription(numberTheoryPlugin, 'brings many functions for calculation on integers and in number theory');
addPluginAuthor(numberTheoryPlugin, 'core');

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];
const doubleNumberHeader: FunctionHeaderItem[] = [
    { name: 'a', type: 'number', evaluate: true },
    { name: 'a', type: 'number', evaluate: true },
];

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'prime:range',
        singleNumberHeader,
        'Returns all prime numbers between 2 and including n.',
        'Gibt alle Primzahlen zurück, die zwischen 2 und einschließlich n liegen.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'prime:range',
                parameters,
                singleNumberHeader,
                context,
            );
            const n = (<NumberNode>parameterStackFrame['n']).value;

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
            const n = (<NumberNode>parameterStackFrame['n']).value;

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
            const n = (<NumberNode>parameterStackFrame['n']).value;
            return createBooleanNode(isPrimeNumber(n));
        },
    ),
);

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'prime:pi',
        singleNumberHeader,
        'The pi function specifies the number of prime numbers in the interval [1, n].',
        'Die PiFunktion gibt die Anzahl der Primzahlen im Intervall (1, n] an.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('prime:pi', parameters, singleNumberHeader, context);
            const n = (<NumberNode>parameterStackFrame['n']).value;

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

export default numberTheoryPlugin;
