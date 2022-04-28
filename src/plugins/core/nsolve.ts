import createFunctionCall from '../../create/FunctionCall';
import createMinus from '../../create/Minus';
import createNumberNode from '../../create/NumberNode';
import createSymbolNode from '../../create/SymbolNode';
import serialize from '../../serialize';
import { Context, Equals, NumberNode, SyntaxTreeNode } from '../../types';
import { FunctionHeaderItem } from '../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../utils/parameter-utils';
import { addPluginAuthor, addPluginDescription, addPluginFunction, createPlugin } from '../../utils/plugin-builder';

const nsolvePlugin = createPlugin('core/nsolve');

addPluginAuthor(nsolvePlugin, 'core');
addPluginDescription(nsolvePlugin, 'adds nsolve function');

const nsolveHeader: FunctionHeaderItem[] = [
    { type: 'equals', name: 'equation', evaluate: false },
    { type: 'number', name: 'start', evaluate: true, optional: true },
    { type: 'number', name: 'stop', evaluate: true, optional: true },
];

addPluginFunction(nsolvePlugin, {
    name: 'nsolve',
    function: {
        type: 'function',
        header: nsolveHeader,
        expression: createFunctionCall(createSymbolNode('nsolve'), [
            createSymbolNode('equation'),
            createSymbolNode('start'),
            createSymbolNode('stop'),
        ]),
        evaluator: (parameters: SyntaxTreeNode[], context: Context): SyntaxTreeNode => {
            const stackFrame = mapParametersToStackFrame('nsolve', parameters, nsolveHeader, context);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const leftLimit = stackFrame.start ? (<NumberNode>stackFrame.start).value : -20;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const rightLimit = stackFrame.stop ? (<NumberNode>stackFrame.stop).value : 20;
            const equation = <Equals>stackFrame.equation;
            const expression = createMinus(equation.left, equation.right);

            console.log('nsolve expression: ', serialize(expression, context.options));

            return createNumberNode(42);
        },
    },
    documentation: {
        en: {
            synopsis: 'nsolve(equation, start, stop)',
            description: 'If possible, solve the equation within the limits.',
        },
    },
});

export default nsolvePlugin;
