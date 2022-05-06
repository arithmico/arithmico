import createFunctionCall from '../../../create/FunctionCall';
import createNumberNode from '../../../create/NumberNode';
import createSymbolNode from '../../../create/SymbolNode';
import normalize from '../../../normalize';
import serialize from '../../../serialize';
import { Equals, FunctionHeaderItem, SyntaxTreeNode } from '../../../types/SyntaxTreeNodes';
import { addPluginAuthor, addPluginDescription, addPluginFunction, createPlugin } from '../../../utils/plugin-builder';
import { isEquationLinear } from './utils/check-linear';

const lsolvePlugin = createPlugin('lsolve');

addPluginAuthor(lsolvePlugin, 'core');
addPluginDescription(lsolvePlugin, 'adds lsolve function');

const lsolveHeader: FunctionHeaderItem[] = [{ type: 'equals', name: 'equation', evaluate: false, repeat: true }];

addPluginFunction(lsolvePlugin, {
    name: 'lsolve',
    documentation: {
        en: {
            synopsis: 'lsolve(equation+)',
            description: 'If possible, solve the set of equations.',
        },
    },
    function: {
        type: 'function',
        header: lsolveHeader,
        expression: createFunctionCall(createSymbolNode('lsolve'), [createSymbolNode('equation+')]),
        evaluator: (parameters, context) => {
            // validate parameters
            const equations: Equals[] = [];
            try {
                parameters
                    .map((parameter) => normalize(parameter, context))
                    .forEach((normalizedParameter) => {
                        if (normalizedParameter.type !== 'equals') {
                            throw '';
                        }
                        equations.push(normalizedParameter);
                    });
            } catch (_error) {
                throw 'lsolve: invalid equation(s)';
            }

            equations.forEach(equation => {
                if (!isEquationLinear(equation, context)) {
                    throw `lsolve: "${serialize(equation, context.options)}" is not linear`
                }
            })

            return createNumberNode(0);
        },
    },
});
