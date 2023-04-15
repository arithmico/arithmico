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
import createTimes from '../../../node-operations/create-node/create-times';
import createPower from '../../../node-operations/create-node/create-power';
import createPlus from '../../../node-operations/create-node/create-plus';
import { fitLogisticModel } from '../utils/logistic-regression';
import createDivided from '../../../node-operations/create-node/create-divided';
import createNegate from '../../../node-operations/create-node/create-negate';

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
        'Creates a polynomial regression of degree model from the dependent variable ys and the independent variable xs. The default value of degree is 1.',
        'Erstellt aus der abhängigen Variable ys und der unabhängigen Variable xs ein einfaches polynomiales Regressionsmodell mit Grad degree. Der Standardwert für den Grad degree ist 1.',
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

const regressionsHeader: FunctionHeaderItem[] = [
    { name: 'xs', type: 'vector', evaluate: true },
    { name: 'ys', type: 'vector', evaluate: true },
];

__FUNCTIONS.regressionsExponential &&
    regressionsFragment.addFunction(
        'regressions:exponential',
        regressionsHeader,
        'Creates a simple exponential regression model from the dependent variable ys and the independent variable xs.',
        'Erstellt ein einfaches exponentielles Regressionsmodell aus der abhängigen Variablen ys und der unabhängigen Variablen xs.',
        ({ getParameter, runtimeError, typeError }) => {
            const xs = <Vector>getParameter('xs');
            const ys = <Vector>getParameter('ys');

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

            const coefficients = calculatePolynomialRegressionCoefficients(
                xValues,
                yValues.map((x) => Math.log(x)),
                1,
            );

            return createEquals(
                createSymbolNode('y'),
                createPower(
                    createSymbolNode('e'),
                    createPlus(
                        createNumberNode(coefficients[0]),
                        createTimes(createNumberNode(coefficients[1]), createSymbolNode('x')),
                    ),
                ),
            );
        },
    );

__FUNCTIONS.regressionsLogistic &&
    regressionsFragment.addFunction(
        'regressions:logistic',
        regressionsHeader,
        '',
        '',
        ({ getParameter, runtimeError, typeError }) => {
            const xs = <Vector>getParameter('xs');
            const ys = <Vector>getParameter('ys');

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

            if (yValues.some((y) => y !== 0 && y !== 1)) {
                throw runtimeError('ys must only contain 0 and 1.');
            }

            const coefficients = fitLogisticModel(xValues, yValues);

            return createEquals(
                createSymbolNode('y'),
                createDivided(
                    createNumberNode(1),
                    createPlus(
                        createNumberNode(1),
                        createPower(
                            createSymbolNode('e'),
                            createNegate(
                                createPlus(
                                    createNumberNode(coefficients[0]),
                                    createTimes(createNumberNode(coefficients[1]), createSymbolNode('x')),
                                ),
                            ),
                        ),
                    ),
                ),
            );
        },
    );

export default regressionsFragment;
