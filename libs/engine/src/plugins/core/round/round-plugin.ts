import createNumberNode from '../../../create/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../types';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';

const roundPlugin = createPlugin('round');
addPluginAuthor(roundPlugin, 'core');
addPluginDescription(roundPlugin, 'rounding functions');

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];

addPluginFunction(
    roundPlugin,
    createPluginFunction(
        'round',
        singleNumberHeader,
        'Returns the value of a number rounded to the nearest integer',
        'Gibt die nächstgelegene ganze Zahl zurück',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('round', parameters, singleNumberHeader, context);
            const value = (<NumberNode>parameterStackFrame['x']).value;
            return createNumberNode(Math.round(value));
        },
    ),
);

addPluginFunction(
    roundPlugin,
    createPluginFunction(
        'floor',
        singleNumberHeader,
        'Returns the largest integer less than or equal to a given number',
        'Gibt die größte ganze Zahl zurück, welche <= x ist',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('floor', parameters, singleNumberHeader, context);
            const value = (<NumberNode>parameterStackFrame['x']).value;
            return createNumberNode(Math.floor(value));
        },
    ),
);

addPluginFunction(
    roundPlugin,
    createPluginFunction(
        'ceil',
        singleNumberHeader,
        'Returns the smallest integer greater than or equal to a given number',
        'Gibt die kleinste ganze Zahl zurück, welche >= x ist',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('ceil', parameters, singleNumberHeader, context);
            const value = (<NumberNode>parameterStackFrame['x']).value;
            return createNumberNode(Math.ceil(value));
        },
    ),
);

export default roundPlugin;
