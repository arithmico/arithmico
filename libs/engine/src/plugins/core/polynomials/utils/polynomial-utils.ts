import {
    addMissingMonomialsWithCoefficientZero,
    compareMonomials,
    createConstantMonomial,
    createNonConstantMonomial,
    divideMonomials,
    getMonomialDegree,
    haveMonomialsSameBase,
    Monomial,
    multiplyMonomials,
    NonConstant,
    Polynomial,
    removeMonomialsWithCoefficientZero,
} from '../../../../utils/polynomial-type-utils';

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
        const combinedMonomial =
            degree !== 0
                ? createNonConstantMonomial(
                      existingMonomial.coefficient + monomial.coefficient,
                      (<NonConstant>existingMonomial).base,
                      (<NonConstant>existingMonomial).degree,
                  )
                : createConstantMonomial(existingMonomial.coefficient + monomial.coefficient);
        result[existingMonomialIndex] = combinedMonomial;
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
