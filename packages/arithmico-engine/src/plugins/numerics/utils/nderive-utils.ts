import {FunctionNode} from "../../../types/nodes.types";
import {Context} from "../../../types/context.types";
import evaluate from "../../../node-operations/evaluate-node";
import createFunctionCall from "../../../node-operations/create-node/create-function-call";
import createNumberNode from "../../../node-operations/create-node/create-number-node";

export function calculateFunctionValue(f: FunctionNode, value: number, context: Context) {
    const result = evaluate(createFunctionCall(f, [createNumberNode(value)]), context);

    if (result.type === 'number') {
        return result.value;
    } else {
        throw 'not a number';
    }
}