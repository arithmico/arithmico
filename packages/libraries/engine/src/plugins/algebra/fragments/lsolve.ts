import createEquals from '../../../node-operations/create-node/create-equals';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import createSymbolNode from '../../../node-operations/create-node/create-symbol-node';
import createVector from '../../../node-operations/create-node/create-vector';
import normalize from '../../../node-operations/normalize-node';
import serialize from '../../../node-operations/serialize-node';
import { Equals, FunctionHeaderItem, SyntaxTreeNode } from '../../../types/nodes.types';
import { isEquationLinear } from '../utils/check-linear';
import { getCoefficientMatrix, getConstantVector, getVariableNamesFromEquations } from '../utils/get-coefficients';
import { cramerSolver, det } from '../../../utils/math-utils/matrix-utils';
import { PluginFragment } from '../../../utils/plugin-builder';

const lsolveHeader: FunctionHeaderItem[] = [{ type: 'equals', name: 'equation', evaluate: false, repeat: true }];

const lsolveFragment = new PluginFragment();

__FUNCTIONS.lsolve &&
    lsolveFragment.addFunction(
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

            if (variableNames.length < equations.length) {
                throw runtimeError(
                    `Not enough variables expected ${equations.length} got ${variableNames.length
                    } (${variableNames.join(', ')})`,
                );
            } else if (variableNames.length > equations.length) {
                throw runtimeError(
                    `Too many variables expected ${equations.length} got ${variableNames.length} (${variableNames.join(
                        ', ',
                    )})`,
                );
            }

            const coefficients = getCoefficientMatrix(equations, context);
            const constants = getConstantVector(equations);
            const coefficientsDet = det(coefficients);

            const results = cramerSolver(coefficients, constants, coefficientsDet);

            if (coefficientsDet === 0) {
                if (results.every((value) => isNaN(value))) {
                    throw 'SolveError: The equation system has infinite solutions';
                } else {
                    throw 'SolveError: The equation system has no solution';
                }
            }

            return createVector(
                results.map((value, index) =>
                    createEquals(createSymbolNode(variableNames[index]), createNumberNode(value)),
                ),
            );
        },
    );

export default lsolveFragment;
