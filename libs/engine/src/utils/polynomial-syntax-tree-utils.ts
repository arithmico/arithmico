import { NumberNode, SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import { convertOperatorChainToList } from './symbolic-utils';

export function getSummands(node: SyntaxTreeNode): SyntaxTreeNode[] {
    return convertOperatorChainToList('plus', node);
}

export function getFactors(summand: SyntaxTreeNode) {
    return convertOperatorChainToList('times', summand);
}

export function getSummandCoefficient(summand: SyntaxTreeNode): number {
    const factors = getFactors(summand);
    const coefficients = <NumberNode[]>factors.filter((factor) => factor.type === 'number');

    if (coefficients.length === 0) {
        return 1;
    }

    if (coefficients.length === 1) {
        return coefficients[0].value;
    }

    throw 'RuntimeError: multiple coefficients';
}
