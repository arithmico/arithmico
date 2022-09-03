import { Polynomial, sortPolynomialByDegree } from '../../../../utils/polynomial-syntax-tree-utils';

export function getDegreeFromPolynomial(p: Polynomial): number {
    const highestMonomial = p.sort((a, b) => sortPolynomialByDegree(a, b))[0];

    if (highestMonomial === null) {
        throw "Polynomial isn't correct!";
    }

    if (highestMonomial.type === 'constant') {
        return 0;
    } else {
        return highestMonomial.degree;
    }
}

export function calculatePolynomialSum(p: Polynomial, q: Polynomial): Polynomial {
    /*
    const result: Polynomial = [];

    let pCounter = 0;
    let qCounter = 0;

    while (pCounter < p.length && qCounter < q.length) {
        if (p[pCounter].degree > q[qCounter].degree) {
            result.push(p[pCounter]);
            pCounter++;
        }

        if (p[pCounter].degree < q[qCounter].degree) {
            result.push(q[qCounter]);
            qCounter++;
        }

        if (p[pCounter].degree === q[qCounter].degree) {
            const qMonomialsSameDegree = q.filter((m) => m.degree === p[pCounter].degree);
            const qMonomialsSameBase = qMonomialsSameDegree.filter((m) => p[pCounter].base === m.base);

            if (qMonomialsSameBase.length === 1) {
                result.push({
                    coefficient: p[pCounter].coefficient + q[qCounter].coefficient,
                    base: p[pCounter].base,
                    degree: p[pCounter].degree,
                });
                pCounter++;
            } else {
                throw 'RuntimeError: calculatePolynomialSum: multiple elements with same base and degree';
            }
        }

        if (pCounter !== p.length - 1) {
            return result.concat(p.slice(pCounter, p.length));
        }
        if (qCounter !== q.length - 1) {
            return result.concat(q.slice(pCounter, q.length));
        }
    }
     */
    return null;
}
