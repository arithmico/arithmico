import {
    addMissingMonomialsWithCoefficientZero,
    compareMonomialsByDegree,
    createConstantMonomial,
    createNonConstantMonomial,
    divideMonomials,
    getMonomialDegree,
    haveMonomialsSameBase,
    Monomial,
    multiplyMonomials,
    Polynomial,
    removeMonomialsWithCoefficientZero,
} from '../../../../utils/polynomial-type-utils';

export function getDegreeFromPolynomial(polynomial: Polynomial): number {
    if (polynomial.length === 0) {
        throw 'RuntimeError: Internal polynomial is not correct';
    }

    const highestMonomial = polynomial[0];

    return highestMonomial.type === 'constant' ? 0 : highestMonomial.degree;
}

function calculatePolynomialSumOrDifference(
    leftPolynomial: Polynomial,
    rightPolynomial: Polynomial,
    isDifference: boolean,
): Polynomial {
    let result: Polynomial = [];

    const reverseSort = (a: Monomial, b: Monomial) => -compareMonomialsByDegree(a, b);

    const reversedLeftPolynomial = [...leftPolynomial].sort(reverseSort);
    let reversedRightPolynomial = [...rightPolynomial].sort(reverseSort);

    while (reversedLeftPolynomial.length > 0 && reversedRightPolynomial.length > 0) {
        const latestElementP = reversedLeftPolynomial.at(-1);
        const latestElementQ = reversedRightPolynomial.at(-1);

        if (getMonomialDegree(latestElementP) > getMonomialDegree(latestElementQ)) {
            result.push(reversedLeftPolynomial.pop());
        } else if (getMonomialDegree(latestElementP) < getMonomialDegree(latestElementQ)) {
            result.push(reversedRightPolynomial.pop());
        } else if (getMonomialDegree(latestElementP) === getMonomialDegree(latestElementQ)) {
            reversedRightPolynomial = reversedRightPolynomial.filter((monomial) => {
                if (
                    haveMonomialsSameBase(latestElementP, monomial) &&
                    getMonomialDegree(latestElementP) === getMonomialDegree(monomial)
                ) {
                    const calculatedCoefficient =
                        latestElementP.coefficient + (isDifference ? -monomial.coefficient : +monomial.coefficient);

                    if (monomial.type === 'non-constant') {
                        result.push(createNonConstantMonomial(calculatedCoefficient, monomial.base, monomial.degree));
                    }

                    if (monomial.type === 'constant') {
                        result.push(createConstantMonomial(calculatedCoefficient));
                    }

                    reversedLeftPolynomial.pop();
                    return false;
                }
                return true;
            });
        }
    }

    result = result.concat(reversedLeftPolynomial, reversedRightPolynomial);
    return removeMonomialsWithCoefficientZero(result);
}

export function calculatePolynomialAddition(p: Polynomial, q: Polynomial) {
    return calculatePolynomialSumOrDifference(p, q, false);
}

export function calculatePolynomialSubtraction(p: Polynomial, q: Polynomial) {
    return calculatePolynomialSumOrDifference(p, q, true);
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
