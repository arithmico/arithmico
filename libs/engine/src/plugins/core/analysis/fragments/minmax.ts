import createNumberNode from '../../../../create/create-number-node';
import { FunctionHeaderItem, NumberNode, SyntaxTreeNode } from '../../../../types/SyntaxTreeNodes';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';

const header: FunctionHeaderItem[] = [{ name: 'v', type: 'number', evaluate: true, repeat: true }];

const minmaxFragment = new PluginFragment()
    .addFunction(
        'min',
        header,
        'returns the minimum of all passed parameters',
        'Gibt das Minimum aus allen übergebenen Werten zurück.',
        ({ getParameter }) => {
            const values = (<SyntaxTreeNode[]>getParameter('x')).map((value) => (<NumberNode>value).value);
            return createNumberNode(Math.min(...values));
        },
    )
    .addFunction(
        'max',
        header,
        'returns the maximum of all passed parameters',
        'Gibt das Maximum aus allen übergebenen Werten zurück.',

        ({ getParameter }) => {
            const values = (<SyntaxTreeNode[]>getParameter('x')).map((value) => (<NumberNode>value).value);
            return createNumberNode(Math.max(...values));
        },
    );

export default minmaxFragment;
