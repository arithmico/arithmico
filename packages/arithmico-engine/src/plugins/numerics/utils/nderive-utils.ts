import {FunctionNode} from '../../../types/nodes.types';
import {Context} from '../../../types/context.types';
import evaluate from '../../../node-operations/evaluate-node';
import createFunctionCall from '../../../node-operations/create-node/create-function-call';
import createNumberNode from '../../../node-operations/create-node/create-number-node';

const EPSILON = Number.EPSILON;

function evaluateFunctionNodeOnPosition(f: FunctionNode, value: number, context: Context) {
    const result = evaluate(createFunctionCall(f, [createNumberNode(value)]), context);

    if (result.type === 'number') {
        return result.value;
    } else {
        throw 'not a number';
    }
}

export function calculateH(f: FunctionNode, position: number, grade: number, context: Context) {
    const functionResult = evaluateFunctionNodeOnPosition(f, position, context);
    const secondDerivative = Math.pow(
        (evaluateFunctionNodeOnPosition(f, position + EPSILON, context) -
            2 * functionResult +
            evaluateFunctionNodeOnPosition(f, position - EPSILON, context)) /
            EPSILON,
        2,
    );
    const hValue =
        2 * Math.sqrt(EPSILON * Math.abs(functionResult / (secondDerivative === 0 ? EPSILON : secondDerivative)));

    if (grade > 1) {
        return hValue === 0 ? Number.EPSILON : hValue;
    }

    return hValue === 0 ? Number.EPSILON : Math.pow(10, -Math.log10(Math.abs(functionResult))) * hValue;
}
