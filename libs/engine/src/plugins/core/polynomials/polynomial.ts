import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { FunctionHeaderItem, SyntaxTreeNode } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import createNumberNode from '../../../create/create-number-node';
import {
    getPolynomial,
    isEveryPolynomialBaseSame,
    isPolynomialDegreeValid,
} from '../../../utils/polynomial-syntax-tree-utils';
import normalize from '../../../normalize';
import {
    calculatePolynomialDash,
    calculatePolynomialMultiplication,
    getDegreeFromPolynomial,
} from './utils/polynomial-utils';
import { getSyntaxTreeNodeFromPolynomial } from '../../../utils/polynomial-type-utils';

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
        'deg',
        singlePolynomialHeader,
        'Calculates the degree of given polynomial p.',
        'Berechnet den Grad eines gegebenen Polynoms p.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('deg', parameters, singlePolynomialHeader, context);
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
        'padd',
        doublePolynomialHeader,
        'Adds two polynomials p and q.',
        'Addiert zwei Polynome p und q.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('padd', parameters, doublePolynomialHeader, context);
            const p = <SyntaxTreeNode>parameterStackFrame['p'];
            const q = <SyntaxTreeNode>parameterStackFrame['q'];

            const polynomialP = getPolynomial(normalize(p, context));
            const polynomialQ = getPolynomial(normalize(q, context));

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialDash(polynomialP, polynomialQ));
        },
    ),
);

addPluginFunction(
    polynomialPlugin,
    createPluginFunction(
        'psub',
        doublePolynomialHeader,
        'Subtracts two polynomials p and q.',
        'Subtrahiert zwei Polynome p und q.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('psub', parameters, doublePolynomialHeader, context);
            const p = <SyntaxTreeNode>parameterStackFrame['p'];
            const q = <SyntaxTreeNode>parameterStackFrame['q'];

            const polynomialP = getPolynomial(normalize(p, context));
            const polynomialQ = getPolynomial(normalize(q, context));

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialDash(polynomialP, polynomialQ, true));
        },
    ),
);

addPluginFunction(
    polynomialPlugin,
    createPluginFunction(
        'pmul',
        doublePolynomialHeader,
        'Multiplicates two polynomials p and q.',
        'Multipliziert zwei Polynome p und q.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('pmul', parameters, doublePolynomialHeader, context);
            const p = <SyntaxTreeNode>parameterStackFrame['p'];
            const q = <SyntaxTreeNode>parameterStackFrame['q'];

            const normalizedP = normalize(p, context);
            const normalizedQ = normalize(q, context);

            if (!isPolynomialDegreeValid(normalizedP)) {
                throw "MathError: pmul: polynomial p isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }

            if (!isEveryPolynomialBaseSame(normalizedP)) {
                throw "MathError: pmul:  polynomial q isn't mathematically correct! Every monomial must have the same base.";
            }

            if (!isPolynomialDegreeValid(normalizedQ)) {
                throw "MathError: pmul: polynomial p isn't mathematically correct! Every monomial must have an integer degree >= 0.";
            }

            if (!isEveryPolynomialBaseSame(normalizedQ)) {
                throw "MathError: pmul:  polynomial q isn't mathematically correct! Every monomial must have the same base.";
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
        'pdiv',
        doublePolynomialHeader,
        'Divides two polynomials, the dividend p must have an equal or higher degree than the dividend q.',
        'Dividiert zwei Polynome, der Dividiend p muss einen gleichen oder höheren Grad als der Dividend q aufweisen.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('pdiv', parameters, doublePolynomialHeader, context);
            const p = <SyntaxTreeNode>parameterStackFrame['p'];
            const q = <SyntaxTreeNode>parameterStackFrame['q'];
            // todo
            return createNumberNode(0);
        },
    ),
);

export default polynomialPlugin;
