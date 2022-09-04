import { NumberNode, SymbolNode, SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import { convertOperatorChainToList } from './symbolic-utils';
import { Constant, NonConstant, Polynomial, sortPolynomialByDegree } from './polynomial-type-utils';

export function getSummands(node: SyntaxTreeNode): SyntaxTreeNode[] {
    return convertOperatorChainToList('plus', node);
}

export function getFactors(summand: SyntaxTreeNode): SyntaxTreeNode[] {
    return convertOperatorChainToList('times', summand);
}

export function getMonomialCoefficientFromSummand(summand: SyntaxTreeNode): number {
    const factors = getFactors(summand);
    const coefficients = <NumberNode[]>factors.filter((factor) => factor.type === 'number');

    if (coefficients.length === 0) {
        return 1;
    }

    if (coefficients.length === 1) {
        return coefficients[0].value;
    }

    if (isSummandConstant(summand) && factors[0].type === 'number') {
        return factors[0].value;
    }

    throw 'RuntimeError: multiple coefficients';
}

function isSummandLinear(summand: SyntaxTreeNode) {
    const factors = getFactors(summand);
    return (
        (factors.length === 1 && summand.type !== 'times' && factors[0].type === 'symbol') ||
        (factors.length === 2 && factors[1].type !== 'power' && factors[1].type === 'symbol')
    );
}

function isSummandConstant(summand: SyntaxTreeNode) {
    const factors = getFactors(summand);
    return (
        (factors.length === 1 && summand.type !== 'times' && factors[0].type === 'number') ||
        (factors.length === 2 && summand.type === 'times' && factors[1].type === 'number' && factors[1].value === 1)
    );
}

function getMonomialDegreeFromSummand(summand: SyntaxTreeNode): number {
    const factors = getFactors(summand);

    if (isSummandLinear(summand)) {
        return 1;
    }
    if (isSummandConstant(summand)) {
        return;
    }

    const degrees: NumberNode[] = <NumberNode[]>(
        convertOperatorChainToList('power', factors[1]).filter((factor) => factor.type === 'number')
    );

    if (degrees.length === 1) {
        return degrees[0].value;
    }

    throw 'RuntimeError: multiple degrees';
}

function getMonomialBaseFromSummand(summand: SyntaxTreeNode) {
    const factors = getFactors(summand);

    if (isSummandLinear(summand)) {
        if (factors.length === 2 && factors[1].type === 'symbol') {
            return factors[1].name;
        }

        if (factors.length === 1 && factors[0].type === 'symbol') {
            return factors[0].name;
        }
    }

    if (isSummandConstant(summand)) {
        return;
    }

    const bases = <SymbolNode[]>(
        convertOperatorChainToList('power', factors[1]).filter((factor) => factor.type === 'symbol')
    );

    if (bases.length === 1) {
        return bases[0].name;
    }

    throw 'RuntimeError: multiple bases';
}

function isPolynomialDegreeValid(factors: SyntaxTreeNode[]) {
    return factors.every(
        (summand) => getMonomialDegreeFromSummand(summand) >= 0 && getMonomialDegreeFromSummand(summand) % 1 === 0,
    );
}

function isEveryPolynomialBaseSame(factors: SyntaxTreeNode[]) {
    const symbol = getMonomialBaseFromSummand(factors[0]);
    return factors.every((summand) => getMonomialBaseFromSummand(summand) === symbol || isSummandConstant(summand));
}

export function isPolynomialMathematicallyValid(node: SyntaxTreeNode) {
    const summands = getSummands(node);

    if (!isPolynomialDegreeValid(summands)) {
        return false;
    }

    return isEveryPolynomialBaseSame(summands);
}

export function getPolynomial(node: SyntaxTreeNode): Polynomial {
    const summands = getSummands(node);

    return summands
        .map((factor) => {
            if (isSummandConstant(factor)) {
                return <Constant>{ type: 'constant', coefficient: getMonomialCoefficientFromSummand(factor) };
            } else {
                return <NonConstant>{
                    type: 'monomial',
                    coefficient: getMonomialCoefficientFromSummand(factor),
                    base: getMonomialBaseFromSummand(factor),
                    degree: getMonomialDegreeFromSummand(factor),
                };
            }
        })
        .sort((a, b) => sortPolynomialByDegree(a, b));
}
