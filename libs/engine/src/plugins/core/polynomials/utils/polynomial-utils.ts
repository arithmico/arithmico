import { Monomial } from '../../../../utils/polynomial-syntax-tree-utils';

export function getDegreeFromPolynomial(p: Monomial[]) {
    return p.sort((a, b) => b.degree - a.degree)[0];
}

export function calculatePolynomialSum(p: Monomial[], q: Monomial[]): Monomial[] {
    return null;
}
