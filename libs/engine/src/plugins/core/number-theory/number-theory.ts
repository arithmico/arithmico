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
import {getNthPrime, sieveOfEratosthenes} from './utils/prime-number-utils';

const numberTheoryPlugin = createPlugin('core/number-theory');
addPluginDescription(numberTheoryPlugin, 'brings many functions for calculation on integers and in number theory');
addPluginAuthor(numberTheoryPlugin, 'core');

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'prime:range',
        singleNumberHeader,
        'Returns all prime numbers between 2 and including n.',
        'Gibt alle Primzahlen zurück, die zwischen 2 und einschließlich n liegen.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('prime:range', parameters, singleNumberHeader, context);
            const n = (<NumberNode>parameterStackFrame['n']).value;

            if (n % 1 !== 0) {
                throw 'RuntimeError: prime:range: Only integers are allowed.';
            }
            if (n < 2) {
                throw 'RuntimeError: prime:range: Numbers samaller than 2 are not allowed.';
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
            if (n < 0) {
                throw 'RuntimeError: prime:nth: Numbers samaller than 2 are not allowed.';
            }
            return createNumberNode(getNthPrime(n));
        },
    ),
);

export default numberTheoryPlugin;
