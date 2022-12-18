import evaluate from '../../../../node-operations/evaluate-node';
import { BooleanNode, SyntaxTreeNode } from '../../../../types';
import { FunctionHeaderItem } from '../../../../types/SyntaxTreeNodes';
import { PluginFragment } from '../../../../utils/plugin-builder';

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

const ifThenElseFragment = new PluginFragment().addFunction(
    'ite',
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

export default ifThenElseFragment;
