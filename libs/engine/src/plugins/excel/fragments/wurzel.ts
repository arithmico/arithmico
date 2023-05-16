import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import { PluginFragment } from '../../../utils/plugin-builder';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const wurzelFragment = new PluginFragment().addFunction(
    'wurzel',
    singleNumberHeader,
    'square root.',
    'Quadratwurzel',
    ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;

        if (n < 0) {
            throw runtimeError('Zahl muss größer oder gleich 0 sein');
        }

        return createNumberNode(Math.sqrt(n));
    },
);

export default wurzelFragment;
