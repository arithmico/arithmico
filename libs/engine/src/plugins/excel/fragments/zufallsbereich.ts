import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import { PluginFragment } from '../../../utils/plugin-builder';

const doubleNumberHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'number', evaluate: true },
    { name: 'a', type: 'number', evaluate: true },
];

const zufallsbereichFragment = new PluginFragment().addFunction(
    'zufallsbereich',
    doubleNumberHeader,
    'Returns a random number between two specified numbers or just a random number.',
    'Gibt Zufallszahl zwischen zwei angegebenen Zahlen zurück bzw. eine Zufallszahl.',
    ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;
        const a = (<NumberNode>getParameter('a')).value;
        if (isNaN(n || a)) {
            throw runtimeError('Funktion zufallsbereich funktioniert nur mit Zahlen.');
        } else {
            // Wenn minValue und maxValue definiert sind, generieren Sie eine Zufallszahl im angegebenen Bereich
            return createNumberNode(Math.floor(Math.random() * (a - n) + n));
        }
    },
);

export default zufallsbereichFragment;
