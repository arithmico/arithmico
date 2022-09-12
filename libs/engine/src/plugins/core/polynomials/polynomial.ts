import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { FunctionHeaderItem, SyntaxTreeNode } from '../../../types/SyntaxTreeNodes';
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
            const p = <SyntaxTreeNode>parameterStackFrame['p'];

            const normalizedP = normalize(p, context);

            if (!isPolynomialDegreeValid(normalizedP)) {
                throw "MathError: deg: polynomial isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }

            if (!isEveryPolynomialBaseSame(normalizedP)) {
                throw "MathError: deg: polynomial isn't mathematically correct! Every monomial must have the same base.";
            }

            const polynomialP = getPolynomial(normalizedP);

            return createNumberNode(getDegreeFromPolynomial(polynomialP));
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
            const p = <SyntaxTreeNode>parameterStackFrame['p'];
            const q = <SyntaxTreeNode>parameterStackFrame['q'];

            const polynomialP = getPolynomial(normalize(p, context));
            const polynomialQ = getPolynomial(normalize(q, context));

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialAddition(polynomialP, polynomialQ));
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
            const p = <SyntaxTreeNode>parameterStackFrame['p'];
            const q = <SyntaxTreeNode>parameterStackFrame['q'];

            const polynomialP = getPolynomial(normalize(p, context));
            const polynomialQ = getPolynomial(normalize(q, context));

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialSubtraction(polynomialP, polynomialQ));
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
            const p = <SyntaxTreeNode>parameterStackFrame['p'];
            const q = <SyntaxTreeNode>parameterStackFrame['q'];

            const normalizedP = normalize(p, context);
            const normalizedQ = normalize(q, context);

            if (!isPolynomialDegreeValid(normalizedP)) {
                throw "MathError: polynomial:mul: polynomial p isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }

            if (!isEveryPolynomialBaseSame(normalizedP)) {
                throw "MathError: polynomial:mul:  polynomial q isn't mathematically correct! Every monomial must have the same base.";
            }

            if (!isPolynomialDegreeValid(normalizedQ)) {
                throw "MathError: polynomial:mul: polynomial p isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }

            if (!isEveryPolynomialBaseSame(normalizedQ)) {
                throw "MathError: polynomial:mul:  polynomial q isn't mathematically correct! Every monomial must have the same base.";
            }

            const polynomialP = getPolynomial(normalizedP);
            const polynomialQ = getPolynomial(normalizedQ);

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialMultiplication(polynomialP, polynomialQ));
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
            const p = <SyntaxTreeNode>parameterStackFrame['p'];
            const q = <SyntaxTreeNode>parameterStackFrame['q'];

            const normalizedP = normalize(p, context);
            const normalizedQ = normalize(q, context);

            if (!isPolynomialDegreeValid(normalizedP)) {
                throw "MathError: polynomial:div: polynomial p isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }

            if (!isEveryPolynomialBaseSame(normalizedP)) {
                throw "MathError: polynomial:div:  polynomial q isn't mathematically correct! Every monomial must have the same base.";
            }

            if (!isPolynomialDegreeValid(normalizedQ)) {
                throw "MathError: polynomial:div: polynomial p isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }
            if (!isEveryPolynomialBaseSame(normalizedQ)) {
                throw "MathError: polynomial:div:  polynomial q isn't mathematically correct! Every monomial must have the same base.";
            }

            const polynomialP = getPolynomial(normalizedP);
            const polynomialQ = getPolynomial(normalizedQ);

            if (getDegreeFromPolynomial(polynomialP) < getDegreeFromPolynomial(polynomialQ)) {
                throw "MathError: polynomial:div: divisor q mustn't have a greater or equal degree as dividend p!";
            }

            if (polynomialQ.length === 1 && polynomialQ[0].type === 'constant' && polynomialQ[0].coefficient === 0) {
                throw "MathError: polynomial:div: divisor q mustn't be 0!";
            }

            const quotientRemainder = calculatePolynomialDivision(polynomialP, polynomialQ);

            return createVector([
                getSyntaxTreeNodeFromPolynomial(quotientRemainder[0]),
                getSyntaxTreeNodeFromPolynomial(quotientRemainder[1]),
            ]);
        },
    ),
);

export default polynomialPlugin;
