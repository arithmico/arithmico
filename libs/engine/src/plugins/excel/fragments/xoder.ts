import createBooleanNode from '../../../node-operations/create-node/create-boolean-node';
import { PluginFragment } from '../../../utils/plugin-builder';
import { FunctionHeaderItem, BooleanNode } from '../../../types/nodes.types';

const booleanOperatorHeader: FunctionHeaderItem[] = [
    {
        name: 'a',
        type: 'boolean',
        evaluate: true,
    },
    {
        name: 'b',
        type: 'boolean',
        evaluate: false,
    },
];

const xoderFragment = new PluginFragment();
__FUNCTIONS.xoder &&
    xoderFragment.addFunction(
        'xoder',
        booleanOperatorHeader,
        'Exclusive or, exactly one argument is true.',
        'Ausschließendes Oder, genau ein Argument ist wahr.',
        ({ getParameter, runtimeError }) => {
            const a = (<BooleanNode>getParameter('a')).value;
            const b = (<BooleanNode>getParameter('b')).value;
            if (typeof a === 'boolean' && typeof b === 'boolean') {
                return createBooleanNode(a !== b);
            } else {
                throw runtimeError('Mindestens ein Argument ist kein Wahrheitswert.');
            }
        },
    );

export default xoderFragment;
