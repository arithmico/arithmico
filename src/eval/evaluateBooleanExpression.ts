import {isEqual} from "lodash";
import {
    And,
    Boolean,
    Equal,
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual,
    Not,
    Number,
    Or,
    PartialOrder,
    Relation,
    SyntaxTreeNode
} from "../types.js";
import {evaluateChildren} from "./evalUtils.js";
import {isBoolean, isNumber} from "../typeUtils.js";
import {createBoolean} from "../create/create.js";
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

// relations
type RelationFunction = (leftChild: SyntaxTreeNode, rightChild: SyntaxTreeNode) => boolean;
type PartialOrderEvaluator = (leftChild: Number, rightChild: Number) => boolean;

const evaluateRelation = (node: Relation, func: RelationFunction) => {
    const [childA, childB] = evaluateChildren(node.children);

    return createBoolean(func(childA, childB));
}

const evaluatePartialOrder = (node: PartialOrder, func: PartialOrderEvaluator) => {
    const [childA, childB] = evaluateChildren(node.children);
    if (!isNumber(childA) || !isNumber(childB))
        throw `undefined operation PartialOrder(${childA.type}, ${childB.type})`;

    return createBoolean(func(childA as Number, childB as Number));
};

export const evaluateEqual = (node: Equal) => evaluateRelation(
    node, (childA, childB) => isEqual(childA, childB)
);

export const evaluateLessThan = (node: LessThan) => evaluatePartialOrder(
    node, (childA, childB) => childA.value < childB.value
);

export const evaluateLessThanOrEqual = (node: LessThanOrEqual) => evaluatePartialOrder(
    node, (childA, childB) => childA.value <= childB.value
);

export const evaluateGreaterThan = (node: GreaterThan) => evaluatePartialOrder(
    node, (childA, childB) => childA.value > childB.value
);

export const evaluateGreaterThanOrEqual = (node: GreaterThanOrEqual) => evaluatePartialOrder(
    node, (childA, childB) => childA.value >= childB.value
);