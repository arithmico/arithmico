import createEquals from '../../../create/Equals';
import createFunctionCall from '../../../create/FunctionCall';
import createNumberNode from '../../../create/NumberNode';
import createSymbolNode from '../../../create/SymbolNode';
import createVector from '../../../create/Vector';
import normalize from '../../../normalize';
import serialize from '../../../serialize';
import { Equals, FunctionHeaderItem } from '../../../types/SyntaxTreeNodes';
import { addPluginAuthor, addPluginDescription, addPluginFunction, createPlugin } from '../../../utils/plugin-builder';
import { det } from './utils/calculate-det';
import { isEquationLinear } from './utils/check-linear';
import { getCoefficientMatrix, getConstantVector, getVariableNamesFromEquations } from './utils/get-coefficients';
import { replaceColumn } from './utils/matrix-utils';

const lsolvePlugin = createPlugin('lsolve');

addPluginAuthor(lsolvePlugin, 'core');
addPluginDescription(lsolvePlugin, 'adds lsolve function');

const lsolveHeader: FunctionHeaderItem[] = [{ type: 'equals', name: 'equation', evaluate: false, repeat: true }];

addPluginFunction(lsolvePlugin, {
    name: 'lsolve',
    documentation: {
        en: {
            synopsis: 'lsolve(equation, ...)',
            description: 'If possible, solve the set of linear equations.',
        },
    },
    function: {
        type: 'function',
        header: lsolveHeader,
        expression: createFunctionCall(createSymbolNode('lsolve'), [createSymbolNode('equation+')]),
        evaluator: (parameters, context) => {
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

            equations.forEach((equation) => {
                if (!isEquationLinear(equation, context)) {
                    throw `lsolve: "${serialize(equation, context.options)}" is not linear`;
                }
            });

            const variableNames = getVariableNamesFromEquations(equations, context);

            if (variableNames.length !== equations.length) {
                throw 'RuntimeError: lsolve: invalid number of variables';
            }

            const coefficients = getCoefficientMatrix(equations, context);
            const constants = getConstantVector(equations);
            const results: Equals[] = [];
            const coefficientsDet = det(coefficients);

            if (coefficientsDet === 0) {
                throw 'SolveError: The equation system has no solution';
            }

            for (let i = 0; i < variableNames.length; i++) {
                const value = det(replaceColumn(coefficients, constants, i)) / coefficientsDet;
                results.push(createEquals(createSymbolNode(variableNames[i]), createNumberNode(value)));
            }

            return createVector(results);
        },
    },
});

export default lsolvePlugin;
