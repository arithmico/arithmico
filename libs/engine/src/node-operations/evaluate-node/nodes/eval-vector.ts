import evaluate from '..';
import createVector from '../../create-node/create-vector';
import { Vector, Context, SyntaxTreeNode } from '../../../types';

export default function evaluateVector(node: Vector, context: Context): SyntaxTreeNode {
    if (!__OBJECTS.vector) {
        throw `RuntimeError: vectors are disabled in this configuration`;
    }

    const evaluatedValues = node.values.map((value) => evaluate(value, context));
    return createVector(evaluatedValues);
}
