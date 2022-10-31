import createNumberNode from '../../../create/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';

const minmaxPlugin = createPlugin('core/minmax');
addPluginAuthor(minmaxPlugin, 'core');
addPluginDescription(minmaxPlugin, 'adds min and max functions');

const header: FunctionHeaderItem[] = [{ name: 'v', type: 'number', evaluate: true, repeat: true }];

addPluginFunction(
    minmaxPlugin,
    createPluginFunction(
        'min',
        header,
        'returns the minimum of all passed parameters',
        'Gibt das Minimum aus allen übergebenen Werten zurück.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('min', parameters, header, context);
            const values = [...parameterStackFrame.values()].map((value) => (<NumberNode>value).value);
            return createNumberNode(Math.min(...values));
        },
    ),
);

addPluginFunction(
    minmaxPlugin,
    createPluginFunction(
        'max',
        header,
        'returns the maximum of all passed parameters',
        'Gibt das Maximum aus allen übergebenen Werten zurück.',

        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('max', parameters, header, context);
            const values = [...parameterStackFrame.values()].map((value) => (<NumberNode>value).value);
            return createNumberNode(Math.max(...values));
        },
    ),
);

export default minmaxPlugin;
