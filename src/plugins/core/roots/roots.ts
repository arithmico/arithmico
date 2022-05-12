import createNumberNode from '../../../create/NumberNode';
import { FunctionHeaderItem, NumberNode } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';

const rootsPlugin = createPlugin('statistics');
addPluginDescription(rootsPlugin, 'adds erf, normal, cnormal, binco, binom, cbinom functions');
addPluginAuthor(rootsPlugin, 'core');

const sqrtHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];
const rootHeader: FunctionHeaderItem[] = [
    { name: 'x', type: 'number', evaluate: true },
    { name: 'n', type: 'number', evaluate: true },
];

addPluginFunction(
    rootsPlugin,
    createPluginFunction('sqrt', sqrtHeader, 'Calculates the square root of v', (parameters, context) => {
        const parameterStackFrame = mapParametersToStackFrame('sqrt', parameters, sqrtHeader, context);
        const x = (<NumberNode>parameterStackFrame['x']).value;

        if (x < 0) {
            throw 'RuntimeError: sqrt: x < 0';
        }

        return createNumberNode(Math.sqrt(x));
    }),
);

addPluginFunction(
    rootsPlugin,
    createPluginFunction('root', rootHeader, 'Computes the nth root of x', (parameters, context) => {
        const parameterStackFrame = mapParametersToStackFrame('root', parameters, rootHeader, context);
        const x = (<NumberNode>parameterStackFrame['x']).value;
        const n = (<NumberNode>parameterStackFrame['n']).value;

        if (x < 0) {
            throw 'RuntimeError: root: x < 0';
        }

        if (n <= 0) {
            throw 'RuntimeError: root: n <= 0';
        }

        return createNumberNode(Math.pow(x, 1 / n));
    }),
);

export default rootsPlugin;
