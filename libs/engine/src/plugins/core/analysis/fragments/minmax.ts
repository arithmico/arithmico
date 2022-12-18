import createNumberNode from '../../../../create-node/create-number-node';
import { FunctionHeaderItem, NumberNode, SyntaxTreeNode } from '../../../../types/SyntaxTreeNodes';
import { PluginFragment } from '../../../../utils/plugin-builder';

const header: FunctionHeaderItem[] = [{ name: 'v', type: 'number', evaluate: true, repeat: true }];

const minmaxFragment = new PluginFragment()
    .addFunction(
        'min',
        header,
        'returns the minimum of all passed parameters',
        'Gibt das Minimum aus allen übergebenen Werten zurück.',
        ({ getParameter }) => {
            const values = (<SyntaxTreeNode[]>getParameter('v')).map((value) => (<NumberNode>value).value);
            return createNumberNode(Math.min(...values));
        },
    )
    .addFunction(
        'max',
        header,
        'returns the maximum of all passed parameters',
        'Gibt das Maximum aus allen übergebenen Werten zurück.',

        ({ getParameter }) => {
            const values = (<SyntaxTreeNode[]>getParameter('v')).map((value) => (<NumberNode>value).value);
            return createNumberNode(Math.max(...values));
        },
    );

export default minmaxFragment;
