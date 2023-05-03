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
        /*
        if (!isEveryElementBoolean(as)) {
            return runtimeError('Alle Argumente müssen Wahrheitswerte sein.');
        }
        */
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
        /*
        // für genau 2 Argumente: exactly one argument is true
        const a = (<BooleanNode>getParameter('a')).value;
        const b = (<BooleanNode>getParameter('b')).value;
        if (typeof a === 'boolean' && typeof b === 'boolean') {
            return createBooleanNode(a !== b);
        } else {
            throw runtimeError('Mindestens ein Argument ist kein Wahrheitswert.');
        }
        */
    },
);

export default xoderFragment;
