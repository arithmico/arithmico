import { FunctionHeaderItem, Vector } from '../../../types/SyntaxTreeNodes';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import { getTensorRank } from '../../../utils/tensor-utils';
import evaluate from '../../../eval';
import createVector from '../../../create/create-vector';
import createMinus from '../../../create/create-minus';
import createTimes from '../../../create/create-times';

const header: FunctionHeaderItem[] = [
    { name: 'a', type: 'vector', evaluate: true },
    { name: 'b', type: 'vector', evaluate: true },
];

const crossPlugin = createPlugin('core/cross');
addPluginAuthor(crossPlugin, 'core');
addPluginDescription(crossPlugin, 'adds cross function');

addPluginFunction(
    crossPlugin,
    createPluginFunction(
        'cross',
        header,
        'Calculate the vector product of a and b',
        'Berechnet das Kreuzprodukt der Vektoren a und b.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('cross', parameters, header, context);
            const left = <Vector>parameterStackFrame.get('a');
            const right = <Vector>parameterStackFrame.get('b');

            try {
                const leftRank = getTensorRank(left);
                const rightRank = getTensorRank(right);

                if (leftRank !== 1 || rightRank !== 1) {
                    throw '';
                }

                if (left.values.length !== 3 || right.values.length !== 3) {
                    throw '';
                }
            } catch (e) {
                throw 'RuntimeError: cross: invalid arguments';
            }

            const l1 = left.values[0],
                l2 = left.values[1],
                l3 = left.values[2];

            const r1 = right.values[0],
                r2 = right.values[1],
                r3 = right.values[2];

            return evaluate(
                createVector([
                    createMinus(createTimes(l2, r3), createTimes(l3, r2)),
                    createMinus(createTimes(l3, r1), createTimes(l1, r3)),
                    createMinus(createTimes(l1, r2), createTimes(l2, r1)),
                ]),
                context,
            );
        },
    ),
);

export default crossPlugin;
