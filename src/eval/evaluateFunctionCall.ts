import {Context, FunctionCall} from "../types";
import {getFunctionFromContext} from "../utils/contextUtils";
import evaluate from "./evaluate";

export const evaluateFunctionCall = (node: FunctionCall, context: Context) => {
    const evaluator = getFunctionFromContext(node.name, context);
    const parameters = node.children.map(child => evaluate(child, context));
    return evaluator(parameters);
}