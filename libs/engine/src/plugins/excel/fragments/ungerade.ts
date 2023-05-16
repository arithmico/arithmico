import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import { PluginFragment } from '../../../utils/plugin-builder';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const ungeradeFragment = new PluginFragment().addFunction(
    'ungerade',
    singleNumberHeader,
    'Rounds up a number to the nearest odd integer',
    'Rundet eine Zahl auf die nächste ungerade ganze Zahl auf',
    ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;

        if (isNaN(n)) {
            throw runtimeError('Funktion ungerade funktioniert nur mit Zahlen');
        }

        if (n >= 0) {
            const gerundeteZahl = Math.ceil(n); // Runden
            const istGerade = gerundeteZahl % 2 === 0; // Überprüfen gerundete Zahl gerade?
            const ungeradeZahl = istGerade ? gerundeteZahl + 1 : gerundeteZahl;
            return createNumberNode(ungeradeZahl);
        } else {
            const gerundeteZahl = Math.floor(n); // Runden
            const istGerade = gerundeteZahl % 2 === 0; // Überprüfen gerundete Zahl gerade?
            const ungeradeZahl = istGerade ? gerundeteZahl - 1 : gerundeteZahl; //weg von 0
            return createNumberNode(ungeradeZahl);
        }
    },
);

export default ungeradeFragment;
