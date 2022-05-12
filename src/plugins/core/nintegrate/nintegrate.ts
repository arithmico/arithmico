import createFunctionCall from '../../../create/FunctionCall';
import createNumberNode from '../../../create/NumberNode';
import createSymbolNode from '../../../create/SymbolNode';
import { FunctionHeaderItem, FunctionNode, NumberNode } from '../../../types/SyntaxTreeNodes';
import { closeTo } from '../../../utils/float-utils';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import { addPluginAuthor, addPluginDescription, addPluginFunction, createPlugin } from '../../../utils/plugin-builder';
import { integrateIntervall } from './utils';

const INTERVALLS = 128;
const nintegratePlugin = createPlugin('nintegrate');

addPluginAuthor(nintegratePlugin, 'core');
addPluginDescription(nintegratePlugin, 'adds nintegral function');

const nintegrateHeader: FunctionHeaderItem[] = [
    { type: 'function', name: 'f', evaluate: true },
    { type: 'number', name: 'start', evaluate: true },
    { type: 'number', name: 'stop', evaluate: true },
];

addPluginFunction(nintegratePlugin, {
    name: 'nintegrate',
    documentation: {
        en: {
            synopsis: 'nintegrate(f, u, v)',
            description: 'Calculates the definite integral of the function for the given limits.',
        },
    },
    function: {
        type: 'function',
        header: nintegrateHeader,
        expression: createFunctionCall(createSymbolNode('nintegrate'), [
            createSymbolNode('f'),
            createSymbolNode('start'),
            createSymbolNode('stop'),
        ]),
        evaluator: (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('nintegrate', parameters, nintegrateHeader, context);
            const f = <FunctionNode>parameterStackFrame['f'];
            const start = <NumberNode>parameterStackFrame['start'];
            const stop = <NumberNode>parameterStackFrame['stop'];

            if (f.header.length !== 1 || (f.header[0].type !== 'number' && f.header[0].type !== 'any')) {
                throw 'RuntimeError: nintegrate: invalid function header';
            }

            const value = createNumberNode(0);
            const expression = createFunctionCall(f, [value]);
            const intervallIntegrals: number[] = [];
            const leftLimit = Math.min(start.value, stop.value);
            const rightLimit = Math.max(start.value, stop.value);
            const intervallWidth = (rightLimit - leftLimit) / INTERVALLS;

            for (let i = 0; i < INTERVALLS; i++) {
                intervallIntegrals.push(
                    integrateIntervall(
                        intervallWidth * i + leftLimit,
                        intervallWidth * (i + 1) + leftLimit,
                        expression,
                        value,
                        context,
                    ),
                );
            }

            const result = intervallIntegrals.reduce((a, b) => a + b);

            if (closeTo(result, 0)) {
                return createNumberNode(0);
            }

            return createNumberNode(result);
        },
    },
});

export default nintegratePlugin;
