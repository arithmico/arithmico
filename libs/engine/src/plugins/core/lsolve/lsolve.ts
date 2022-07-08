import createEquals from '../../../create/create-equals';
import createFunctionCall from '../../../create/create-function-call';
import createNumberNode from '../../../create/create-number-node';
import createSymbolNode from '../../../create/create-symbol-node';
import createVector from '../../../create/create-vector';
import normalize from '../../../normalize';
import serialize from '../../../serialize';
import {Equals, FunctionHeaderItem} from '../../../types/SyntaxTreeNodes';
import {addPluginAuthor, addPluginDescription, addPluginFunction, createPlugin} from '../../../utils/plugin-builder';
import {isEquationLinear} from './utils/check-linear';
import {getCoefficientMatrix, getConstantVector, getVariableNamesFromEquations} from './utils/get-coefficients';
import {cramerSolver, det} from '../../../utils/matrix-utils';

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
        de: {
            synopsis: 'lsolve(equation, ...)',
            description: 'Löst, falls möglich, das lineare Gleichungssystem.',
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
            const coefficientsDet = det(coefficients);

            if (coefficientsDet === 0) {
                throw 'SolveError: The equation system has no solution';
            }

            const results = cramerSolver(coefficients, constants, coefficientsDet);

            return createVector(
                results.map((value, index) =>
                    createEquals(createSymbolNode(variableNames[index]), createNumberNode(value)),
                ),
            );
        },
    },
});

export default lsolvePlugin;
