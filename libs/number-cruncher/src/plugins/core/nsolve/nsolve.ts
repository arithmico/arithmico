import createFunctionCall from '../../../create/FunctionCall';
import createMinus from '../../../create/Minus';
import createNumberNode from '../../../create/NumberNode';
import createSymbolNode from '../../../create/SymbolNode';
import createVector from '../../../create/Vector';
import { Context, Equals, NumberNode, SyntaxTreeNode } from '../../../types';
import { FunctionHeaderItem } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import { addPluginAuthor, addPluginDescription, addPluginFunction, createPlugin } from '../../../utils/plugin-builder';
import { getVariableNames } from '../../../utils/symbolic-utils';
import checkCandidates from './utils/check-candidates';
import findCandidates from './utils/find-candidates';
import findDirectHits from './utils/find-direct-hits';
import scan from './utils/scan';

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
            const leftLimit = stackFrame.start ? (<NumberNode>stackFrame.start).value : -20;
            const rightLimit = stackFrame.stop ? (<NumberNode>stackFrame.stop).value : 20;
            const equation = <Equals>stackFrame.equation;
            const expression = createMinus(equation.left, equation.right);
            const variableNames = getVariableNames(expression, context);

            if (variableNames.length !== 1) {
                throw `RuntimeError: Invalid number of variables expected 1 got ${variableNames.length}`;
            }

            const value = createNumberNode(leftLimit);
            const localStackFrame = { [variableNames[0]]: value };
            const localContext: Context = {
                ...context,
                stack: [...context.stack, localStackFrame],
            };

            const points = scan(expression, leftLimit, rightLimit, value, localContext);
            const directHits = findDirectHits(points);
            const candidates = findCandidates(points);
            const solutions = checkCandidates(expression, candidates, value, localContext);

            const results: number[] = [];
            [...directHits, ...solutions].forEach((solution) => {
                if (!results.includes(solution)) {
                    results.push(solution);
                }
            });

            return createVector(results.sort((a, b) => a - b).map((solution) => createNumberNode(solution)));
        },
    },
    documentation: {
        en: {
            synopsis: 'nsolve(equation, start=-20, stop=20)',
            description: 'If possible, solve the equation within the limits.',
        },
        de: {
            synopsis: 'nsolve(equation, start=-20, stop=20)',
            description: 'Sucht nach Lösungen für die gegebene Gleichung in den Grenzen start und stop.',
        },
    },
});

export default nsolvePlugin;
