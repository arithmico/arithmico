import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { FunctionHeaderItem } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    getPolynomial,
    isEveryPolynomialBaseSame,
    isPolynomialDegreeValid,
} from '../../../utils/polynomial-syntax-tree-utils';
import normalize from '../../../normalize';
import {
    calculatePolynomialAddition,
    calculatePolynomialDivision,
    calculatePolynomialMultiplication,
    calculatePolynomialSubtraction,
    getDegreeFromPolynomial,
} from './utils/polynomial-utils';
import { getSyntaxTreeNodeFromPolynomial } from '../../../utils/polynomial-type-utils';
import createNumberNode from '../../../create/create-number-node';
import createVector from '../../../create/create-vector';

const polynomialPlugin = createPlugin('core/polynomial');
addPluginDescription(polynomialPlugin, 'Adds polynomial division and another functions on polynoms.');
addPluginAuthor(polynomialPlugin, 'core');

const singlePolynomialHeader: FunctionHeaderItem[] = [{ name: 'p', type: 'any', evaluate: false }];
const doublePolynomialHeader: FunctionHeaderItem[] = [
    { name: 'p', type: 'any', evaluate: false },
    { name: 'q', type: 'any', evaluate: false },
];

addPluginFunction(
    polynomialPlugin,
    createPluginFunction(
        'polynomial:deg',
        singlePolynomialHeader,
        'Calculates the degree of given polynomial p.',
        'Berechnet den Grad eines gegebenen Polynoms p.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'polynomial:deg',
                parameters,
                singlePolynomialHeader,
                context,
            );
            const polynomialSyntaxTreeNode = parameterStackFrame['p'];

            const normalizedPolynomialSyntaxTreeNode = normalize(polynomialSyntaxTreeNode, context);

            if (!isPolynomialDegreeValid(normalizedPolynomialSyntaxTreeNode)) {
                throw "RuntimeError: polynomial:deg: polynomial isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }

            if (!isEveryPolynomialBaseSame(normalizedPolynomialSyntaxTreeNode)) {
                throw "RuntimeError: polynomial:deg: polynomial isn't mathematically correct! Every monomial must have the same base.";
            }

            const polynomial = getPolynomial(normalizedPolynomialSyntaxTreeNode);

            return createNumberNode(getDegreeFromPolynomial(polynomial));
        },
    ),
);

addPluginFunction(
    polynomialPlugin,
    createPluginFunction(
        'polynomial:add',
        doublePolynomialHeader,
        'Adds two polynomials p and q.',
        'Addiert zwei Polynome p und q.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'polynomial:add',
                parameters,
                doublePolynomialHeader,
                context,
            );
            const polynomialSyntaxTreeNode1 = parameterStackFrame['p'];
            const polynomialSyntaxTreeNode2 = parameterStackFrame['q'];

            const polynomial1 = getPolynomial(normalize(polynomialSyntaxTreeNode1, context));
            const polynomial2 = getPolynomial(normalize(polynomialSyntaxTreeNode2, context));

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialAddition(polynomial1, polynomial2));
        },
    ),
);

addPluginFunction(
    polynomialPlugin,
    createPluginFunction(
        'polynomial:sub',
        doublePolynomialHeader,
        'Subtracts two polynomials p and q.',
        'Subtrahiert zwei Polynome p und q.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'polynomial:sub',
                parameters,
                doublePolynomialHeader,
                context,
            );
            const polynomialSyntaxTreeNode1 = parameterStackFrame['p'];
            const polynomialSyntaxTreeNode2 = parameterStackFrame['q'];

            const polynomial1 = getPolynomial(normalize(polynomialSyntaxTreeNode1, context));
            const polynomial2 = getPolynomial(normalize(polynomialSyntaxTreeNode2, context));

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialSubtraction(polynomial1, polynomial2));
        },
    ),
);

addPluginFunction(
    polynomialPlugin,
    createPluginFunction(
        'polynomial:mul',
        doublePolynomialHeader,
        'Multiplicates two polynomials p and q.',
        'Multipliziert zwei Polynome p und q.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'polynomial:mul',
                parameters,
                doublePolynomialHeader,
                context,
            );
            const polynomialSyntaxTreeNode1 = parameterStackFrame['p'];
            const polynomialSyntaxTreeNode2 = parameterStackFrame['q'];

            const normalizedPolynomialSyntaxTreeNode1 = normalize(polynomialSyntaxTreeNode1, context);
            const normalizedPolynomialSyntaxTreeNode2 = normalize(polynomialSyntaxTreeNode2, context);

            if (!isPolynomialDegreeValid(normalizedPolynomialSyntaxTreeNode1)) {
                throw "RuntimeError: polynomial:mul: polynomial p isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }

            if (!isEveryPolynomialBaseSame(normalizedPolynomialSyntaxTreeNode1)) {
                throw "RuntimeError: polynomial:mul:  polynomial q isn't mathematically correct! Every monomial must have the same base.";
            }

            if (!isPolynomialDegreeValid(normalizedPolynomialSyntaxTreeNode2)) {
                throw "RuntimeError: polynomial:mul: polynomial p isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }

            if (!isEveryPolynomialBaseSame(normalizedPolynomialSyntaxTreeNode2)) {
                throw "RuntimeError: polynomial:mul:  polynomial q isn't mathematically correct! Every monomial must have the same base.";
            }

            const polynomial1 = getPolynomial(normalizedPolynomialSyntaxTreeNode1);
            const polynomial2 = getPolynomial(normalizedPolynomialSyntaxTreeNode2);

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialMultiplication(polynomial1, polynomial2));
        },
    ),
);

addPluginFunction(
    polynomialPlugin,
    createPluginFunction(
        'polynomial:div',
        doublePolynomialHeader,
        'Divides two polynomials, the dividend p must have an equal or higher degree than the divisor q. The result is returned as [quotient, remainder].',
        'Dividiert zwei Polynome, der Dividiend p muss einen gleichen oder höheren Grad als der Divisor q aufweisen. Das Ergebnis als [Quotient, Rest].',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'polynomial:div',
                parameters,
                doublePolynomialHeader,
                context,
            );
            const polynomialSyntaxTreeNode1 = parameterStackFrame['p'];
            const polynomialSyntaxTreeNode2 = parameterStackFrame['q'];

            const normalizedPolynomialSyntaxTreeNode1 = normalize(polynomialSyntaxTreeNode1, context);
            const normalizedPolynomialSyntaxTreeNode2 = normalize(polynomialSyntaxTreeNode2, context);

            if (!isPolynomialDegreeValid(normalizedPolynomialSyntaxTreeNode1)) {
                throw "RuntimeError: polynomial:div: polynomial p isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }

            if (!isEveryPolynomialBaseSame(normalizedPolynomialSyntaxTreeNode1)) {
                throw "RuntimeError: polynomial:div:  polynomial q isn't mathematically correct! Every monomial must have the same base.";
            }

            if (!isPolynomialDegreeValid(normalizedPolynomialSyntaxTreeNode2)) {
                throw "RuntimeError: polynomial:div: polynomial p isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }
            if (!isEveryPolynomialBaseSame(normalizedPolynomialSyntaxTreeNode2)) {
                throw "RuntimeError: polynomial:div:  polynomial q isn't mathematically correct! Every monomial must have the same base.";
            }

            const polynomial1 = getPolynomial(normalizedPolynomialSyntaxTreeNode1);
            const polynomial2 = getPolynomial(normalizedPolynomialSyntaxTreeNode2);

            if (getDegreeFromPolynomial(polynomial1) < getDegreeFromPolynomial(polynomial2)) {
                throw "RuntimeError: polynomial:div: divisor q mustn't have a greater or equal degree as dividend p!";
            }

            if (polynomial2.length === 1 && polynomial2[0].type === 'constant' && polynomial2[0].coefficient === 0) {
                throw "RuntimeError: polynomial:div: divisor q mustn't be 0!";
            }

            const quotientRemainder = calculatePolynomialDivision(polynomial1, polynomial2);

            return createVector([
                getSyntaxTreeNodeFromPolynomial(quotientRemainder[0]),
                getSyntaxTreeNodeFromPolynomial(quotientRemainder[1]),
            ]);
        },
    ),
);

export default polynomialPlugin;
