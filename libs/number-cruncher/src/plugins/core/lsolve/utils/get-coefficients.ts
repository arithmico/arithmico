import createNumberNode from '../../../../create/create-number-node';
import { Context, Equals, NumberNode, SyntaxTreeNode } from '../../../../types';
import { getVariableNames } from '../../../../utils/symbolic-utils';
import { getFactors } from './get-factors';
import { getSummands } from './get-summands';

function getSummandCoefficient(summand: SyntaxTreeNode): NumberNode {
    const factors = getFactors(summand);
    const coefficients = <NumberNode[]>factors.filter((factor) => factor.type === 'number');

    if (coefficients.length === 0) {
        return createNumberNode(1);
    }

    if (coefficients.length === 1) {
        return coefficients[0];
    }

    throw 'RuntimeError: multiple coefficients';
}

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
        const summands = getSummands(equation);

        summands.forEach((summand) => {
            const variables = getVariableNames(summand, context);
            const coefficient = getSummandCoefficient(summand);

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
        const summands = getSummands(equation);
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
