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
import { getPolynomial, getSyntaxTreeNodeFromPolynomial } from '../../../utils/polynomial-syntax-tree-utils';
import normalize from '../../../normalize';
import { calculatePolynomialSum } from './utils/polynomial-utils';

const polynomialPlugin = createPlugin('core/polynomial');
addPluginDescription(polynomialPlugin, 'Adds polynomial division and another functions on polynoms.');
addPluginAuthor(polynomialPlugin, 'core');

const doublePolynomialHeader: FunctionHeaderItem[] = [
    { name: 'p', type: 'any', evaluate: true },
    { name: 'q', type: 'any', evaluate: true },
];

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

            return getSyntaxTreeNodeFromPolynomial(calculatePolynomialSum(polynomialP, polynomialQ));
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
