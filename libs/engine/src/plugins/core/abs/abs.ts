import createNumberNode from '../../../create/create-number-node';
import { FunctionHeaderItem, NumberNode, Vector } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';

const absPlugin = createPlugin('core/abs');
addPluginAuthor(absPlugin, 'core');
addPluginDescription(absPlugin, 'adds abs and length functions');

const absHeader: FunctionHeaderItem[] = [{ name: 'v', type: 'number', evaluate: true }];
const lengthHeader: FunctionHeaderItem[] = [{ name: 'v', type: 'vector', evaluate: true }];

addPluginFunction(
    absPlugin,
    createPluginFunction(
        'abs',
        absHeader,
        'Computes the absolute value of a number',
        'Berechnet den absoluten Wert einer Zahl.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('abs', parameters, absHeader, context);
            const value = (<NumberNode>parameterStackFrame['v']).value;
            return createNumberNode(Math.abs(value));
        },
    ),
);

addPluginFunction(
    absPlugin,
    createPluginFunction(
        'length',
        lengthHeader,
        'Computes the length of a vector',
        'Berechnet die Länge eines Vektors',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('length', parameters, lengthHeader, context);
            const values = (<Vector>parameterStackFrame['v']).values.map((value) => {
                if (value.type !== 'number') {
                    throw `TypeError: length: expected number got ${value.type}`;
                }

                return Math.pow(value.value, 2);
            });

            return createNumberNode(Math.sqrt(values.reduce((a, b) => a + b)));
        },
    ),
);

export default absPlugin;
