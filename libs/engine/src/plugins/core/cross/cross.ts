import { FunctionHeaderItem, Vector } from '../../../types/SyntaxTreeNodes';
import { getTensorRank, isVectorHomogeneous } from '../../../utils/tensor-utils';
import evaluate from '../../../eval';
import createVector from '../../../create/create-vector';
import createMinus from '../../../create/create-minus';
import createTimes from '../../../create/create-times';
import createPluginV2 from '../../../utils/plugin-builder-v2';

const header: FunctionHeaderItem[] = [
    { name: 'a', type: 'vector', evaluate: true },
    { name: 'b', type: 'vector', evaluate: true },
];

const crossPlugin = createPluginV2()
    .withName('cross')
    .withAuthor('core')
    .withDescription('adds cross function')
    .addFunction(
        'cross',
        header,
        'Calculate the vector product of a and b',
        'Berechnet das Kreuzprodukt der Vektoren a und b.',
        ({ getParameter, runtimeError, context }) => {
            const left = <Vector>getParameter('a');
            const right = <Vector>getParameter('b');

            if (!isVectorHomogeneous(left) || !isVectorHomogeneous(right)) {
                throw runtimeError('invalid tensor shape');
            }

            const leftRank = getTensorRank(left);
            const rightRank = getTensorRank(right);

            if (leftRank !== 1 || rightRank !== 1) {
                throw runtimeError('parameter is not a vector');
            }

            if (left.values.length !== 3 || right.values.length !== 3) {
                throw runtimeError('parameter is not a 3D-vector');
            }

            const [l1, l2, l3] = left.values;
            const [r1, r2, r3] = right.values;

            return evaluate(
                createVector([
                    createMinus(createTimes(l2, r3), createTimes(l3, r2)),
                    createMinus(createTimes(l3, r1), createTimes(l1, r3)),
                    createMinus(createTimes(l1, r2), createTimes(l2, r1)),
                ]),
                context,
            );
        },
    )
    .build();

export default crossPlugin;
