import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import { PluginFragment } from '../../../utils/plugin-builder';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const wurzelFragment = new PluginFragment();

__FUNCTIONS.wurzel &&
    wurzelFragment.addFunction(
        'wurzel',
        singleNumberHeader,
        'square root.',
        'Quadratwurzel',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;

            if (n < 0) {
                throw runtimeError('Numbers smaller than 0 are not allowed.');
            }

            return createNumberNode(Math.sqrt(n));
        },
    );

export default wurzelFragment;
