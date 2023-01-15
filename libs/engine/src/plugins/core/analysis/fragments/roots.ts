import createNumberNode from '../../../../node-operations/create-node/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../../types/nodes.types';
import { PluginFragment } from '../../../../utils/plugin-builder';

const sqrtHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];
const rootHeader: FunctionHeaderItem[] = [
    { name: 'x', type: 'number', evaluate: true },
    { name: 'n', type: 'number', evaluate: true },
];

const rootsFragment = new PluginFragment()
    .addFunction(
        'sqrt',
        sqrtHeader,
        'Calculates the square root of x',
        'Berechnet die Quadratwurzel von x.',
        ({ getParameter, runtimeError }) => {
            const x = (<NumberNode>getParameter('x')).value;

            if (x < 0) {
                throw runtimeError('x must be greater than or equal to 0');
            }

            return createNumberNode(Math.sqrt(x));
        },
    )
    .addFunction(
        'root',
        rootHeader,
        'Computes the nth root of x',
        'Berechnet die n-te Wurzel von x.',
        ({ getParameter, runtimeError }) => {
            const x = (<NumberNode>getParameter('x')).value;
            const n = (<NumberNode>getParameter('n')).value;

            if (x < 0) {
                throw runtimeError('x must be greater than or equal to 0');
            }

            if (n <= 0) {
                throw runtimeError('x must be greater than  0');
            }

            return createNumberNode(Math.pow(x, 1 / n));
        },
    );

export default rootsFragment;
