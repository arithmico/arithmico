import createEquals from '../../../../create/create-equals';
import createNumberNode from '../../../../create/create-number-node';
import createSymbolNode from '../../../../create/create-symbol-node';
import createVector from '../../../../create/create-vector';
import normalize from '../../../../normalize';
import serialize from '../../../../serialize';
import { Equals, FunctionHeaderItem, SyntaxTreeNode } from '../../../../types/SyntaxTreeNodes';
import { addPluginAuthor, addPluginDescription, createPlugin } from '../../../../utils/plugin-builder';
import { isEquationLinear } from '../utils/check-linear';
import { getCoefficientMatrix, getConstantVector, getVariableNamesFromEquations } from '../utils/get-coefficients';
import { cramerSolver, det } from '../utils/matrix-utils';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';

const lsolvePlugin = createPlugin('core/lsolve');

addPluginAuthor(lsolvePlugin, 'core');
addPluginDescription(lsolvePlugin, 'adds lsolve function');

const lsolveHeader: FunctionHeaderItem[] = [{ type: 'equals', name: 'equation', evaluate: false, repeat: true }];

const lsolveFragment = new PluginFragment().addFunction(
    'lsolve',
    lsolveHeader,
    'If possible, solve the set of linear equations.',
    'Löst, falls möglich, das lineare Gleichungssystem.',
    ({ getParameter, runtimeError, typeError, context }) => {
        const equations: Equals[] = [];
        try {
            (<SyntaxTreeNode[]>getParameter('equation'))
                .map((parameter) => normalize(parameter, context))
                .forEach((normalizedParameter) => {
                    if (normalizedParameter.type !== 'equals') {
                        throw '';
                    }
                    equations.push(normalizedParameter);
                });
        } catch (_error) {
            throw typeError('Invalid equation(s)');
        }

        equations.forEach((equation) => {
            if (!isEquationLinear(equation, context)) {
                throw runtimeError(`"${serialize(equation, context.options)}" is not linear`);
            }
        });

        const variableNames = getVariableNamesFromEquations(equations, context);

        if (variableNames.length !== equations.length) {
            throw runtimeError('Invalid number of variables');
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
);

export default lsolveFragment;
