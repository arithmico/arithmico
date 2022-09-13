import { SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import createPlus from '../create/create-plus';
import createNumberNode from '../create/create-number-node';
import createTimes from '../create/create-times';
import createSymbolNode from '../create/create-symbol-node';
import createPower from '../create/create-power';
import { getDegreeFromPolynomial } from '../plugins/core/polynomials/utils/polynomial-utils';
import createNegate from '../create/create-negate';

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
    coefficient: number;
}

export function createNonConstantMonomial(coefficient: number, base: string, degree: number) {
    return <NonConstant>{
        type: 'non-constant',
        coefficient: coefficient,
        base: base,
        degree: degree,
    };
}

export function createConstantMonomial(coefficient: number) {
    return <Constant>{
        type: 'constant',
        coefficient: coefficient,
    };
}

export function sortMonomialsByDegree(a: Monomial, b: Monomial): number {
    if (compareMonomialsDegreeEqual(a, b)) {
        return 0;
    }

    if (compareMonomialsDegreeSmaller(a, b)) {
        return 1;
    }

    if (compareMonomialsDegreeGreater(a, b)) {
        return -1;
    }
}

export function compareMonomialsDegreeGreater(a: Monomial, b: Monomial) {
    return (
        (a.type === 'non-constant' && b.type === 'non-constant' && a.degree > b.degree) ||
        (a.type === 'non-constant' && b.type === 'constant')
    );
}

export function compareMonomialsDegreeSmaller(a: Monomial, b: Monomial) {
    return (
        (a.type === 'non-constant' && b.type === 'non-constant' && a.degree < b.degree) ||
        (a.type === 'constant' && b.type === 'non-constant')
    );
}

export function compareMonomialsDegreeEqual(a: Monomial, b: Monomial) {
    return (
        (a.type === 'non-constant' && b.type === 'non-constant' && a.degree === b.degree) ||
        (a.type === 'constant' && b.type === 'constant')
    );
}

export function haveMonomialsSameBase(a: Monomial, b: Monomial) {
    return (
        (a.type === 'non-constant' && b.type === 'non-constant' && a.base === b.base) ||
        (a.type === 'constant' && b.type === 'constant')
    );
}

function getSyntaxTreeNodeFromMonomial(monomial: Monomial): SyntaxTreeNode {
    if (monomial.type === 'constant') {
        return createNumberNode(monomial.coefficient);
    }

    if (monomial.type === 'non-constant' && monomial.degree === 1) {
        switch (monomial.coefficient) {
            case 1:
                return createSymbolNode(monomial.base);
            case -1:
                return createNegate(createSymbolNode(monomial.base));
            default:
                return createTimes(createNumberNode(monomial.coefficient), createSymbolNode(monomial.base));
        }
    }

    if (monomial.type === 'non-constant' && monomial.degree > 1) {
        switch (monomial.coefficient) {
            case 1:
                return createPower(createSymbolNode(monomial.base), createNumberNode(monomial.degree));
            case -1:
                return createNegate(createPower(createSymbolNode(monomial.base), createNumberNode(monomial.degree)));
            default:
                return createTimes(
                    createNumberNode(monomial.coefficient),
                    createPower(createSymbolNode(monomial.base), createNumberNode(monomial.degree)),
                );
        }
    }
}

export function getSyntaxTreeNodeFromPolynomial(polynomial: Polynomial): SyntaxTreeNode {
    return polynomial.map(getSyntaxTreeNodeFromMonomial).reduce(createPlus);
}

export function multiplyMonomials(mp: Monomial, mq: Monomial) {
    if (mp.type === 'non-constant' && mq.type === 'non-constant') {
        return createNonConstantMonomial(mp.coefficient * mq.coefficient, mp.base, mp.degree + mq.degree);
    }

    if (mp.type === 'non-constant' && mq.type === 'constant') {
        return createNonConstantMonomial(mp.coefficient * mq.coefficient, mp.base, mp.degree);
    }

    if (mp.type === 'constant' && mq.type === 'non-constant') {
        return createNonConstantMonomial(mp.coefficient * mq.coefficient, mq.base, mq.degree);
    }

    if (mp.type === 'constant' && mq.type === 'constant') {
        return createConstantMonomial(mp.coefficient * mq.coefficient);
    }
}

export function divideMonomials(mp: Monomial, mq: Monomial) {
    if (mp.type === 'non-constant' && mq.type === 'non-constant' && mp.degree > mq.degree) {
        return createNonConstantMonomial(mp.coefficient / mq.coefficient, mp.base, mp.degree - mq.degree);
    }

    if (mp.type === 'non-constant' && mq.type === 'non-constant' && mp.degree === mq.degree) {
        return createConstantMonomial(mp.coefficient / mq.coefficient);
    }

    if (mp.type === 'non-constant' && mq.type === 'constant') {
        return createNonConstantMonomial(mp.coefficient / mq.coefficient, mp.base, mp.degree);
    }
}

export function fillPolynomialWithZeros(p: Polynomial) {
    const copiedP = p.slice();
    const base = p.length === 1 && p[0].type === 'constant' ? null : (<NonConstant>p[0]).base;
    const newMonomials = [];

    for (let i = 0, currentDegree = getDegreeFromPolynomial(p); currentDegree >= 0; currentDegree--) {
        const monomial = copiedP[i];

        if (
            (monomial.type === 'non-constant' && monomial.degree === currentDegree) ||
            (monomial.type === 'constant' && currentDegree === 0)
        ) {
            i === p.length - 1 ? (i = p.length - 1) : i++;
            continue;
        }

        if (monomial.type === 'non-constant' && monomial.degree !== currentDegree) {
            newMonomials.push(createNonConstantMonomial(0, base, currentDegree));
            continue;
        }

        if (currentDegree === 0 && copiedP.at(-1).type !== 'constant') {
            newMonomials.push(createConstantMonomial(0));
        }
    }
    return copiedP.concat(newMonomials).sort(sortMonomialsByDegree);
}

export function removeZerosFromPolynomial(p: Polynomial) {
    const copiedP = p.slice().filter((m) => m.coefficient !== 0);
    return copiedP.length === 0 ? [createConstantMonomial(0)] : copiedP;
}
