import createNumberNode from '../../../../create/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../../types';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];
const logHeader: FunctionHeaderItem[] = [
    { name: 'x', type: 'number', evaluate: true },
    { name: 'base', type: 'number', evaluate: true },
];

const logFragment = new PluginFragment()
    .addFunction(
        'lg',
        singleNumberHeader,
        'Logarithm of x to base 10.',
        'Berechnet den Logarithmus von x zur Basis 10',
        ({ getParameter, runtimeError }) => {
            const x = (<NumberNode>getParameter('x')).value;
            if (x <= 0) {
                throw runtimeError('not defined for x <= 0');
            }
            return createNumberNode(Math.log10(x));
        },
    )
    .addFunction(
        'ln',
        singleNumberHeader,
        'Logarithm of x to base e.',
        'Berechnet den Logarithmus von x zur Basis e.',
        ({ getParameter, runtimeError }) => {
            const x = (<NumberNode>getParameter('x')).value;

            if (x <= 0) {
                throw runtimeError('not defined for x <= 0');
            }

            return createNumberNode(Math.log(x));
        },
    )
    .addFunction(
        'log',
        logHeader,
        'Logarithm of x to the given base.',
        'Berechnet den Logarithmus von x zur Basis base',
        ({ getParameter, runtimeError }) => {
            const x = (<NumberNode>getParameter('x')).value;
            const b = (<NumberNode>getParameter('base')).value;

            if (x <= 0) {
                throw runtimeError('not defined for x <= 0');
            }

            if (b <= 0) {
                throw runtimeError('not defined for base <= 0');
            }

            return createNumberNode(Math.log(x) / Math.log(b));
        },
    );

export default logFragment;
