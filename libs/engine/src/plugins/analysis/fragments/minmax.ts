import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { FunctionHeaderItem, NumberNode, SyntaxTreeNode } from '../../../types/nodes.types';
import { PluginFragment } from '../../../utils/plugin-builder';

const header: FunctionHeaderItem[] = [{ name: 'v', type: 'number', evaluate: true, repeat: true }];

const minmaxFragment = new PluginFragment();

__FUNCTIONS.min &&
    minmaxFragment.addFunction(
        'min',
        header,
        'returns the minimum of all passed parameters',
        'Gibt das Minimum aus allen übergebenen Werten zurück.',
        ({ getParameter }) => {
            const values = (<SyntaxTreeNode[]>getParameter('v')).map((value) => (<NumberNode>value).value);
            return createNumberNode(Math.min(...values));
        },
    );

__FUNCTIONS.max &&
    minmaxFragment.addFunction(
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
