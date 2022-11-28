import { Context, Equals, SyntaxTreeNode } from '../../../../types';
import { containsVariables, getVariableNames } from '../../../../utils/symbolic-utils';
import { getFactors, getSummands } from './polynomial-syntax-tree-utils';

function isSummandLinear(summand: SyntaxTreeNode, context: Context): boolean {
    const factors = getFactors(summand);

    if (!containsVariables(summand, context)) {
        return true;
    }

    if (getVariableNames(summand, context).length > 1) {
        return false;
    }

    return factors.every((factor) => {
        if (!containsVariables(factor, context)) {
            return true;
        }

        if (getVariableNames(factor, context).length > 1) {
            return false;
        }

        if (
            factor.type === 'power' &&
            containsVariables(factor.left, context) &&
            (factor.right.type !== 'number' || factor.right.value !== 1)
        ) {
            return false;
        }

        return true;
    });
}

export function isEquationLinear(equation: Equals, context: Context): boolean {
    return getSummands(equation.left).every((summand) => isSummandLinear(summand, context));
}
