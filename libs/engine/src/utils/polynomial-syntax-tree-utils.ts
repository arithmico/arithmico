import { NumberNode, SymbolNode, SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import { convertOperatorChainToList } from './symbolic-utils';
import createTimes from '../create/create-times';
import createNumberNode from '../create/create-number-node';
import createPower from '../create/create-power';
import createSymbolNode from '../create/create-symbol-node';
import createPlus from '../create/create-plus';

export interface Monomial {
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
    const summandParts = convertOperatorChainToList('times', summand);
    return summandParts.length === 2 && summandParts[1].type !== 'power' && summandParts[1].type === 'symbol';
}

function isSummandConstant(summand: SyntaxTreeNode) {
    const factors = convertOperatorChainToList('times', summand);
    return (
        (factors.length === 1 && summand.type !== 'times' && factors[0].type === 'number') ||
        (factors.length === 2 &&
            summand.type === 'times' &&
            factors[1].type === 'number' &&
            factors[1].value === 1)
    );
}

function getMonomialDegreeFromSummand(summand: SyntaxTreeNode): number {
    const factors = convertOperatorChainToList('times', summand);

    if (isSummandLinear(summand)) {
        return 1;
    }
    if (isSummandConstant(summand)) {
        return 0;
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
    const factors = convertOperatorChainToList('times', summand);

    if (isSummandLinear(summand) && factors[1].type === 'symbol') {
        return factors[1].name;
    }
    if (isSummandConstant(summand)) {
        return '';
    }

    const bases: SymbolNode[] = <SymbolNode[]>(
        convertOperatorChainToList('power', factors[1]).filter((factor) => factor.type === 'symbol')
    );

    if (bases.length === 1) {
        return bases[0].name;
    }

    throw 'RuntimeError: multiple bases';
}

function isPolynomialDegreeValid(factors: SyntaxTreeNode[]) {
    return factors.every((summand) => getMonomialDegreeFromSummand(summand) >= 0 && getMonomialDegreeFromSummand(summand) % 1 === 0);
}

function isEveryPolynomialBaseSame(factors: SyntaxTreeNode[]) {
    const symbol = getMonomialBaseFromSummand(factors[0]);
    return factors.every(
        (summand) =>
            getMonomialBaseFromSummand(summand) === symbol || (getMonomialDegreeFromSummand(summand) === 0 && getMonomialBaseFromSummand(summand)) === '',
    );
}

export function isPolynomialMathematicallyValid(node: SyntaxTreeNode) {
    const factors = getSummands(node);

    if (!isPolynomialDegreeValid(factors)) {
        return false;
    }

    return isEveryPolynomialBaseSame(factors);
}

export function getPolynomial(node: SyntaxTreeNode): Monomial[] {
    const summands = getSummands(node);

    return summands
        .map(
            (factor) =>
                <Monomial>{
                    coefficient: getMonomialCoefficientFromSummand(factor),
                    base: getMonomialBaseFromSummand(factor),
                    degree: getMonomialDegreeFromSummand(factor),
                },
        )
        .sort((a, b) => b.degree - a.degree);
}

function getSyntaxTreeNodeFromMonomial(monomial: Monomial): SyntaxTreeNode {
    switch (monomial.degree) {
        case 0:
            return createNumberNode(monomial.coefficient);
        case 1:
            return createTimes(
                createNumberNode(monomial.coefficient),
                typeof monomial.base === 'string' ? createSymbolNode(monomial.base) : createNumberNode(monomial.base),
            );
        default:
            return createTimes(
                createNumberNode(monomial.coefficient),
                createPower(
                    typeof monomial.base === 'string'
                        ? createSymbolNode(monomial.base)
                        : createNumberNode(monomial.base),
                    createNumberNode(monomial.degree),
                ),
            );
    }
}

export function getSyntaxTreeNodeFromPolynomial(polynomial: Monomial[]): SyntaxTreeNode {
    const firstMonomial = getSyntaxTreeNodeFromMonomial(polynomial[0]);

    if (polynomial.length === 1) {
        return firstMonomial;
    }

    let currentSyntaxTreeNode = firstMonomial;
    for (let i = 1; i < polynomial.length - 1; i++) {
        const newSyntaxTreeNode = getSyntaxTreeNodeFromMonomial(polynomial[i]);
        currentSyntaxTreeNode = createPlus(currentSyntaxTreeNode, newSyntaxTreeNode);
    }
    return currentSyntaxTreeNode;
}
