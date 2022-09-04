import { SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import createPlus from '../create/create-plus';
import createNumberNode from '../create/create-number-node';
import createTimes from '../create/create-times';
import createSymbolNode from '../create/create-symbol-node';
import createPower from '../create/create-power';

export type Polynomial = Monomial[];
type Monomial = NonConstant | Constant;

export interface NonConstant {
    type: 'monomial';
    coefficient: number;
    base: string;
    degree: number;
}

export interface Constant {
    type: 'constant';
    coefficient: number;
}

export function sortPolynomialByDegree(a: Monomial, b: Monomial): number {
    if (compareMonomialsEqual(a, b)) {
        return 0;
    }

    if (compareMonomialsSmaller(a, b)) {
        return 1;
    }

    if (compareMonomialsGreater(a, b)) {
        return -1;
    }
}

export function compareMonomialsGreater(a: Monomial, b: Monomial) {
    return (
        (a.type === 'monomial' && b.type === 'monomial' && (<NonConstant>a).degree > (<NonConstant>b).degree) ||
        (a.type === 'monomial' && b.type === 'constant')
    );
}

export function compareMonomialsSmaller(a: Monomial, b: Monomial) {
    return (
        (a.type === 'monomial' && b.type === 'monomial' && (<NonConstant>a).degree < (<NonConstant>b).degree) ||
        (a.type === 'constant' && b.type === 'monomial')
    );
}

export function compareMonomialsEqual(a: Monomial, b: Monomial) {
    return (
        (a.type === 'monomial' && b.type === 'monomial' && (<NonConstant>a).degree === (<NonConstant>b).degree) ||
        (a.type === 'constant' && b.type === 'constant')
    );
}

function getSyntaxTreeNodeFromMonomial(monomial: Monomial): SyntaxTreeNode {
    if (monomial.type === 'constant') {
        return createNumberNode(monomial.coefficient);
    }

    if (monomial.type === 'monomial' && monomial.degree === 1) {
        return createTimes(createNumberNode(monomial.coefficient), createSymbolNode(monomial.base));
    }

    if (monomial.type === 'monomial' && monomial.degree > 1) {
        return createTimes(
            createNumberNode(monomial.coefficient),
            createPower(createSymbolNode(monomial.base), createNumberNode(monomial.degree)),
        );
    }
}

export function getSyntaxTreeNodeFromPolynomial(polynomial: Polynomial): SyntaxTreeNode {
    const firstMonomial = getSyntaxTreeNodeFromMonomial(polynomial[0]);

    if (polynomial.length === 1) {
        return firstMonomial;
    }

    let currentSyntaxTreeNode = firstMonomial;
    for (let i = 1; i < polynomial.length; i++) {
        const newSyntaxTreeNode = getSyntaxTreeNodeFromMonomial(polynomial[i]);
        currentSyntaxTreeNode = createPlus(currentSyntaxTreeNode, newSyntaxTreeNode);
    }
    return currentSyntaxTreeNode;
}
