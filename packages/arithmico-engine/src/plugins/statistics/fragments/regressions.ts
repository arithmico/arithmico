import { PluginFragment } from '../../../utils/plugin-builder';
import { FunctionHeaderItem, NumberNode, Vector } from '../../../types/nodes.types';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { isEveryElementNumber } from '../../../utils/tensor-utils';
import { calculatePolynomialRegressionCoefficients } from '../utils/polynomial-regression';
import {
    createConstantMonomial,
    createNonConstantMonomial,
    getSyntaxTreeNodeFromPolynomial,
} from '../../../utils/math-utils/polynomial-type-utils';
import createEquals from '../../../node-operations/create-node/create-equals';
import createSymbolNode from '../../../node-operations/create-node/create-symbol-node';

const regressionsPolynomialHeader: FunctionHeaderItem[] = [
    { name: 'xs', type: 'vector', evaluate: true },
    { name: 'ys', type: 'vector', evaluate: true },
    { name: 'degree', type: 'number', evaluate: true, optional: true },
];

const regressionsFragment = new PluginFragment();

__FUNCTIONS.regressionsPolynomial &&
    regressionsFragment.addFunction(
        'regressions:polynomial',
        regressionsPolynomialHeader,
        '',
        '',
        ({ getParameter, runtimeError, typeError }) => {
            const xs = <Vector>getParameter('xs');
            const ys = <Vector>getParameter('ys');
            const degree = (<NumberNode>getParameter('degree', createNumberNode(1))).value;

            if (degree <= 0) {
                throw typeError('Degree must be greater than 0');
            }

            if (degree % 1 !== 0) {
                throw runtimeError('Degree must be an integer.');
            }

            if (!isEveryElementNumber(xs)) {
                throw typeError('All elements of xs must be numbers.');
            }

            if (!isEveryElementNumber(ys)) {
                throw typeError('All elements of ys must be numbers.');
            }

            const xValues = xs.values.map((v) => (<NumberNode>v).value);
            const yValues = ys.values.map((v) => (<NumberNode>v).value);

            if (xValues.length !== yValues.length) {
                throw runtimeError('Both vectors must have the same length.');
            }

            const values = calculatePolynomialRegressionCoefficients(xValues, yValues, degree);
            const dependentVariables = values.map((value, index) => {
                if (index === 0) {
                    return createConstantMonomial(value);
                }

                return createNonConstantMonomial(value, 'x', index);
            });

            return createEquals(createSymbolNode('y'), getSyntaxTreeNodeFromPolynomial(dependentVariables));
        },
    );

export default regressionsFragment;
