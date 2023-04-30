import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { PluginFragment } from '../../../utils/plugin-builder';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const zweifakultaetFragment = new PluginFragment().addFunction(
    'zweifakultät',
    singleNumberHeader,
    'Calculates ...',
    'Berechnet ...',
    ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;
        if (n < 0) {
            throw runtimeError('Nur Ganzzahlen > 0 erlaubt.');
        }
        if (n % 1 !== 0) {
            throw runtimeError('Keine Ganzzahl.');
        }

        let result = 1;
        for (let i = 1; i <= n; i = i + 2) {
            result *= i;
        }
        return createNumberNode(result);
    },
);

export default zweifakultaetFragment;
