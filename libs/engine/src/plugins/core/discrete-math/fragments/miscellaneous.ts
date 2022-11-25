import { FunctionHeaderItem, NumberNode } from '../../../../types/SyntaxTreeNodes';
import createNumberNode from '../../../../create/create-number-node';
import { fib } from '../utils/fib-utils';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const miscellaneousFragment = new PluginFragment().addFunction(
    'fib',
    singleNumberHeader,
    'calculates the n-th fibonacci number',
    'Berechnet die n-te Fibonacci Zahl.',
    ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;

        if (n % 1 !== 0) {
            throw runtimeError('Only integers are allowed');
        }

        if (n <= 0) {
            throw runtimeError('Number has to be 1 or greater');
        }

        return createNumberNode(fib(n));
    },
);

export default miscellaneousFragment;
