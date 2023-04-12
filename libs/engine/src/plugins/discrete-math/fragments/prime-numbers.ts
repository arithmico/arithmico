import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import createVector from '../../../node-operations/create-node/create-vector';
import { getNthPrimeNumber, isPrimeNumber, sieveOfAtkin } from '../utils/prime-number-utils';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import createBooleanNode from '../../../node-operations/create-node/create-boolean-node';
import { PluginFragment } from '../../../utils/plugin-builder';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const primeNumberFragment = new PluginFragment();

__FUNCTIONS.primeRange &&
    primeNumberFragment.addFunction(
        'prime:range',
        singleNumberHeader,
        'Returns all prime numbers in the interval (1, n].',
        'Gibt alle Primzahlen im Intervall (1, n] zurück.',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;

            if (n % 1 !== 0) {
                throw runtimeError('Only integers are allowed.');
            }
            if (n < 0) {
                throw runtimeError('Numbers smaller than 0 are not allowed.');
            }

            return createVector(sieveOfAtkin(n).map((value) => createNumberNode(value)));
        },
    );

__FUNCTIONS.primeNth &&
    primeNumberFragment.addFunction(
        'prime:nth',
        singleNumberHeader,
        'Returns the nth prime number.',
        'Gibt die nte Primzahl zurück.',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;

            if (n % 1 !== 0) {
                throw runtimeError('Only integers are allowed.');
            }
            if (n < 1) {
                throw runtimeError('Numbers smaller than 1 are not allowed.');
            }

            return createNumberNode(getNthPrimeNumber(n));
        },
    );

__FUNCTIONS.primeIs &&
    primeNumberFragment.addFunction(
        'prime:is',
        singleNumberHeader,
        'Returns true if the given number is a prime number, otherwise returns false.',
        'Gibt true zurück, wenn die gegebene Zahl eine Primzahl ist, ansonsten wird false zurückgegeben.',
        ({ getParameter }) => {
            const n = (<NumberNode>getParameter('n')).value;
            return createBooleanNode(isPrimeNumber(n));
        },
    );

__FUNCTIONS.primePi &&
    primeNumberFragment.addFunction(
        'prime:pi',
        singleNumberHeader,
        'The pi function specifies the number of prime numbers in the interval (1, n].',
        'Die Pi Funktion gibt die Anzahl der Primzahlen im Intervall (1, n] an.',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;

            if (n % 1 !== 0) {
                throw runtimeError('Only integers are allowed.');
            }
            if (n < 2) {
                throw runtimeError('Numbers smaller than 2 are not allowed.');
            }

            return createNumberNode(sieveOfAtkin(n).length);
        },
    );

export default primeNumberFragment;
