import { SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import createNumberNode from '../create/create-number-node';
import createTimes from '../create/create-times';
import createSymbolNode from '../create/create-symbol-node';
import createPower from '../create/create-power';
import { getDegreeFromPolynomial } from '../plugins/core/polynomials/utils/polynomial-utils';
import createNegate from '../create/create-negate';
import { convertListToOperatorChain } from './symbolic-utils';
import createMinus from '../create/create-minus';
import createPlus from '../create/create-plus';

export type Polynomial = Monomial[];

type Monomial = NonConstant | Constant;

export interface NonConstant {
    type: 'non-constant';
    coefficient: number;
    base: string;
    degree: number;
}

export interface Constant {
    type: 'constant';
    base?: undefined;
    degree?: undefined;
    coefficient: number;
}

export function createNonConstantMonomial(coefficient: number, base: string, degree: number): NonConstant {
    return {
        type: 'non-constant',
        coefficient: coefficient,
        base: base,
        degree: degree,
    };
}

export function createConstantMonomial(coefficient: number): Constant {
    return {
        type: 'constant',
        coefficient: coefficient,
    };
}

export function compareMonomials(a: Monomial, b: Monomial): number {
    const degreeA = getMonomialDegree(a);
    const degreeB = getMonomialDegree(b);
    const degreeResult = degreeB - degreeA;
    if (degreeResult !== 0) {
        return degreeResult;
    }
    if (degreeA === 0) {
        return b.coefficient - a.coefficient;
    }
    const baseResult = a.base.localeCompare(b.base);
    if (baseResult !== 0) {
        return baseResult;
    }
    return b.coefficient - a.coefficient;
}

export function getMonomialDegree(monomial: Monomial) {
    return monomial.degree ?? 0;
}

export function haveMonomialsSameBase(a: Monomial, b: Monomial) {
    return a.base === b.base;
}

export function multiplyMonomials(leftMonomial: Monomial, rightMonomial: Monomial) {
    if (leftMonomial.type === 'non-constant' && rightMonomial.type === 'non-constant') {
        return createNonConstantMonomial(
            leftMonomial.coefficient * rightMonomial.coefficient,
            leftMonomial.base,
            leftMonomial.degree + rightMonomial.degree,
        );
    }

    if (leftMonomial.type === 'non-constant' && rightMonomial.type === 'constant') {
        return createNonConstantMonomial(
            leftMonomial.coefficient * rightMonomial.coefficient,
            leftMonomial.base,
            leftMonomial.degree,
        );
    }

    if (leftMonomial.type === 'constant' && rightMonomial.type === 'non-constant') {
        return createNonConstantMonomial(
            leftMonomial.coefficient * rightMonomial.coefficient,
            rightMonomial.base,
            rightMonomial.degree,
        );
    }

    if (leftMonomial.type === 'constant' && rightMonomial.type === 'constant') {
        return createConstantMonomial(leftMonomial.coefficient * rightMonomial.coefficient);
    }
}

export function divideMonomials(leftMonomial: Monomial, rightMonomial: Monomial) {
    if (getMonomialDegree(leftMonomial) > getMonomialDegree(rightMonomial)) {
        return createNonConstantMonomial(
            leftMonomial.coefficient / rightMonomial.coefficient,
            leftMonomial.base,
            getMonomialDegree(leftMonomial) - getMonomialDegree(rightMonomial),
        );
    }

    if (getMonomialDegree(leftMonomial) === getMonomialDegree(rightMonomial)) {
        return createConstantMonomial(leftMonomial.coefficient / rightMonomial.coefficient);
    }
}

export function addMissingMonomialsWithCoefficientZero(polynomial: Polynomial) {
    const copiedPolynomial = [...polynomial];
    const base = polynomial[0].base;
    const newMonomials = [];

    for (let i = 0, currentDegree = getDegreeFromPolynomial(polynomial); currentDegree >= 0; currentDegree--) {
        const monomial = copiedPolynomial[i];

        if (getMonomialDegree(monomial) === currentDegree && i !== polynomial.length - 1) {
            i++;
        } else if (monomial.type === 'non-constant' && monomial.degree !== currentDegree) {
            newMonomials.push(createNonConstantMonomial(0, base, currentDegree));
        } else if (currentDegree === 0 && copiedPolynomial.at(-1).type !== 'constant') {
            newMonomials.push(createConstantMonomial(0));
        }
    }
    return copiedPolynomial.concat(newMonomials).sort(compareMonomials);
}

export function removeMonomialsWithCoefficientZero(polynomial: Polynomial) {
    const copiedPolynomial = [...polynomial].filter((m) => m.coefficient !== 0);
    return copiedPolynomial.length === 0 ? [createConstantMonomial(0)] : copiedPolynomial;
}

function getSyntaxTreeNodeFromMonomial(monomial: Monomial): SyntaxTreeNode {
    const degree = getMonomialDegree(monomial);
    const positiveCoefficient = createNumberNode(monomial.coefficient);

    if (degree === 0) {
        if (monomial.coefficient < 0) {
            return createNegate(createNumberNode(-monomial.coefficient));
        }
        return positiveCoefficient;
    }

    const symbol = createSymbolNode(monomial.base);
    if (degree === 1) {
        if (Math.abs(monomial.coefficient) === 1) {
            if (monomial.coefficient < 0) {
                return createNegate(symbol);
            }
            return symbol;
        }
        if (monomial.coefficient < 0) {
            return createNegate(createTimes(createNumberNode(-monomial.coefficient), symbol));
        }

        return createTimes(positiveCoefficient, symbol);
    }

    const power = createPower(symbol, createNumberNode(monomial.degree));
    if (monomial.coefficient === 1) {
        return power;
    }
    if (monomial.coefficient === -1) {
        return createNegate(power);
    }
    if (monomial.coefficient < 0) {
        return createNegate(createTimes(createNumberNode(-monomial.coefficient), power));
    }

    return createTimes(createNumberNode(monomial.coefficient), power);
}

function beautifyPolynomial(node: SyntaxTreeNode): SyntaxTreeNode {
    if (node.type !== 'plus') {
        return node;
    }

    const leftChild = beautifyPolynomial(node.left);
    const rightChild = beautifyPolynomial(node.right);

    if (rightChild.type === 'negate') {
        return createMinus(leftChild, rightChild.value);
    }

    return createPlus(leftChild, rightChild);
}

export function getSyntaxTreeNodeFromPolynomial(polynomial: Polynomial): SyntaxTreeNode {
    const monomialList = polynomial.map(getSyntaxTreeNodeFromMonomial);
    const notBeautifiedNode = [...monomialList].reverse().reduceRight((node, monomial) => createPlus(node, monomial));
    return beautifyPolynomial(notBeautifiedNode);
}
