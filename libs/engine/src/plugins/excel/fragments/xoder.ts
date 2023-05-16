import createBooleanNode from '../../../node-operations/create-node/create-boolean-node';
import { PluginFragment } from '../../../utils/plugin-builder';
import { FunctionHeaderItem, BooleanNode, SyntaxTreeNode } from '../../../types/nodes.types';

const booleanSeriesHeader: FunctionHeaderItem[] = [{ name: 'a', type: 'boolean', evaluate: true, repeat: true }];

const xoderFragment = new PluginFragment().addFunction(
    'xoder',
    booleanSeriesHeader,
    "Exclusive or. True, if uneven amount of arguments with value 'true'.",
    "Ausschließendes Oder. Wahr, wenn ungerade Anzahl von Werten mit 'wahr'.",
    ({ getParameter, runtimeError }) => {
        const as = (<SyntaxTreeNode[]>getParameter('a')).map((a) => (<BooleanNode>a).value);

        let countTrue = 0;
        for (const a of as) {
            if (typeof a !== 'boolean') {
                throw runtimeError('Alle Argumente müssen Wahrheitswerte sein.');
            }
            if (a) {
                countTrue++;
            }
        }
        return createBooleanNode(countTrue % 2 == 1);
    },
);

export default xoderFragment;
