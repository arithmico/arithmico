import { FunctionHeaderItem, FunctionNode, NumberNode, Vector } from '../../../types/SyntaxTreeNodes';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import createVector from '../../../create/create-vector';
import createNumberNode from '../../../create/create-number-node';
import evaluate from '../../../eval';
import createFunctionCall from '../../../create/create-function-call';

const tablePlugin = createPlugin('core/table');
addPluginAuthor(tablePlugin, 'core');
addPluginDescription(tablePlugin, 'adds table function');

const tableHeader: FunctionHeaderItem[] = [
    { name: 'f', type: 'function', evaluate: true },
    { name: 'u', type: 'number', evaluate: true, optional: true },
    { name: 'v', type: 'number', evaluate: true, optional: true },
    { name: 'w', type: 'number', evaluate: true, optional: true },
];

addPluginFunction(
    tablePlugin,
    createPluginFunction(
        'table',
        tableHeader,
        'Maps f(x) to (x, f(x)) within the given interval [a,b], where w is the distance between the x values',
        'table(f, u?, v?, w?) Erstellt zu der Funktion f eine Wertetabelle mit Wertepaaren [x; f(x)] für x-Werte aus dem Intervall [u; v]. Dabei gibt w die Schrittweite der x-Werte an.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('table', parameters, tableHeader, context);
            const f = <FunctionNode>parameterStackFrame['f'];
            const u = parameterStackFrame['u'] ? (<NumberNode>parameterStackFrame['u']).value : -10;
            const v = parameterStackFrame['v'] ? (<NumberNode>parameterStackFrame['v']).value : 10;
            const width = parameterStackFrame['w'] ? (<NumberNode>parameterStackFrame['w']).value : 1;
            const start = Math.min(u, v);
            const stop = Math.max(u, v);
            const values: Vector[] = [];

            if (f.header.length !== 1 || (f.header[0].type !== 'number' && f.header[0].type !== 'any')) {
                throw 'TypeError: table: invalid function signature';
            }

            for (let x = start; x <= stop; x += width) {
                values.push(
                    createVector([
                        createNumberNode(x),
                        evaluate(createFunctionCall(f, [createNumberNode(x)]), context),
                    ]),
                );
            }

            return createVector(values);
        },
    ),
);

export default tablePlugin;
