import { FunctionHeaderItem, SyntaxTreeNode } from '../../../../types/nodes.types';
import {
    getPolynomial,
    haveTwoPolynomialsSameBase,
    isEverySummandOfPolynomialBaseSame,
    isPolynomialDegreeValid,
} from '../utils/polynomial-syntax-tree-utils';
import normalize from '../../../../node-operations/normalize-node';
import {
    calculatePolynomialAddition,
    calculatePolynomialDivision,
    calculatePolynomialMultiplication,
    calculatePolynomialSubtraction,
    getDegreeFromPolynomial,
    getSyntaxTreeNodeFromPolynomial,
} from '../utils/polynomial-type-utils';
import createNumberNode from '../../../../node-operations/create-node/create-number-node';
import createVector from '../../../../node-operations/create-node/create-vector';
import { PluginFragment } from '../../../../utils/plugin-builder';

const singlePolynomialHeader: FunctionHeaderItem[] = [{ name: 'p', type: 'any', evaluate: false }];
const doublePolynomialHeader: FunctionHeaderItem[] = [
    { name: 'p', type: 'any', evaluate: false },
    { name: 'q', type: 'any', evaluate: false },
];

const polynomialFragment = new PluginFragment()
    .addFunction(
        'polynomial:deg',
        singlePolynomialHeader,
        'Calculates the degree of given polynomial p.',
        'Berechnet den Grad eines gegebenen Polynoms p.',
        ({ getParameter, runtimeError, context }) => {
            const polynomialSyntaxTreeNode = <SyntaxTreeNode>getParameter('p');

            const normalizedPolynomialSyntaxTreeNode = normalize(polynomialSyntaxTreeNode, context);

            if (!isPolynomialDegreeValid(normalizedPolynomialSyntaxTreeNode)) {
                throw runtimeError(
                    'Polynomial is not mathematically correct. Every monomial must have an integer degree >= 0.',
                );
            }

            if (!isEverySummandOfPolynomialBaseSame(normalizedPolynomialSyntaxTreeNode)) {
                throw runtimeError('Polynomial is not mathematically correct. Every monomial must have the same base.');
            }

            const polynomial = getPolynomial(normalizedPolynomialSyntaxTreeNode);

            return createNumberNode(getDegreeFromPolynomial(polynomial));
        },
    )
    .addFunction(
        'polynomial:add',
        doublePolynomialHeader,
        'Adds two polynomials p and q.',
        'Addiert zwei Polynome p und q.',
        ({ getParameter, context }) => {
            const polynomialSyntaxTreeNode1 = <SyntaxTreeNode>getParameter('p');
            const polynomialSyntaxTreeNode2 = <SyntaxTreeNode>getParameter('q');

            const polynomial1 = getPolynomial(normalize(polynomialSyntaxTreeNode1, context));
            const polynomial2 = getPolynomial(normalize(polynomialSyntaxTreeNode2, context));

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialAddition(polynomial1, polynomial2));
        },
    )
    .addFunction(
        'polynomial:sub',
        doublePolynomialHeader,
        'Subtracts two polynomials p and q.',
        'Subtrahiert zwei Polynome p und q.',
        ({ getParameter, context }) => {
            const polynomialSyntaxTreeNode1 = <SyntaxTreeNode>getParameter('p');
            const polynomialSyntaxTreeNode2 = <SyntaxTreeNode>getParameter('q');

            const polynomial1 = getPolynomial(normalize(polynomialSyntaxTreeNode1, context));
            const polynomial2 = getPolynomial(normalize(polynomialSyntaxTreeNode2, context));

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialSubtraction(polynomial1, polynomial2));
        },
    )
    .addFunction(
        'polynomial:mul',
        doublePolynomialHeader,
        'Multiplicates two polynomials p and q.',
        'Multipliziert zwei Polynome p und q.',
        ({ getParameter, runtimeError, context }) => {
            const polynomialSyntaxTreeNode1 = <SyntaxTreeNode>getParameter('p');
            const polynomialSyntaxTreeNode2 = <SyntaxTreeNode>getParameter('q');

            const normalizedPolynomialSyntaxTreeNode1 = normalize(polynomialSyntaxTreeNode1, context);
            const normalizedPolynomialSyntaxTreeNode2 = normalize(polynomialSyntaxTreeNode2, context);

            if (!isPolynomialDegreeValid(normalizedPolynomialSyntaxTreeNode1)) {
                throw runtimeError(
                    'Polynomial p is not mathematically correct. Every monomial must have an integer degree >= 0.',
                );
            }
            if (!isPolynomialDegreeValid(normalizedPolynomialSyntaxTreeNode2)) {
                throw runtimeError(
                    'Polynomial p is not mathematically correct. Every monomial must have an integer degree >= 0.',
                );
            }
            if (!haveTwoPolynomialsSameBase(normalizedPolynomialSyntaxTreeNode1, normalizedPolynomialSyntaxTreeNode2)) {
                throw runtimeError(
                    'Polynomials p and q are not mathematically correct. Every monomial must have the same base.',
                );
            }

            const polynomial1 = getPolynomial(normalizedPolynomialSyntaxTreeNode1);
            const polynomial2 = getPolynomial(normalizedPolynomialSyntaxTreeNode2);

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialMultiplication(polynomial1, polynomial2));
        },
    )
    .addFunction(
        'polynomial:div',
        doublePolynomialHeader,
        'Divides two polynomials, the dividend p must have an equal or higher degree than the divisor q. The result is returned as [quotient, remainder].',
        'Dividiert zwei Polynome, der Dividiend p muss einen gleichen oder höheren Grad als der Divisor q aufweisen. Das Ergebnis als [Quotient, Rest].',
        ({ getParameter, runtimeError, context }) => {
            const polynomialSyntaxTreeNode1 = <SyntaxTreeNode>getParameter('p');
            const polynomialSyntaxTreeNode2 = <SyntaxTreeNode>getParameter('q');

            const normalizedPolynomialSyntaxTreeNode1 = normalize(polynomialSyntaxTreeNode1, context);
            const normalizedPolynomialSyntaxTreeNode2 = normalize(polynomialSyntaxTreeNode2, context);

            if (
                !isPolynomialDegreeValid(normalizedPolynomialSyntaxTreeNode1) ||
                !isPolynomialDegreeValid(normalizedPolynomialSyntaxTreeNode2)
            ) {
                throw runtimeError('Every monomial must have an integer degree >= 0.');
            }

            if (!haveTwoPolynomialsSameBase(normalizedPolynomialSyntaxTreeNode1, normalizedPolynomialSyntaxTreeNode2)) {
                throw runtimeError('Every monomial must have the same base.');
            }

            const polynomial1 = getPolynomial(normalizedPolynomialSyntaxTreeNode1);
            const polynomial2 = getPolynomial(normalizedPolynomialSyntaxTreeNode2);

            if (getDegreeFromPolynomial(polynomial1) < getDegreeFromPolynomial(polynomial2)) {
                throw runtimeError('Divisor q must not have a greater or equal degree as dividend p');
            }

            if (polynomial2.length === 1 && polynomial2[0].type === 'constant' && polynomial2[0].coefficient === 0) {
                throw runtimeError('Divisor q must not be 0.');
            }

            const quotientRemainder = calculatePolynomialDivision(polynomial1, polynomial2);

            return createVector([
                getSyntaxTreeNodeFromPolynomial(quotientRemainder[0]),
                getSyntaxTreeNodeFromPolynomial(quotientRemainder[1]),
            ]);
        },
    );

export default polynomialFragment;
