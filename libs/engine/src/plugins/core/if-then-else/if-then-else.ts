import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import evaluate from '../../../eval';
import { BooleanNode } from '../../../types';
import { FunctionHeaderItem } from '../../../types/SyntaxTreeNodes';

const ifThenElsePlugin = createPlugin('core/if-then-else');

addPluginAuthor(ifThenElsePlugin, 'core');
addPluginDescription(ifThenElsePlugin, 'adds ite function');

const iteHeader: FunctionHeaderItem[] = [
    {
        name: 'c',
        type: 'boolean',
        evaluate: true,
    },
    {
        name: 't',
        type: 'any',
        evaluate: false,
    },
    {
        name: 'e',
        type: 'any',
        evaluate: false,
    },
];

addPluginFunction(
    ifThenElsePlugin,
    createPluginFunction(
        'ite',
        iteHeader,
        'returns "t" if "c" is true otherwise "e"',
        'gibt "t" zurück falls "c" true ist sonst "e"',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('ite', parameters, iteHeader, context);
            const condition = (<BooleanNode>parameterStackFrame.get('c')).value;
            const thenNode = parameterStackFrame.get('t');
            const elseNode = parameterStackFrame.get('e');
            return evaluate(condition ? thenNode : elseNode, context);
        },
    ),
);

export default ifThenElsePlugin;
