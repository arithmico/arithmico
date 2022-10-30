import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { FunctionHeaderItem, NumberNode } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import createNumberNode from '../../../create/create-number-node';

const numberTheoryPlugin = createPlugin('core/number-theory');
addPluginDescription(numberTheoryPlugin, 'brings many functions for calculation on integers and in number theory');
addPluginAuthor(numberTheoryPlugin, 'core');

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

addPluginFunction(
    numberTheoryPlugin,
    createPluginFunction(
        'prime',
        singleNumberHeader,
        'Returns the nth prime number.',
        'Gibt die nte Primzahl zurück.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('prime', parameters, singleNumberHeader, context);
            const n = (<NumberNode>parameterStackFrame['n']).value;
            return createNumberNode(n);
        },
    ),
);
