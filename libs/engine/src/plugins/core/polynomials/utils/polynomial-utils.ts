import {
    compareMonomialsDegreeEqual,
    compareMonomialsDegreeGreater,
    compareMonomialsDegreeSmaller,
    Constant,
    NonConstant,
    Polynomial,
    sortPolynomialByDegree,
} from '../../../../utils/polynomial-type-utils';

export function getDegreeFromPolynomial(p: Polynomial): number {
    const highestMonomial = p.sort((a, b) => sortPolynomialByDegree(a, b))[0];

    if (highestMonomial === null) {
        throw "RuntimeError: internally Polynomial isn't correct!";
    }

    if (highestMonomial.type === 'constant') {
        return 0;
    } else {
        return highestMonomial.degree;
    }
}

export function calculatePolynomialDash(p: Polynomial, q: Polynomial, minus: boolean = false): Polynomial {
    const result: Polynomial = [];

    let pCounter = 0;
    let qCounter = 0;

    while (pCounter < p.length && qCounter < q.length) {
        if (compareMonomialsDegreeGreater(p[pCounter], q[qCounter])) {
            result.push(p[pCounter]);
            pCounter++;
        }

        if (compareMonomialsDegreeSmaller(p[pCounter], q[qCounter])) {
            result.push(q[qCounter]);
            qCounter++;
        }

        if (compareMonomialsDegreeEqual(p[pCounter], q[qCounter])) {
            if (p[pCounter].type === 'monomial') {
                result.push(<NonConstant>{
                    type: 'monomial',
                    coefficient: minus
                        ? p[pCounter].coefficient - q[qCounter].coefficient
                        : p[pCounter].coefficient + q[qCounter].coefficient,
                    base: (<NonConstant>p[pCounter]).base,
                    degree: (<NonConstant>p[pCounter]).degree,
                });
            }
            if (p[pCounter].type === 'constant') {
                result.push(<Constant>{
                    type: 'constant',
                    coefficient: minus
                        ? p[pCounter].coefficient - q[qCounter].coefficient
                        : p[pCounter].coefficient + q[qCounter].coefficient,
                });
            }
            pCounter++;
            qCounter++;
        }
    }

    if (pCounter !== p.length - 1) {
        return result.concat(p.slice(pCounter, p.length));
    }
    if (qCounter !== q.length - 1) {
        return result.concat(q.slice(pCounter, q.length));
    }
    return result;
}
