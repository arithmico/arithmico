import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { PluginFragment } from '../../../utils/plugin-builder';
import { calculateFactdouble } from './utils/factdouble';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const zweifakultaetFragment = new PluginFragment().addFunction(
    'zweifakultaet', // should be zweifakultät TODO accept ä
    singleNumberHeader,
    'Calculates the factorial with a step of 2. Decimal places are cut off.',
    'Gibt die Fakultät zu einer Zahl mit der Schrittlänge 2 zurück. Nachkommastellen werden abgeschnitten.',
    ({ getParameter }) => {
        const n = (<NumberNode>getParameter('n')).value;
        return createNumberNode(calculateFactdouble(n));
    },
);

export default zweifakultaetFragment;
