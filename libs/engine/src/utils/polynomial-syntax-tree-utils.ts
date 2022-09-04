import { NumberNode, SymbolNode, SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import { convertOperatorChainToList } from './symbolic-utils';
import createTimes from '../create/create-times';
import createNumberNode from '../create/create-number-node';
import createPower from '../create/create-power';
import createSymbolNode from '../create/create-symbol-node';
import createPlus from '../create/create-plus';

export type Polynomial = Monomial[];

type Monomial = NonConstant | Constant;

export interface NonConstant {
    type: 'monomial';
    coefficient: number;
    base: string;
    degree: number;
}

export interface Constant {
    type: 'constant';
    coefficient: number;
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
    return factors.every(
        (summand) =>
            getMonomialBaseFromSummand(summand) === symbol ||
            (getMonomialDegreeFromSummand(summand) === 0 && getMonomialBaseFromSummand(summand)) === '',
    );
}

export function isPolynomialMathematicallyValid(node: SyntaxTreeNode) {
    const factors = getSummands(node);

    if (!isPolynomialDegreeValid(factors)) {
        return false;
    }

    return isEveryPolynomialBaseSame(factors);
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

export function sortPolynomialByDegree(a: Monomial, b: Monomial): number {
    if (a.type === 'monomial' && b.type === 'monomial') {
        return b.degree - a.degree;
    }

    if (a.type === 'constant' && b.type === 'monomial') {
        return 1;
    }

    if (a.type === 'monomial' && b.type === 'constant') {
        return -1;
    }
}

function getSyntaxTreeNodeFromMonomial(monomial: Monomial): SyntaxTreeNode {
    if (monomial.type === 'constant') {
        return createNumberNode(monomial.coefficient);
    }

    if (monomial.type === 'monomial' && monomial.degree === 1) {
        return createTimes(createNumberNode(monomial.coefficient), createSymbolNode(monomial.base));
    }

    if (monomial.type === 'monomial' && monomial.degree > 1) {
        return createTimes(
            createNumberNode(monomial.coefficient),
            createPower(createSymbolNode(monomial.base), createNumberNode(monomial.degree)),
        );
    }
}

export function getSyntaxTreeNodeFromPolynomial(polynomial: Polynomial): SyntaxTreeNode {
    const firstMonomial = getSyntaxTreeNodeFromMonomial(polynomial[0]);

    if (polynomial.length === 1) {
        return firstMonomial;
    }

    let currentSyntaxTreeNode = firstMonomial;
    for (let i = 1; i < polynomial.length; i++) {
        const newSyntaxTreeNode = getSyntaxTreeNodeFromMonomial(polynomial[i]);
        currentSyntaxTreeNode = createPlus(currentSyntaxTreeNode, newSyntaxTreeNode);
    }
    return currentSyntaxTreeNode;
}
