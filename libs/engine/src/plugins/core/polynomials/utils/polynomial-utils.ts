import {
    compareMonomialsDegreeEqual,
    compareMonomialsDegreeGreater,
    compareMonomialsDegreeSmaller,
    Constant,
    divideMonomials,
    fillPolynomialWithZero,
    haveMonomialsSameBase,
    multiplyMonomials,
    NonConstant,
    Polynomial,
    removeZerosFromPolynomial,
    sortMonomialsByDegree,
} from '../../../../utils/polynomial-type-utils';

export function getDegreeFromPolynomial(p: Polynomial): number {
    const highestMonomial = p.sort(sortMonomialsByDegree)[0];

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

        if (
            compareMonomialsDegreeEqual(latestElementP, latestElementQ) &&
            haveMonomialsSameBase(latestElementP, latestElementQ)
        ) {
            if (latestElementP.type === 'monomial') {
                result.push(<NonConstant>{
                    type: 'monomial',
                    coefficient: minus
                        ? latestElementP.coefficient - latestElementQ.coefficient
                        : latestElementP.coefficient + latestElementQ.coefficient,
                    base: (<NonConstant>latestElementP).base,
                    degree: (<NonConstant>latestElementP).degree,
                });
            }
            if (latestElementP.type === 'constant') {
                result.push(<Constant>{
                    type: 'constant',
                    coefficient: minus
                        ? latestElementP.coefficient - latestElementQ.coefficient
                        : latestElementP.coefficient + latestElementQ.coefficient,
                });
            }
            copiedP.pop();
            copiedQ.pop();
            continue;
        }

        if (
            compareMonomialsDegreeEqual(latestElementQ, latestElementQ) &&
            !haveMonomialsSameBase(latestElementP, latestElementQ)
        ) {
            copiedQ = copiedQ.filter((m) => {
                if (haveMonomialsSameBase(latestElementP, m) && compareMonomialsDegreeEqual(latestElementP, m)) {
                    result.push(<NonConstant>{
                        type: 'monomial',
                        coefficient: minus
                            ? latestElementP.coefficient - m.coefficient
                            : latestElementP.coefficient + m.coefficient,
                        base: (<NonConstant>m).base,
                        degree: (<NonConstant>m).degree,
                    });
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

    const copiedP = p.slice();
    const copiedQ = q.slice();

    copiedP.forEach((mp) => {
        const multipliedMonomials: Polynomial = [];
        copiedQ.forEach((mq) => multipliedMonomials.push(multiplyMonomials(mp, mq)));
        multipliedPolynomials.push(multipliedMonomials);
    });

    return multipliedPolynomials.reduce(calculatePolynomialAddition).sort(sortMonomialsByDegree);
}

export function calculatePolynomialDivision(p: Polynomial, q: Polynomial): [Polynomial, Polynomial] {
    let quotient: Polynomial = [<Constant>{ type: 'constant', coefficient: 0 }];
    let remainder: Polynomial = fillPolynomialWithZero(p.slice());
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
