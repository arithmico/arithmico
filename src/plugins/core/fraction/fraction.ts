import createDivided from '../../../create/Divided';
import createNumberNode from '../../../create/NumberNode';
import { FunctionHeaderItem, NumberNode } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { getLowestFraction } from './utils';

const fractionPlugin = createPlugin('fraction');
addPluginDescription(fractionPlugin, 'adds fraction function');
addPluginAuthor(fractionPlugin, 'core');

const header: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];

addPluginFunction(
    fractionPlugin,
    createPluginFunction(
        'fraction',
        header,
        'Calculates the nearest fraction',
        'Berechnet den nächsten Bruch zu x.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('fraction', parameters, header, context);
            const value = (<NumberNode>parameterStackFrame['x']).value;

            if (value === 0) {
                return createNumberNode(0);
            }

            const [left, right] = getLowestFraction(value);
            return createDivided(createNumberNode(left), createNumberNode(right));
        },
    ),
);

export default fractionPlugin;
