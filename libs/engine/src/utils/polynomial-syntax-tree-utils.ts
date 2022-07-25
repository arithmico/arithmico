import { NumberNode, SymbolNode, SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import { convertOperatorChainToList } from './symbolic-utils';
import { stringify } from 'querystring';

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

function isSummandLinear(summand: SyntaxTreeNode) {
    const summandParts = convertOperatorChainToList('times', summand);
    return summandParts.length === 2 && summandParts[1].type !== 'power' && summandParts[1].type === 'symbol';
}

function isSummandConstant(summand: SyntaxTreeNode) {
    const summandParts = convertOperatorChainToList('times', summand);
    return summandParts.length === 1 && summand.type !== 'times' && summandParts[0].type === 'number';
}

function getSummandDegree(summand: SyntaxTreeNode): number {
    const summandParts = convertOperatorChainToList('times', summand);

    if (isSummandLinear(summand)) {
        return 1;
    }
    if (isSummandConstant(summand)) {
        return 0;
    }

    const degrees: NumberNode[] = <NumberNode[]>(
        convertOperatorChainToList('power', summandParts[1]).filter((factor) => factor.type === 'number')
    );

    if (degrees.length === 1) {
        return degrees[0].value;
    }

    throw 'RuntimeError: multiple degrees';
}

function getSummandBase(summand: SyntaxTreeNode) {
    const summandParts = convertOperatorChainToList('times', summand);

    if (isSummandLinear(summand) && summandParts[1].type === 'symbol') {
        return summandParts[1].name;
    }
    if (isSummandConstant(summand)) {
        return '';
    }

    const bases: SymbolNode[] = <SymbolNode[]>(
        convertOperatorChainToList('power', summandParts[1]).filter((factor) => factor.type === 'symbol')
    );

    if (bases.length === 1) {
        return bases[0].name;
    }

    throw 'RuntimeError: there are none or multiple bases';
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
