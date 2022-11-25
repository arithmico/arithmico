import { FunctionHeaderItem, FunctionNode, NumberNode, Vector } from '../../../../types/SyntaxTreeNodes';
import createVector from '../../../../create/create-vector';
import createNumberNode from '../../../../create/create-number-node';
import evaluate from '../../../../eval';
import createFunctionCall from '../../../../create/create-function-call';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';

const tableHeader: FunctionHeaderItem[] = [
    { name: 'f', type: 'function', evaluate: true },
    { name: 'u', type: 'number', evaluate: true, optional: true },
    { name: 'v', type: 'number', evaluate: true, optional: true },
    { name: 'w', type: 'number', evaluate: true, optional: true },
];

const tableFragment = new PluginFragment().addFunction(
    'table',
    tableHeader,
    'Maps f(x) to (x, f(x)) within the given interval [a,b], where w is the distance between the x values',
    'table(f, u?, v?, w?) Erstellt zu der Funktion f eine Wertetabelle mit Wertepaaren [x; f(x)] für x-Werte aus dem Intervall [u; v]. Dabei gibt w die Schrittweite der x-Werte an.',
    ({ getParameter, typeError, context }) => {
        const f = <FunctionNode>getParameter('f');
        const u = (<NumberNode>getParameter('u')).value ?? -10;
        const v = (<NumberNode>getParameter('v')).value ?? 10;
        const width = (<NumberNode>getParameter('w')).value ?? 1;
        const start = Math.min(u, v);
        const stop = Math.max(u, v);
        const values: Vector[] = [];

        if (f.header.length !== 1 || (f.header[0].type !== 'number' && f.header[0].type !== 'any')) {
            throw typeError('Invalid function signature.');
        }

        for (let x = start; x <= stop; x += width) {
            values.push(
                createVector([createNumberNode(x), evaluate(createFunctionCall(f, [createNumberNode(x)]), context)]),
            );
        }

        return createVector(values);
    },
);

export default tableFragment;
