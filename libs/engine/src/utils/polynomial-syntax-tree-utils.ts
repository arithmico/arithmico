import { NumberNode, SymbolNode, SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import { convertOperatorChainToList } from './symbolic-utils';
import {
    createConstantMonomial,
    createNonConstantMonomial,
    Polynomial,
    sortMonomialsByDegree,
} from './polynomial-type-utils';

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
        return 0;
    }

    const degrees: NumberNode[] = <NumberNode[]>(
        convertOperatorChainToList('power', factors.length === 1 ? factors[0] : factors[1]).filter(
            (factor) => factor.type === 'number',
        )
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
        convertOperatorChainToList('power', factors.length === 1 ? factors[0] : factors[1]).filter(
            (factor) => factor.type === 'symbol',
        )
    );

    if (bases.length === 1) {
        return bases[0].name;
    }

    throw 'RuntimeError: multiple bases';
}

export function isPolynomialDegreeValid(node: SyntaxTreeNode) {
    const summands = getSummands(node);
    return summands.every((summand) => {
        const degree = getMonomialDegreeFromSummand(summand);
        return degree >= 0 && degree % 1 === 0;
    });
}

export function isEveryPolynomialBaseSame(node: SyntaxTreeNode) {
    const summands = getSummands(node);
    if (summands.length === 1) {
        return isSummandConstant(summands[0]) || getMonomialBaseFromSummand(summands[0]) !== undefined;
    }

    if (summands.length >= 2) {
        const symbol = getMonomialBaseFromSummand(summands[1]);
        return summands.every(
            (summand) => getMonomialBaseFromSummand(summand) === symbol || isSummandConstant(summand),
        );
    }

    return false;
}

export function getPolynomial(node: SyntaxTreeNode): Polynomial {
    return getSummands(node)
        .map((summand) => {
            return isSummandConstant(summand)
                ? createConstantMonomial(getMonomialCoefficientFromSummand(summand))
                : createNonConstantMonomial(
                      getMonomialCoefficientFromSummand(summand),
                      getMonomialBaseFromSummand(summand),
                      getMonomialDegreeFromSummand(summand),
                  );
        })
        .sort(sortMonomialsByDegree);
}
