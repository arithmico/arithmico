//import ifThenElseFragment from '../../computer-science/fragments/if-then-else';
import { PluginFragment } from '../../../utils/plugin-builder';
import { BooleanNode, FunctionHeaderItem, SyntaxTreeNode } from '../../../types/nodes.types';
import evaluate from '../../../node-operations/evaluate-node';

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

const wennFragment = new PluginFragment().addFunction(
    'wenn',
    iteHeader,
    'Returns "t" if "c" is true otherwise "e".',
    'Gibt "t" zurück, falls "c" true ist, sonst "e".',
    ({ getParameter, context }) => {
        const condition = (<BooleanNode>getParameter('c')).value;
        const thenNode = <SyntaxTreeNode>getParameter('t');
        const elseNode = <SyntaxTreeNode>getParameter('e');
        return evaluate(condition ? thenNode : elseNode, context);
    },
);
export default wennFragment;
