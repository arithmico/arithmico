import { And, Boolean, Not, Or } from "../types.js";
import { evaluateChildren } from "./evalUtils.js";
import { isBoolean } from "../typeUtils.js";
import { createBoolean } from "../create/create.js";
import evaluate from "./evaluate.js";

export const evaluateAnd = (node: And): Boolean => {
    const [childA, childB] = evaluateChildren(node.children);

    if (isBoolean(childA) && isBoolean(childB))
        return createBoolean((childA as Boolean).value && (childB as Boolean).value);

    throw "undefined operation";
}

export const evaluateOr = (node: Or): Boolean => {
    const [childA, childB] = evaluateChildren(node.children);

    if (isBoolean(childA) && isBoolean(childB))
        return createBoolean((childA as Boolean).value || (childB as Boolean).value);

    throw "undefined operation";
}

export const evaluateNot = (node: Not): Boolean => {
    const evaluatedNode = evaluate(node);

    if (isBoolean(evaluatedNode))
        return createBoolean(!(evaluatedNode as Boolean).value);

    throw "undefined operation";
};