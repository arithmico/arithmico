import { NumberNode, Power, SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import { convertOperatorChainToList } from './symbolic-utils';
import polynomial from '../plugins/core/polynomials/polynomial';

interface Monomial {
    coefficient: number;
    base: string | number;
    degree: number;
}

export function getSummands(node: SyntaxTreeNode): SyntaxTreeNode[] {
    return convertOperatorChainToList('plus', node);
}

export function getFactors(summand: SyntaxTreeNode): SyntaxTreeNode[] {
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

function getSummandDegree(summand: SyntaxTreeNode): number {
    const powerParts = convertOperatorChainToList('power', summand);
    const degrees = <NumberNode[]>powerParts.filter((factor) => factor.type === 'number');

    if (degrees.length === 0) {
        return 0;
    }

    if (degrees.length === 1) {
        return degrees[0].value;
    }

    throw 'RuntimeError: multiple degrees';
}

function getSummandBase(summand: SyntaxTreeNode) {
    const powerParts = convertOperatorChainToList('power', summand);
    const bases = <NumberNode[]>powerParts.filter((factor) => factor.type === 'symbol');

    if (bases.length === 0) {
        return 0;
    }

    if (bases.length === 1) {
        return bases[0].value;
    }

    throw 'RuntimeError: multiple degrees';

}

export function isPolynomialValid(node: SyntaxTreeNode) {
    return false;
}

export function getPolynomial(node: SyntaxTreeNode): Monomial[] {
    const summands = getSummands(node);

    return summands.map(
        (summand) =>
            <Monomial>{
                coefficient: getSummandCoefficient(summand),
                base: getSummandBase(summand),
                degree: getSummandDegree(summand),
            },
    );
}
