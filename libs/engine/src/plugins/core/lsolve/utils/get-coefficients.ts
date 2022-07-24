import createNumberNode from '../../../../create/create-number-node';
import { Context, Equals, NumberNode } from '../../../../types';
import { getVariableNames } from '../../../../utils/symbolic-utils';
import { getSummandCoefficient, getSummands } from '../../../../utils/polynomial-syntax-tree-utils';

export function getVariableNamesFromEquations(equations: Equals[], context: Context): string[] {
    return [
        ...equations.reduce(
            (variableNames, equation) => new Set([...variableNames, ...getVariableNames(equation, context)]),
            new Set<string>(),
        ),
    ];
}

export function getCoefficientMatrix(equations: Equals[], context: Context): number[][] {
    const variableNames = getVariableNamesFromEquations(equations, context);

    return equations.map((equation) => {
        const coefficients: number[] = new Array(variableNames.length).fill(0);
        const summands = getSummands(equation.left);

        summands.forEach((summand) => {
            const variables = getVariableNames(summand, context);
            const coefficient = createNumberNode(getSummandCoefficient(summand));

            if (variables.length !== 1) {
                return;
            }

            const position = variableNames.indexOf(variables[0]);

            if (position === -1) {
                return;
            }

            coefficients[position] = coefficient.value;
        });

        return coefficients;
    });
}

export function getConstantVector(equations: Equals[]): number[] {
    return equations.map((equation) => {
        const summands = getSummands(equation.left);
        const constants = <NumberNode[]>summands.filter((summand) => summand.type === 'number');

        if (constants.length === 0) {
            return 0;
        }

        if (constants.length === 1) {
            return -constants[0].value;
        }

        throw 'RuntimeError: cannot resolve multiple constants';
    });
}
