import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction
} from "../../../utils/plugin-builder";
import {NumberNode} from "../../../types";
import {FunctionHeaderItem} from "../../../types/SyntaxTreeNodes";
import {mapParametersToStackFrame} from "../../../utils/parameter-utils";
import createNumberNode from "../../../create/NumberNode";

const moduloPlugin = createPlugin('modulo');
addPluginDescription(moduloPlugin, 'adds modulo and integer division');
addPluginAuthor(moduloPlugin, 'core');

const modHeader: FunctionHeaderItem[] = [
    {name: 'n', type: "number", evaluate: true},
    {name: 'm', type: "number", evaluate: true}
];
const idivHeader: FunctionHeaderItem[] = [
    {name: 'n', type: "number", evaluate: true},
    {name: 'm', type: "number", evaluate: true}
];

addPluginFunction(moduloPlugin,
    createPluginFunction(
        "mod",
        modHeader,
        'calculates the remainder of n/m (mathematical variant)',
        'Berechnet den Rest der Division n/m (mathematische Variante).',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('mod', parameters, modHeader, context);
            const n = (<NumberNode>parameterStackFrame['n']).value;
            const m = (<NumberNode>parameterStackFrame['m']).value;

            if (m === 0)
                throw 'ArithmeticError: division by zero is not allowed';

            return createNumberNode(((n % m) + m) % m);
        }
    ));

addPluginFunction(moduloPlugin,
    createPluginFunction(
        "idiv",
        modHeader,
        'calculates the integer division of n/m',
        'Berechnet das ganzzahlige Ergebnis der Division n/m.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('mod', parameters, modHeader, context);
            const n = (<NumberNode>parameterStackFrame['n']).value;
            const m = (<NumberNode>parameterStackFrame['m']).value;

            if (m === 0)
                throw 'ArithmeticError: division by zero is not allowed';

            const division = n / m;
            if (division > 0)
                return  createNumberNode(Math.floor(division));
            if (division < 0)
                return createNumberNode(Math.ceil(division));
        }
    ));

export default moduloPlugin;