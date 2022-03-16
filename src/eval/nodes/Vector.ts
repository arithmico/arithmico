import evaluate from '..';
import createVector from '../../create/Vector';
import { Vector, Context, SyntaxTreeNode } from '../../types';

export default function evaluateVector(node: Vector, context: Context): SyntaxTreeNode {
    const evaluatedValues = node.values.map((value) => evaluate(value, context));
    return createVector(evaluatedValues);
}
