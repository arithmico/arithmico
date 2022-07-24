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
import { getPolynomial, isPolynomialValid } from './utils/polynomial-util';

const polynomialPlugin = createPlugin('core/polynomial');
addPluginDescription(polynomialPlugin, 'Adds polynomial division and another functions on polynoms.');
addPluginAuthor(polynomialPlugin, 'core');

const doublePolynomialHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'any', evaluate: true },
    { name: 'm', type: 'any', evaluate: true },
];

addPluginFunction(
    polynomialPlugin,
    createPluginFunction(
        'padd',
        doublePolynomialHeader,
        'Adds two polynomials n and m.',
        'Addiert zwei Polynome n und m.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('padd', parameters, doublePolynomialHeader, context);
            const n = <SyntaxTreeNode>parameterStackFrame['n'];
            const m = <SyntaxTreeNode>parameterStackFrame['m'];

            const polynomial = getPolynomial(n);

            if (!isPolynomialValid(n)) {
                throw '';
            }

            return createNumberNode(0);
        },
    ),
);

addPluginFunction(
    polynomialPlugin,
    createPluginFunction(
        'pdiv',
        doublePolynomialHeader,
        'Divides two polynomials, the dividend n must have an equal or higher degree than the dividend m.',
        'Dividiert zwei Polynome, der Dividiend n muss einen gleichen oder höheren Grad als der Dividend m aufweisen.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('pdiv', parameters, doublePolynomialHeader, context);
            const n = <SyntaxTreeNode>parameterStackFrame['n'];
            const m = <SyntaxTreeNode>parameterStackFrame['m'];
            // todo
            return createNumberNode(0);
        },
    ),
);

export default polynomialPlugin;
