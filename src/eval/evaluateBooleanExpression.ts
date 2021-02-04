import { And, Boolean } from "../types.js";
import { evaluateChildren } from "./evalUtils.js";
import { isBoolean } from "../typeUtils.js";
import { createBoolean } from "../create/create.js";

export const evaluateAnd = (node: And): Boolean => {
    const [childA, childB] = evaluateChildren(node.children);

    if (isBoolean(childA) && isBoolean(childB))
        return createBoolean((childA as Boolean).value && (childB as Boolean).value);

    throw "undefined operation";
}