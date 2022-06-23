import createNumberNode from '../../../create/NumberNode';
import { FunctionHeaderItem, NumberNode } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginConstant,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';

const expPlugin = createPlugin('exp');
addPluginAuthor(expPlugin, 'core');
addPluginDescription(expPlugin, 'adds e, exp, log, lg');

const expHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];
const logHeader: FunctionHeaderItem[] = [
    { name: 'x', type: 'number', evaluate: true },
    { name: 'base', type: 'number', evaluate: true },
];

addPluginConstant(expPlugin, {
    name: 'e',
    value: createNumberNode(Math.E),
    documentation: {
        en: {
            synopsis: 'e',
            description: "Euler's number",
        },
        de: {
            synopsis: 'e',
            description: 'Eulers Zahl',
        },
    },
});

addPluginFunction(
    expPlugin,
    createPluginFunction('exp', expHeader, 'Equivalent to e^x.', 'Äquivalent zu e^x', (parameters, context) => {
        const parameterStackFrame = mapParametersToStackFrame('exp', parameters, expHeader, context);
        const x = (<NumberNode>parameterStackFrame['x']).value;
        return createNumberNode(Math.exp(x));
    }),
);

addPluginFunction(
    expPlugin,
    createPluginFunction(
        'lg',
        expHeader,
        'Logarithm of x to base 10.',
        'Berechnet den Logarithmus von x zur Basis 10',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('lg', parameters, expHeader, context);
            const x = (<NumberNode>parameterStackFrame['x']).value;
            if (x <= 0) {
                throw 'RuntimeError: lg: undefined';
            }
            return createNumberNode(Math.log10(x));
        },
    ),
);

addPluginFunction(
    expPlugin,
    createPluginFunction(
        'ln',
        expHeader,
        'Logarithm of x to base e.',
        'Berechnet den Logarithmus von x zur Basis e.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('ln', parameters, expHeader, context);
            const x = (<NumberNode>parameterStackFrame['x']).value;
            if (x <= 0) {
                throw 'RuntimeError: lg: undefined';
            }
            return createNumberNode(Math.log(x));
        },
    ),
);

addPluginFunction(
    expPlugin,
    createPluginFunction(
        'log',
        logHeader,
        'Logarithm of x to the given base.',
        'Berechnet den Logarithmus von x zur Basis base',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('log', parameters, logHeader, context);
            const x = (<NumberNode>parameterStackFrame['x']).value;
            const b = (<NumberNode>parameterStackFrame['base']).value;

            if (x <= 0 || b <= 0) {
                throw 'RuntimeError: log: undefined';
            }

            return createNumberNode(Math.log(x) / Math.log(b));
        },
    ),
);

export default expPlugin;
