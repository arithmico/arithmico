import {
    compareMonomialsDegreeEqual,
    compareMonomialsDegreeGreater,
    compareMonomialsDegreeSmaller,
    createConstantMonomial,
    createNonConstantMonomial,
    divideMonomials,
    fillPolynomialWithZeros,
    haveMonomialsSameBase,
    multiplyMonomials,
    Polynomial,
    removeZerosFromPolynomial,
    sortMonomialsByDegree,
} from '../../../../utils/polynomial-type-utils';

export function getDegreeFromPolynomial(p: Polynomial): number {
    const highestMonomial = p[0];

    if (highestMonomial === null) {
        throw "RuntimeError: internally Polynomial isn't correct!";
    }

    if (highestMonomial.type === 'constant') {
        return 0;
    } else {
        return highestMonomial.degree;
    }
}

function calculatePolynomialDash(p: Polynomial, q: Polynomial, minus: boolean): Polynomial {
    let result: Polynomial = [];

    const copiedP = p.slice().sort((a, b) => -1 * sortMonomialsByDegree(a, b));
    let copiedQ = q.slice().sort((a, b) => -1 * sortMonomialsByDegree(a, b));

    while (copiedP.length > 0 && copiedQ.length > 0) {
        const latestElementP = copiedP.at(-1);
        const latestElementQ = copiedQ.at(-1);

        if (compareMonomialsDegreeGreater(latestElementP, latestElementQ)) {
            result.push(copiedP.pop());
            continue;
        }

        if (compareMonomialsDegreeSmaller(latestElementP, latestElementQ)) {
            result.push(copiedQ.pop());
            continue;
        }

        if (compareMonomialsDegreeEqual(latestElementP, latestElementQ)) {
            copiedQ = copiedQ.filter((m) => {
                if (haveMonomialsSameBase(latestElementP, m) && compareMonomialsDegreeEqual(latestElementP, m)) {
                    const calculatedCoefficient = minus
                        ? latestElementP.coefficient - m.coefficient
                        : latestElementP.coefficient + m.coefficient;

                    if (m.type === 'non-constant') {
                        result.push(createNonConstantMonomial(calculatedCoefficient, m.base, m.degree));
                    }

                    if (m.type === 'constant') {
                        result.push(createConstantMonomial(calculatedCoefficient));
                    }

                    copiedP.pop();
                    return false;
                } else {
                    return true;
                }
            });
        }
    }

    if (copiedP.length !== 0) {
        result = result.concat(copiedP);
    }
    if (copiedQ.length !== 0) {
        result = result.concat(copiedQ);
    }

    return removeZerosFromPolynomial(result);
}

export function calculatePolynomialAddition(p: Polynomial, q: Polynomial) {
    return calculatePolynomialDash(p, q, false);
}

export function calculatePolynomialSubtraction(p: Polynomial, q: Polynomial) {
    return calculatePolynomialDash(p, q, true);
}

export function calculatePolynomialMultiplication(p: Polynomial, q: Polynomial): Polynomial {
    const multipliedPolynomials: Polynomial[] = [];
    const [shortestPolynomial, longestPolynomial] = p.length <= q.length ? [p, q] : [q, p];

    shortestPolynomial.forEach((mp) => {
        const multipliedMonomials: Polynomial = [];
        longestPolynomial.forEach((mq) => multipliedMonomials.push(multiplyMonomials(mp, mq)));
        multipliedPolynomials.push(multipliedMonomials);
    });

    return multipliedPolynomials.reduce(calculatePolynomialAddition);
}

export function calculatePolynomialDivision(p: Polynomial, q: Polynomial): [Polynomial, Polynomial] {
    let quotient: Polynomial = [createConstantMonomial(0)];
    let remainder: Polynomial = fillPolynomialWithZeros(p.slice());
    const divisor = q.slice();

    while (
        !(remainder.length === 1 && remainder[0].type === 'constant' && remainder[0].coefficient === 0) &&
        getDegreeFromPolynomial(remainder) >= getDegreeFromPolynomial(divisor)
    ) {
        const temp: Polynomial = [divideMonomials(remainder[0], divisor[0])];
        quotient = calculatePolynomialAddition(quotient, temp);
        remainder = calculatePolynomialSubtraction(remainder, calculatePolynomialMultiplication(temp, divisor));
    }

    return [quotient, remainder];
}
