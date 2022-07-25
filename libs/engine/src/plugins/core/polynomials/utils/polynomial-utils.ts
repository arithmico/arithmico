import { Monomial } from '../../../../utils/polynomial-syntax-tree-utils';

export function getDegreeFromPolynomial(p: Monomial[]): number {
    return p.sort((a, b) => b.degree - a.degree)[0].degree;
}

export function calculatePolynomialSum(p: Monomial[], q: Monomial[]): Monomial[] {
    const result: Monomial[] = [];

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
}
