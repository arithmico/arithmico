import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import { PluginFragment } from '../../../utils/plugin-builder';

const absHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const absFragment = new PluginFragment();

__FUNCTIONS.abs &&
    absFragment.addFunction(
        'abs',
        absHeader,
        'Computes the absolute value of a number',
        'Berechnet den absoluten Wert einer Zahl.',
        ({ getParameter }) => {
            const value = (<NumberNode>getParameter('n')).value;
            return createNumberNode(Math.abs(value));
        },
    );

export default absFragment;
