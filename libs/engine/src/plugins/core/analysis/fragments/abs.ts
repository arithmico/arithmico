import createNumberNode from '../../../../create/create-number-node';
import { FunctionHeaderItem, NumberNode, Vector } from '../../../../types/SyntaxTreeNodes';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';

const absHeader: FunctionHeaderItem[] = [{ name: 'v', type: 'number', evaluate: true }];
const lengthHeader: FunctionHeaderItem[] = [{ name: 'v', type: 'vector', evaluate: true }];

const absFragment = new PluginFragment()
    .addFunction(
        'abs',
        absHeader,
        'Computes the absolute value of a number',
        'Berechnet den absoluten Wert einer Zahl.',
        ({ getParameter }) => {
            const value = (<NumberNode>getParameter('v')).value;
            return createNumberNode(Math.abs(value));
        },
    )
    .addFunction(
        'length',
        lengthHeader,
        'Computes the length of a vector',
        'Berechnet die Länge eines Vektors',
        ({ getParameter, typeError }) => {
            const values = (<Vector>getParameter('v')).values.map((value) => {
                if (value.type !== 'number') {
                    throw typeError(`expected number got ${value.type}`);
                }
                return Math.pow(value.value, 2);
            });

            return createNumberNode(Math.sqrt(values.reduce((a, b) => a + b)));
        },
    );

export default absFragment;
