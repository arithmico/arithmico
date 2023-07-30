import { SyntaxTreeNode } from '../../types/nodes.types';
import createNumberNode from '../../node-operations/create-node/create-number-node';
import createTimes from '../../node-operations/create-node/create-times';
import createSymbolNode from '../../node-operations/create-node/create-symbol-node';
import createPower from '../../node-operations/create-node/create-power';
import createNegate from '../../node-operations/create-node/create-negate';
import createMinus from '../../node-operations/create-node/create-minus';
import createPlus from '../../node-operations/create-node/create-plus';

export type Polynomial = Monomial[];

type Monomial = NonConstant | Constant;

interface NonConstant {
    type: 'non-constant';
    coefficient: number;
    base: string;
    degree: number;
}

interface Constant {
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

function getMonomialDegree(monomial: Monomial) {
    return monomial.degree ?? 0;
}

function haveMonomialsSameBase(a: Monomial, b: Monomial) {
    return a.base === b.base;
}

function multiplyMonomials(leftMonomial: Monomial, rightMonomial: Monomial) {
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

function divideMonomials(leftMonomial: Monomial, rightMonomial: Monomial) {
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

function addMissingMonomialsWithCoefficientZero(polynomial: Polynomial) {
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

function removeMonomialsWithCoefficientZero(polynomial: Polynomial) {
    const copiedPolynomial = [...polynomial].filter((m) => m.coefficient !== 0);
    return copiedPolynomial.length === 0 ? [createConstantMonomial(0)] : copiedPolynomial;
}

export function getDegreeFromPolynomial(polynomial: Polynomial): number {
    if (polynomial.length === 0) {
        throw 'RuntimeError: Internal polynomial is not correct';
    }

    return getMonomialDegree(polynomial[0]);
}

export function calculatePolynomialAddition(leftPolynomial: Polynomial, rightPolynomial: Polynomial) {
    const monomials = [...leftPolynomial, ...rightPolynomial].sort(compareMonomials);
    const result: Polynomial = [];

    monomials.forEach((monomial) => {
        const degree = getMonomialDegree(monomial);
        const addCandidates = result.filter(
            (resultMonomial) =>
                getMonomialDegree(resultMonomial) === degree && haveMonomialsSameBase(monomial, resultMonomial),
        );

        if (addCandidates.length === 0) {
            result.push(monomial);
            return;
        }

        const existingMonomial = addCandidates.at(0);
        const existingMonomialIndex = result.indexOf(existingMonomial);
        result[existingMonomialIndex] =
            degree !== 0
                ? createNonConstantMonomial(
                      existingMonomial.coefficient + monomial.coefficient,
                      (<NonConstant>existingMonomial).base,
                      (<NonConstant>existingMonomial).degree,
                  )
                : createConstantMonomial(existingMonomial.coefficient + monomial.coefficient);
    });

    return removeMonomialsWithCoefficientZero(result);
}

export function calculatePolynomialSubtraction(leftPolynomial: Polynomial, rightPolynomial: Polynomial) {
    return calculatePolynomialAddition(
        leftPolynomial,
        rightPolynomial.map((monomial) => ({ ...monomial, coefficient: -monomial.coefficient })),
    );
}

export function calculatePolynomialMultiplication(leftPolynomial: Polynomial, rightPolynomial: Polynomial): Polynomial {
    const multipliedPolynomials: Polynomial[] = [];
    const [shortestPolynomial, longestPolynomial] = [leftPolynomial, rightPolynomial].sort(
        (left, right) => right.length - left.length,
    );

    shortestPolynomial.forEach((shortestPolynomialItem) => {
        const multipliedMonomials: Polynomial = [];
        longestPolynomial.forEach((longestPolynomialItem) =>
            multipliedMonomials.push(multiplyMonomials(shortestPolynomialItem, longestPolynomialItem)),
        );
        multipliedPolynomials.push(multipliedMonomials);
    });

    return multipliedPolynomials.reduce(calculatePolynomialAddition);
}

export function calculatePolynomialDivision(numerator: Polynomial, denominator: Polynomial): [Polynomial, Polynomial] {
    let quotient: Polynomial = [createConstantMonomial(0)];
    let remainder: Polynomial = addMissingMonomialsWithCoefficientZero(numerator);
    const divisor = [...denominator];

    while (
        !(remainder.length === 1 && remainder[0].type === 'constant' && remainder[0].coefficient === 0) &&
        getDegreeFromPolynomial(remainder) >= getDegreeFromPolynomial(divisor)
    ) {
        const dividedMonomial: Polynomial = [divideMonomials(remainder[0], divisor[0])];
        quotient = calculatePolynomialAddition(quotient, dividedMonomial);
        remainder = calculatePolynomialSubtraction(
            remainder,
            calculatePolynomialMultiplication(dividedMonomial, divisor),
        );
    }

    return [quotient, remainder];
}

function getSyntaxTreeNodeFromMonomial(monomial: Monomial): SyntaxTreeNode {
    const degree = getMonomialDegree(monomial);
    const coefficient = monomial.coefficient;
    const positiveCoefficient = createNumberNode(monomial.coefficient);
    const negatedCoefficient = createNumberNode(-monomial.coefficient);

    if (degree === 0) {
        return coefficient < 0 ? createNegate(negatedCoefficient) : positiveCoefficient;
    }

    const symbol = createSymbolNode(monomial.base);
    if (degree === 1) {
        if (coefficient === 1) {
            return symbol;
        }
        if (coefficient === -1) {
            return createNegate(symbol);
        }
        return coefficient < 0
            ? createNegate(createTimes(negatedCoefficient, symbol))
            : createTimes(positiveCoefficient, symbol);
    }

    const power = createPower(symbol, createNumberNode(monomial.degree));
    if (coefficient === 1) {
        return power;
    }
    if (coefficient === -1) {
        return createNegate(power);
    }
    return coefficient < 0
        ? createNegate(createTimes(negatedCoefficient, power))
        : createTimes(createNumberNode(monomial.coefficient), power);
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
    const monomialList = polynomial.map(getSyntaxTreeNodeFromMonomial).reduce(createPlus);
    return beautifyPolynomial(monomialList);
}
