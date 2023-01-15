import { PluginFragment } from '../../../utils/plugin-builder';
import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import createBooleanNode from '../../../node-operations/create-node/create-boolean-node';
import { greatestCommonDivisor } from '../../../utils/float-utils';
import { eulerPhiFunction } from '../utils/euler-phi-function-utils';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];
const doubleNumberHeader: FunctionHeaderItem[] = [
    { name: 'a', type: 'number', evaluate: true },
    { name: 'b', type: 'number', evaluate: true },
];

const coprimeFragment = new PluginFragment()
    .addFunction(
        'coprime',
        doubleNumberHeader,
        'Checks if a and b are divisor independent (coprime).',
        'Prüft ob a und b teilerfremd sind.',
        ({ getParameter, runtimeError }) => {
            const a = (<NumberNode>getParameter('a')).value;
            const b = (<NumberNode>getParameter('b')).value;

            if (a % 1 !== 0 || b % 1 !== 0) {
                throw runtimeError('Only integers are allowed.');
            }
            if (a < 1 || b < 1) {
                throw runtimeError('Numbers smaller than 1 are not allowed.');
            }

            return createBooleanNode(greatestCommonDivisor(a, b) === 1);
        },
    )
    .addFunction(
        'euler:phi',
        singleNumberHeader,
        'Specifies how many positive natural numbers, which are coprime to n, that are not greater than n.',
        'Gibt an, wie viele positive natürliche Zahlen, die zu n koprim sind, nicht größer als n sind.',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;

            if (n % 1 !== 0) {
                throw runtimeError('Only integers are allowed.');
            }
            if (n < 0) {
                throw runtimeError('Numbers smaller than 0 are not allowed.');
            }

            return createNumberNode(eulerPhiFunction(n));
        },
    );

export default coprimeFragment;
